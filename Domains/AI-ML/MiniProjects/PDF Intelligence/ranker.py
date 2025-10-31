# ranker.py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from embedder import Embedder # Make sure to import Embedder

def rank_sections(sections, prompt_embedding, embedder: Embedder, top_k=10, threshold=0.05):
    """
    sections: list of {"title", "text", ...}
    prompt_embedding: single vector
    embedder: Embedder instance
    Returns top_k sections by similarity >= threshold, each with score and rank.
    """
    if not sections:
        return []

    print(f"[DEBUG] Number of sections received for ranking: {len(sections)}")
    texts = [s.get("title", "") + " " + s.get("text", "") for s in sections]
    embeddings = embedder.embed(texts)
    
    # Ensure prompt_embedding is a 2D array for cosine_similarity
    sims = cosine_similarity(embeddings, prompt_embedding.reshape(1, -1)).flatten()

    ranked = []
    for sec, score in zip(sections, sims):
        
        # --- THIS IS THE FIXED LINE ---
        # Unicode-safe print statement to prevent crashing.
        safe_title = str(sec.get('title', '')).encode('utf-8', 'ignore').decode('utf-8')
        # You can comment this out for the final submission to have a cleaner log.
        # print(f"[DEBUG] Section title: '{safe_title}' | Similarity score: {score:.3f}")
        
        if score >= threshold:
            sec_copy = sec.copy()
            sec_copy["score"] = float(score)
            ranked.append(sec_copy)

    ranked.sort(key=lambda x: x["score"], reverse=True)
    print(f"[DEBUG] Number of highlights after ranking: {len(ranked)}")
    return ranked[:top_k]
