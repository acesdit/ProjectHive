# PDF Section Extraction

**Contributor:** sujal-pawar

**Persona-Driven Document Intelligence for Offline PDF Analysis**

Extract and rank relevant sections from PDFs based on user persona and job-to-be-done using semantic search and NLP.

**Note:** Local models are NOT included in the repository. The Docker build process downloads required models (~120MB). For manual setup, run `pip install -r requirements.txt` and download models as specified in the setup section.

## Features

- Persona-driven section extraction and relevance ranking
- Semantic search using sentence-transformers
- Granular subsection analysis with relevance scoring
- 100% offline operation (no API calls)
- Dockerized for reproducible deployment
- Standardized JSON output format

## Tech Stack

Python, PyMuPDF, sentence-transformers, NLTK, PyTorch, Docker

## Hackathon Build & Run

```bash
# Build Docker image (amd64 platform)
docker build --platform linux/amd64 -t ps1b-submission .

# Run container (offline mode)
docker run --rm \
    --platform linux/amd64 \
    --network none \
    -v "$(pwd)/output:/app/output" \
    ps1b-submission
```

Output JSON will be generated in `output/final_test.json`

## Performance

Meets Adobe Round 1B constraints for CPU-only execution:
- Model size: ~120MB (within 1GB limit)
- Processing time: 3-5 PDFs in under 60 seconds
  - 2 PDFs: ~19s ✅
  - 3 PDFs: ~20s ✅
  - 5 PDFs: ~21s ✅

## Manual Setup

```bash
# Clone and setup
git clone https://github.com/yourusername/pdf_section_extraction.git
cd pdf_section_extraction
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies and download models
pip install -r requirements.txt
python -c "import nltk; nltk.download(['punkt', 'punkt_tab'], download_dir='./nltk_data')"
python -c "from sentence_transformers import SentenceTransformer; model = SentenceTransformer('all-MiniLM-L6-v2'); model.save('./local_model')"

# Run
python main.py --pdfs test_pdfs/*.pdf --persona "travel planner" --job "France Travel" --output output/final_test.json
```

## Project Structure

```
├── Dockerfile              # Container configuration
├── main.py                 # Main execution script
├── parser.py               # PDF parsing and section extraction
├── ranker.py               # Relevance ranking
├── refiner.py              # Subsection analysis
├── embedder.py             # Text embedding generation
├── test_pdfs/              # Input PDFs
├── output/                 # Generated JSON results
└── requirements.txt        # Dependencies
```

## License

MIT License

***

Built with sentence-transformers, NLTK, PyMuPDF, and PyTorch