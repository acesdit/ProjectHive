# ---- Stage 1: Build & Data Preparation ----
# Use a slim Python image to build dependencies and download data.
# Note: This used python:3.10-slim, not debian:bullseye-slim
FROM python:3.10-slim as builder

# Set the working directory
WORKDIR /app

# Create and activate a venv
ENV VIRTUAL_ENV=/app/venv
RUN python -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Copy only requirements for caching
COPY requirements.txt .

# Install CPU-only PyTorch and other deps. Added --timeout 1000 here to help with stability.
RUN pip install --timeout 1000 --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu && \
    pip install --timeout 1000 --no-cache-dir -r requirements.txt

# Download the models and data into a dedicated folder.
RUN mkdir -p /app/model_data/local_model && \
    python3 -c "from sentence_transformers import SentenceTransformer; model = SentenceTransformer('all-MiniLM-L6-v2'); model.save('/app/model_data/local_model')"

RUN mkdir -p /app/model_data/nltk_data && \
    python3 -c "import nltk; nltk.download(['punkt', 'punkt_tab'], download_dir='/app/model_data/nltk_data')"


# ---- Stage 2: Final Production Image ----
# Start from a fresh, clean base image for the final submission.
# Note: This used python:3.10-slim, not gcr.io/distroless/python3-debian11
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the virtual environment with all the installed packages from the builder stage.
COPY --from=builder /app/venv /app/venv

# Copy ONLY the prepared model and NLTK data from the builder stage.
COPY --from=builder /app/model_data/local_model/ /app/local_model/
COPY --from=builder /app/model_data/nltk_data/ /app/nltk_data/

# Copy the rest of your application source code.
COPY . .

# Set the environment variables needed for your application to run.
ENV PATH="/app/venv/bin:$PATH"
ENV NLTK_DATA=/app/nltk_data

# Define the default command to run your application.
CMD ["python", "main.py", "--pdfs", "test_pdfs/SouthofFranceCities.pdf", "test_pdfs/SouthofFranceCuisine.pdf", "test_pdfs/SouthofFranceHistory.pdf", "test_pdfs/SouthofFranceRestaurantsandHotels.pdf",  "--persona", "travel_planner", "--job", "France Travel", "--output", "output/final_test.json"]
