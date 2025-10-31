import argparse
import json
import time
import os  # --- 1. Import the 'os' module ---
from datetime import datetime
from parser import extract_sections
from embedder import Embedder
from ranker import rank_sections
from refiner import refine_subsections

def convert_rank_to_relevance_score(rank, max_rank=5):
    """Convert rank (1=best) to relevance score (1.0=best)"""
    return round(1.0 - ((rank - 1) / max_rank), 2)

def main(pdf_list, persona, job, output_json):
    start = time.time()
    
    # --- 2. Add code to ensure the output directory exists ---
    output_dir = os.path.dirname(output_json)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
    # --- End of new code ---

    embedder = Embedder()
    prompt = f"{persona} {job}"
    prompt_emb = embedder.embed([prompt])[0]

    all_sections = []
    for pdf in pdf_list:
        secs = extract_sections(pdf)
        all_sections.extend(secs)

    extracted_sections = []
    subsection_analysis = []
    
    top_k_per_pdf = 5
    
    for pdf in pdf_list:
        try:
            pdf_sections = [sec for sec in all_sections if sec["document"] == pdf]
            if not pdf_sections:
                continue
                
            ranked_secs = rank_sections(pdf_sections, prompt_emb, embedder, top_k=top_k_per_pdf)
            
            for idx, sec in enumerate(ranked_secs, start=1):
                extracted_sections.append({
                    "document": sec["document"],
                    "page": sec["page"],
                    "section_title": sec["title"],
                    "importance_rank": idx
                })
                
                subs = refine_subsections(sec, prompt_emb, embedder)
                
                for sub in subs:
                    subsection_analysis.append({
                        "document": sec["document"],
                        "page": sec["page"],
                        "refined_text": sub["refined_text"],
                        "relevance_score": convert_rank_to_relevance_score(sub["rank"])
                    })
        except Exception as e:
            safe_pdf_path = pdf.encode('utf-8', 'ignore').decode('utf-8')
            print(f"⚠️ [WARNING] Failed to process document '{safe_pdf_path}'. Error: {e}. Skipping this document.")
            continue

    metadata = {
        "input_documents": pdf_list,
        "persona": persona,
        "job_to_be_done": job,
        "processing_timestamp": datetime.now().isoformat() + "Z"
    }

    output = {
        "metadata": metadata,
        "extracted_sections": extracted_sections,
        "subsection_analysis": subsection_analysis
    }

    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"[INFO] Processing completed in {time.time() - start:.2f}s")
    print(f"[INFO] Output saved to {output_json}")
    print(f"[INFO] Extracted {len(extracted_sections)} sections and {len(subsection_analysis)} subsections")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="PDF Section Relevance Extraction")
    parser.add_argument("--pdfs", nargs="+", required=True, help="List of PDF files")
    parser.add_argument("--persona", type=str, required=True, help="User persona description")
    parser.add_argument("--job", type=str, required=True, help="Job to be done")
    parser.add_argument("--output", type=str, required=True, help="Output JSON path")
    args = parser.parse_args()

    main(args.pdfs, args.persona, args.job, args.output)
