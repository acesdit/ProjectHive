from pathlib import Path
from typing import List, Optional

from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.docstore.document import Document

from .config import VECTOR_DIR, DEFAULT_EMBEDDING_MODEL


_embedding = None


def get_embeddings():
    global _embedding
    if _embedding is None:
        _embedding = HuggingFaceEmbeddings(model_name=DEFAULT_EMBEDDING_MODEL)
    return _embedding


def get_vectorstore(name: str = "campus_faqs") -> FAISS:
    path = Path(VECTOR_DIR) / f"{name}.faiss"
    embeddings = get_embeddings()
    if path.exists():
        return FAISS.load_local(str(path), embeddings, allow_dangerous_deserialization=True)
    vs = FAISS.from_texts([""], embedding=embeddings)
    vs.save_local(str(path))
    return vs


def add_documents(documents: List[Document], name: str = "campus_faqs") -> int:
    vs = get_vectorstore(name)
    embeddings = get_embeddings()
    if documents:
        new_vs = FAISS.from_documents(documents, embeddings)
        vs.merge_from(new_vs)
        vs.save_local(str(Path(VECTOR_DIR) / f"{name}.faiss"))
        return len(documents)
    return 0


def similarity_search(query: str, k: int = 5, name: str = "campus_faqs") -> List[Document]:
    vs = get_vectorstore(name)
    return vs.similarity_search(query, k=k)
