from nltk.tokenize import sent_tokenize
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import nltk.data
tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')

def refine_subsections(section, prompt_embedding, embedder, max_sentences=5):
    """
    Split section text into sentences, embed each sentence, rank against the prompt embedding,
    and select the top sentences as refined text.
    Returns a list of dicts: {"rank": int, "refined_text": str, "score": float}
    """
    # sentences = sent_tokenize(section["text"])
    sentences = tokenizer.tokenize(section["text"])
    if not sentences:
        return []

    sent_embs = embedder.embed(sentences)
    sims = cosine_similarity(sent_embs, prompt_embedding.reshape(1, -1)).flatten()
    idxs = np.argsort(sims)[::-1][:max_sentences]

    refined = []
    for rank, idx in enumerate(idxs, start=1):
        refined.append({
            "rank": rank,
            "refined_text": sentences[idx].strip(),
            "score": float(sims[idx])
        })
    return refined
