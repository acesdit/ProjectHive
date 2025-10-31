import fitz  # PyMuPDF
import re
from typing import List, Dict, Tuple
from collections import Counter

def is_valid_heading(text: str, font_size: float, is_bold: bool, line_bbox: tuple, page_width: float, min_heading_size: float, body_font_size: float) -> bool:
    """A more robust function to determine if a text block is a heading."""
    clean_text = text.strip()
    words = clean_text.split()

    # Basic filtering: too short, too long, or ends like a regular sentence
    if not words or len(words) > 15:
        return False
    if clean_text.endswith(('.', ',', ';', ':')):
        return False

    # --- KEY HEURISTIC 1: Font Style ---
    # A heading must EITHER be larger than body text OR the same size but bold.
    is_larger_font = font_size > (body_font_size + 0.5)
    is_same_size_but_bold = (abs(font_size - body_font_size) < 0.5) and is_bold
    
    if not (is_larger_font or is_same_size_but_bold):
        return False # If it doesn't meet font criteria, it's not a heading.

    # --- KEY HEURISTIC 2: Text Style & Position (adds confidence) ---
    # 1. Numbered headings (high confidence)
    if re.match(r'^\d+(\.\d+)*\.?\s+', clean_text):
        return True
        
    # 2. All caps or Title Case (high confidence)
    if (clean_text.isupper() or clean_text.istitle()) and len(words) > 1:
        return True

    # 3. Centered text (positional heuristic)
    x0, _, x1, _ = line_bbox
    line_width = x1 - x0
    center_pos = (x0 + x1) / 2
    page_center = page_width / 2
    # Check if the text is roughly centered and doesn't span the whole page width
    if abs(center_pos - page_center) < (page_width * 0.15) and line_width < (page_width * 0.8):
        return True

    # 4. Fallback: If it's significantly larger or bold, it's likely a heading
    if font_size > (body_font_size * 1.2) or is_same_size_but_bold:
        return True
        
    return False

# --- No changes needed below this line, but use the full updated code for safety ---

def is_table_of_contents_entry(text: str) -> bool:
    """Detect if a text block is a Table of Contents entry."""
    clean_text = text.strip()
    if len(clean_text) < 5: return False
    toc_patterns = [
        re.compile(r'.{3,}\.{5,}.{0,20}\d+(\s*-\s*\d+)?$'),
        re.compile(r'.+\s{3,}\d+\s*$'),
    ]
    if any(p.search(clean_text) for p in toc_patterns): return True
    return False

def is_header_footer_noise(bbox: Tuple[float, float, float, float], page_height: float) -> bool:
    """Detect headers and footers based on vertical position."""
    _, y0, _, y1 = bbox
    return y0 < page_height * 0.1 or y1 > page_height * 0.9

def calculate_font_thresholds(doc: fitz.Document) -> Tuple[float, float]:
    """Analyze document to determine font size thresholds."""
    sizes = [
        span["size"] for page in doc for block in page.get_text("dict")["blocks"]
        if "lines" in block for line in block["lines"] for span in line["spans"]
        if span["text"].strip()
    ]
    if not sizes: return 12.0, 10.0
    body_font_size = Counter(s for s in sizes if s > 4).most_common(1)[0][0]
    min_heading_size = body_font_size
    return float(min_heading_size), float(body_font_size)

def extract_sections(pdf_path: str) -> List[Dict]:
    """Parse the PDF, segmenting into sections while filtering noise."""
    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"[ERROR] Could not open PDF {pdf_path}: {e}")
        return []
    
    sections = []
    current_section = None
    min_heading_size, body_font_size = calculate_font_thresholds(doc)
    
    for page_num, page in enumerate(doc):
        page_height = page.rect.height
        page_width = page.rect.width # Needed for centering heuristic
        try:
            blocks = page.get_text("dict")["blocks"]
        except KeyError: continue
        
        for block in blocks:
            if "lines" not in block: continue
            
            for line in block["lines"]:
                if not line.get("spans"): continue
                line_text = "".join(span.get("text", "") for span in line["spans"]).strip()
                if not line_text: continue
                
                try:
                    max_font_size = max(span.get("size", 0) for span in line["spans"])
                    is_bold = any(span.get("flags", 0) & 16 for span in line["spans"])
                    line_bbox = line.get("bbox")
                except (ValueError, KeyError): continue
                if not line_bbox: continue

                if is_header_footer_noise(line_bbox, page_height) or is_table_of_contents_entry(line_text):
                    continue
                
                # Using the new, more robust heading detection function
                if is_valid_heading(line_text, max_font_size, is_bold, line_bbox, page_width, min_heading_size, body_font_size):
                    if current_section: sections.append(current_section)
                    current_section = {"document": pdf_path, "page": page_num + 1, "title": line_text, "text": ""}
                elif current_section:
                    current_section["text"] += line_text + " "
    
    if current_section: sections.append(current_section)
    doc.close()
    
    final_sections = [sec for sec in sections if sec.get("text") and len(sec["text"].split()) >= 10]
    safe_pdf_path = pdf_path.encode('utf-8', 'ignore').decode('utf-8')
    print(f"[DEBUG] Extracted {len(final_sections)} valid sections from {safe_pdf_path}")
    return final_sections
