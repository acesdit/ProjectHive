from typing import Iterable, List
import argparse
from datetime import datetime, timedelta

from prefect import flow, task, get_run_logger
from prefect.tasks import task_input_hash

from src.extract import extract_data
from src.transform import transform_parquet_to_csv
from src.load import load_csv_to_duckdb


@task(retries=2, retry_delay_seconds=10, cache_key_fn=task_input_hash, cache_expiration=timedelta(days=1))
def extract_task(year: int, month: int, save_dir: str = "data/raw") -> str:
    logger = get_run_logger()
    logger.info(f"Extracting data for {year}-{month:02d}")
    extract_path = extract_data(year, month, save_dir=save_dir)
    return extract_path


@task(retries=1, retry_delay_seconds=5)
def transform_task(parquet_path: str, processed_dir: str = "data/processed") -> str:
    logger = get_run_logger()
    logger.info(f"Transforming parquet: {parquet_path}")
    filename = f"{parquet_path.split('/')[-1].split('.')[0]}_cleaned.csv"
    csv_path = f"{processed_dir.rstrip('/')}/{filename}"
    transform_path = transform_parquet_to_csv(parquet_path, csv_path)
    return transform_path


@task(retries=1, retry_delay_seconds=5)
def load_task(csv_path: str, duckdb_path: str = "data/nyc_taxi.duckdb", table_name: str = "nyc_taxi_trips") -> str:
    logger = get_run_logger()
    load_path = load_csv_to_duckdb(csv_path, duckdb_path, table_name=table_name)
    return load_path


@flow(name="nyc-taxi-etl")
def etl_flow(year: int, months: Iterable[int], save_dir: str = "data/raw", processed_dir: str = "data/processed", duckdb_path: str = "data/nyc_taxi.duckdb"):
    """
    Run ETL for the given year and months.
    months can be a single-month list like [9] or a range like [1,2,3]
    """
    logger = get_run_logger()
    months_list: List[int] = list(months)
    logger.info(f"Starting ETL for {year} months={months_list}")

    for month in months_list:
        try:
            parquet = extract_task.submit(year, month, save_dir)
            csv = transform_task.submit(parquet, processed_dir)
            load_task.submit(f'data/processed/yellow_tripdata_{year}-{month:02d}_cleaned.csv', duckdb_path)
        except Exception as e:
            logger.error(f"Error processing {year}-{month:02d}: {e}")

    logger.info("ETL flow submitted for all months.")


if __name__ == "__main__":
    now = datetime.now()
    default_year = now.year
    default_month = now.month - 1 or 12

    parser = argparse.ArgumentParser(description="Run nyc taxi ETL Prefect flow.")
    parser.add_argument("--year", type=int, default=default_year, help="Year to run ETL for")
    parser.add_argument("--months", type=str, default=str(default_month),
                        help="Comma-separated month list (e.g. 1,2,3) or single month (e.g. 9)")
    args = parser.parse_args()

    months_input = [int(m.strip()) for m in args.months.split(",") if m.strip()]
    # Basic validation
    for m in months_input:
        if not 1 <= m <= 12:
            raise ValueError(f"Invalid month: {m}")
    if args.year > now.year or (args.year >= default_year and any(m > default_month for m in months_input)):
        raise ValueError("Requested year/month includes incomplete future data.")

    etl_flow(args.year, months_input)
