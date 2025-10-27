import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(override=True)

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
VECTOR_DIR = BASE_DIR / "vectorstore"
LOGS_DIR = BASE_DIR / "logs"
PUBLIC_DIR = BASE_DIR / "public"

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
CONTACT_FALLBACK = os.getenv("CONTACT_FALLBACK", "contact@college.example")

DEFAULT_EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL",
    "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
)

GEN_AI_MODEL = os.getenv("GEN_AI_MODEL", "gemini-2.0-flash")
SIMILARITY_FALLBACK_THRESHOLD = float(os.getenv("SIMILARITY_FALLBACK_THRESHOLD", "0.35"))
TOP_K = int(os.getenv("TOP_K", "5"))

# OCR settings
OCR_LANGS = os.getenv("OCR_LANGS", "eng+hin+ben+mar+tam").split("+")
TESSERACT_CMD = os.getenv("TESSERACT_CMD", "")  # Optional: full path to tesseract.exe
POPPLER_PATH = os.getenv("POPPLER_PATH", "")   # Optional: path to poppler bin (for pdf2image on Windows)

for d in (DATA_DIR, VECTOR_DIR, LOGS_DIR, PUBLIC_DIR):
    d.mkdir(parents=True, exist_ok=True)
