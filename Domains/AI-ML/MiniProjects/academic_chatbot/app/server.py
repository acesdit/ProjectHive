from typing import Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from langchain.docstore.document import Document

from .schemas import IngestRequest, ChatRequest, ChatResponse
from .ingest import ingest_local
from .vectordb import similarity_search
from .llm import build_rag_chain
from .config import TOP_K, SIMILARITY_FALLBACK_THRESHOLD, CONTACT_FALLBACK
from .logging_utils import log_event

app = FastAPI(title="Campus Assistant", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_sessions: Dict[str, List[Dict[str, str]]] = {}


@app.get("/health")
async def health():
    return {"ok": True}


@app.post("/ingest")
async def ingest(req: IngestRequest):
    added = ingest_local(req.files)
    return {"added_chunks": added}


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    history = _sessions.setdefault(req.session_id, [])

    docs = similarity_search(req.message, k=TOP_K)
    context_text = "\n\n".join(d.page_content for d in docs)
    sources = list({str(d.metadata.get("source", "unknown")) for d in docs})

    chain = build_rag_chain(retriever=None)
    answer = await chain.ainvoke({"context": context_text, "question": req.message})

    max_score = 0.0
    if hasattr(docs, "scores"):
        max_score = max((s or 0.0) for s in getattr(docs, "scores"))
    # Heuristic: if no context or low similarity, append fallback
    fallback_used = False
    if not docs or len(context_text.strip()) == 0:
        fallback_used = True
    if fallback_used or max_score < SIMILARITY_FALLBACK_THRESHOLD:
        fallback_used = True
        answer = (
            answer.strip()
            + f"\n\nIf this doesn't answer your question, please contact: {CONTACT_FALLBACK}"
        )

    history.append({"user": req.message, "assistant": answer})
    if len(history) > 20:
        _sessions[req.session_id] = history[-20:]

    log_event(
        {
            "type": "chat",
            "session_id": req.session_id,
            "message": req.message,
            "answer": answer,
            "sources": sources,
            "fallback": fallback_used,
        }
    )

    return ChatResponse(answer=answer, fallback_used=fallback_used, sources=sources)
