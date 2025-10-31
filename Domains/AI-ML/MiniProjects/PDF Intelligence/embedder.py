# embedder.py
from sentence_transformers import SentenceTransformer
import numpy as np

class Embedder:
    def __init__(self, model_name="local_model"):
        self.model = SentenceTransformer(model_name, device='cpu')

    def embed(self, texts):
        """
        Batch-encode list of texts into embeddings array.
        """
        return np.array(self.model.encode(texts, convert_to_numpy=True, show_progress_bar=False))
