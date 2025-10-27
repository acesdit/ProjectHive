
**Contributor:** Mmadan128

# Academic Chatbot (LangChain + Gemini)

## Quickstart

1. Create and activate a virtual environment.
2. Install deps:
```
pip install -r requirements.txt
```
3. Set environment:
```
copy .env.example .env  # Windows
# Set GOOGLE_API_KEY in .env
```
4. Ingest sample data (place PDFs/text in `data/`):
```
python -m app.ingest_cli example.pdf
```
5. Run API:
```
uvicorn app.server:app --reload --host 0.0.0.0 --port 8000
```
6. Open `public/widget.html` and set `window.CAMPUS_ASSISTANT_API` if needed.

## Environment
- GOOGLE_API_KEY: Google Generative AI key
- EMBEDDING_MODEL: sentence-transformers multilingual model

## Ingestion
Use `/ingest` or the CLI to add PDFs/TXT. The FAISS store is persisted in `vectorstore/`.

## Privacy
No chat content is stored beyond daily JSONL logs; configure retention as needed.
