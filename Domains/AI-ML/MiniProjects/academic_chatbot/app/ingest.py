from pathlib import Path
from typing import Iterable, List, Optional, Tuple

from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader, TextLoader
import pandas as pd
import re

# OCR imports
try:
    from pdf2image import convert_from_path
    import pytesseract
except Exception:
    convert_from_path = None  # type: ignore
    pytesseract = None  # type: ignore

from .config import DATA_DIR, OCR_LANGS, TESSERACT_CMD, POPPLER_PATH
from .vectordb import add_documents


CHUNK_SIZE = 800
CHUNK_OVERLAP = 120


def _split_documents(documents: List[Document]) -> List[Document]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        separators=["\n\n", "\n", " ", ""],
    )
    return splitter.split_documents(documents)


def _collect_paths(inputs: List[Path]) -> List[Path]:
    collected: List[Path] = []
    allowed_ext = {".pdf", ".txt", ".md", ".csv", ".xlsx", ".xls"}
    for p in inputs:
        if p.is_dir():
            for fp in p.rglob("*"):
                if fp.is_file() and fp.suffix.lower() in allowed_ext:
                    collected.append(fp)
        elif p.is_file() and p.suffix.lower() in allowed_ext:
            collected.append(p)
    return collected


def _normalize_col(name: str) -> str:
    name = str(name or "").strip().lower()
    name = re.sub(r"[_\s]+", " ", name)
    return name


def _row_to_text(df: pd.DataFrame, row: pd.Series, extra_keywords: str = "") -> str:
    parts: List[str] = []
    for col in df.columns:
        val = row.get(col, "")
        if pd.isna(val) or str(val).strip() == "":
            continue
        text_val = str(val).strip()
        parts.append(f"{col}: {text_val}")
    if extra_keywords:
        parts.append(f"keywords: {extra_keywords}")
    return "\n".join(parts)


def _detect_header_index(df_no_header: pd.DataFrame) -> int:
    # Heuristic: first row with >=50% non-empty cells is the header
    threshold = max(1, int(0.5 * df_no_header.shape[1]))
    for idx in range(len(df_no_header)):
        non_empty = (df_no_header.iloc[idx].astype(str).str.strip() != "").sum()
        if non_empty >= threshold:
            return idx
    return 0


def _read_excel_with_header(path: Path, sheet_name: str) -> pd.DataFrame:
    # Read without header, detect header row, then reassign columns
    df0 = pd.read_excel(path, sheet_name=sheet_name, header=None, dtype=str, keep_default_na=False)
    if df0.empty:
        return df0
    header_idx = _detect_header_index(df0)
    header = df0.iloc[header_idx].astype(str).tolist()
    df = df0.iloc[header_idx + 1 :].copy()
    df.columns = [_normalize_col(h) for h in header]
    # Drop fully empty rows
    df = df.replace({None: ""})
    df = df[~df.isna().all(axis=1)]
    return df


def _sheet_keywords(sheet: str, df: pd.DataFrame) -> str:
    kw = [sheet]
    # If there is a department-like column, include its unique values
    for cand in ["dept", "department", "branch", "programme", "program"]:
        if cand in df.columns:
            vals = sorted({str(v).strip() for v in df[cand].tolist() if str(v).strip()})
            kw.extend(vals)
    # Add common synonyms to aid retrieval
    kw.extend(["faculty", "staff", "professor", "teacher", "hod", "contact"])
    return ", ".join(sorted({k.lower() for k in kw if k}))


def _load_tabular(path: Path) -> List[Document]:
    docs: List[Document] = []
    if path.suffix.lower() == ".csv":
        df = pd.read_csv(path, dtype=str, keep_default_na=False, na_filter=False)
        if not df.empty:
            # Normalize columns
            df.columns = [_normalize_col(c) for c in df.columns]
            df = df.dropna(how="all")
            sheet_kw = _sheet_keywords(path.stem, df)
            for idx, row in df.iterrows():
                text = _row_to_text(df, row, extra_keywords=sheet_kw)
                if not text.strip():
                    continue
                docs.append(
                    Document(
                        page_content=text,
                        metadata={"source": str(path), "type": "csv", "row": int(idx)},
                    )
                )
            # Add a sheet-level summary to help queries like "CSE faculty"
            preview_cols = df.columns[:6]
            lines = [
                f"Row {i}: "
                + ", ".join(f"{c}={str(df.iloc[i][c]).strip()}" for c in preview_cols if str(df.iloc[i][c]).strip())
                for i in range(min(25, len(df)))
            ]
            if lines:
                docs.append(
                    Document(
                        page_content=f"Summary of {path.name}:\n" + "\n".join(lines) + f"\nkeywords: {sheet_kw}",
                        metadata={"source": str(path), "type": "csv_summary"},
                    )
                )
    else:
        xls = pd.ExcelFile(path)
        for sheet in xls.sheet_names:
            df = _read_excel_with_header(path, sheet)
            if df.empty:
                continue
            sheet_kw = _sheet_keywords(sheet, df)
            for idx, row in df.iterrows():
                text = _row_to_text(df, row, extra_keywords=sheet_kw)
                if not text.strip():
                    continue
                docs.append(
                    Document(
                        page_content=text,
                        metadata={
                            "source": str(path),
                            "type": "excel",
                            "sheet": sheet,
                            "row": int(idx),
                        },
                    )
                )
            # Sheet-level summary
            preview_cols = df.columns[:6]
            lines = [
                f"Row {i}: "
                + ", ".join(f"{c}={str(df.iloc[i][c]).strip()}" for c in preview_cols if str(df.iloc[i][c]).strip())
                for i in range(min(25, len(df)))
            ]
            if lines:
                docs.append(
                    Document(
                        page_content=f"Summary of sheet {sheet} in {path.name}:\n"
                        + "\n".join(lines)
                        + f"\nkeywords: {sheet_kw}",
                        metadata={
                            "source": str(path),
                            "type": "excel_summary",
                            "sheet": sheet,
                        },
                    )
                )
    return docs


def _pdf_ocr_fallback(path: Path) -> List[Document]:
    if convert_from_path is None or pytesseract is None:
        return []
    if TESSERACT_CMD:
        pytesseract.pytesseract.tesseract_cmd = TESSERACT_CMD
    images = convert_from_path(str(path), dpi=300, poppler_path=POPPLER_PATH or None)
    docs: List[Document] = []
    langs = "+".join(OCR_LANGS) if OCR_LANGS else "eng"
    for i, img in enumerate(images):
        text = pytesseract.image_to_string(img, lang=langs)
        if text and text.strip():
            docs.append(
                Document(
                    page_content=text,
                    metadata={"source": str(path), "type": "pdf_ocr", "page": i + 1},
                )
            )
    return docs


def load_files(paths: List[Path]) -> List[Document]:
    docs: List[Document] = []
    for p in paths:
        suf = p.suffix.lower()
        if suf == ".pdf":
            try:
                loader = PyPDFLoader(str(p))
                loaded = loader.load()
                if not loaded or not any((d.page_content or "").strip() for d in loaded):
                    ocr_docs = _pdf_ocr_fallback(p)
                    docs.extend(ocr_docs)
                else:
                    docs.extend(loaded)
            except Exception:
                ocr_docs = _pdf_ocr_fallback(p)
                docs.extend(ocr_docs)
        elif suf in {".txt", ".md"}:
            loader = TextLoader(str(p), encoding="utf-8")
            docs.extend(loader.load())
        elif suf in {".csv", ".xlsx", ".xls"}:
            docs.extend(_load_tabular(p))
    return docs


def ingest_local(paths: List[str]) -> int:
    if not paths:
        base_inputs = [DATA_DIR]
    else:
        base_inputs = [Path(p) if Path(p).is_absolute() else Path(DATA_DIR) / p for p in paths]
    file_paths = _collect_paths(base_inputs)
    raw_docs = load_files(file_paths)
    chunks = _split_documents(raw_docs)
    return add_documents(chunks)
