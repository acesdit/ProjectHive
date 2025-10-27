# NYC Taxi Data Pipeline (Beginner)

**Contributor:** AksharGoyal

## Overview
This project demonstrates a small, production-like ETL pipeline for NYC Yellow Taxi trip data. It downloads monthly parquet files, performs light cleaning/transformation, and loads the cleaned CSV into a DuckDB file. The pipeline is orchestrated with Prefect and organized into modular extract / transform / load tasks so components can be reused or tested independently.  

## Tech stack
- Python >=3.12
- Prefect (Orchestration framework used to define tasks and flows, handle retries, caching, and logging)
- pyarrow / fastparquet (parquet engine)
- pandas (handling csv operations)
- DuckDB

## Features
- Modular ETL split into extract, transform, and load components.
- Prefect-based orchestration with retries, basic caching, and structured logging.
- Downloads monthly NYC Yellow Taxi parquet files from the public data CDN.
- Light cleaning and column selection to produce compact CSVs.
- Stores processed data in a DuckDB file for fast local analytics.
- Simple CLI entrypoints for running single-month or multi-month jobs.
- Minimal dependencies to keep the pipeline lightweight and portable.


## Structure
```
nyc-taxi-pipeline/
├── data/
│   ├── raw/
│   └── processed/
│   └── nyc_taxi.duckdb
├── src/
│   ├── __init__.py
│   ├── extract.py
│   ├── transform.py
│   ├── load.py
│   └── pipeline.py
├── pyproject.toml
├── uv.lock   # created by uv when you run uv sync / uv add
├── README.md
└── .github/workflows/ci.yml
```

## Quickstart (using `uv`)

1. Initialize the project via uv
```sh
uv sync`
```
2. Run the following command to start data orchestration.
```sh
uv run python -m src.pipeline
```
3. If you would like, you can provide your year and month(s) separated by commas.
```sh
uv run python -m src.pipeline --year 2025 --month 7,8,9
```
