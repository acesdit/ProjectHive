import os
import requests
import argparse
from datetime import datetime

def extract_data(year: int, month: int, save_dir: str = "data/raw") -> str:
    """
    Download NYC Yellow Taxi Parquet file for a given year and month.

    Args:
        year (int): Year of the dataset (e.g. 2023)
        month (int): Month of the dataset (1-12)

    Returns:
        str: Path to downloaded parquet file
    """
    os.makedirs(save_dir, exist_ok=True)
    month_str = f"{month:02d}"
    url = f"https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_{year}-{month_str}.parquet"
    save_path = os.path.join(save_dir, f"yellow_tripdata_{year}-{month_str}.parquet")

    print(f"📦 Downloading NYC Yellow Taxi data for {year}-{month_str}...")
    response = requests.get(url, stream=True)
    response.raise_for_status()

    with open(save_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=4000):
            if chunk:
                f.write(chunk)

    print(f"✅ Saved file to {save_path}")
    return save_path


if __name__ == "__main__":
    now = datetime.now()
    month, year = now.month, now.year

    parser = argparse.ArgumentParser(description="Download NYC Taxi data for a specific month/year.")
    parser.add_argument("--year", type=int, required=True, default=year, help="Year of dataset (e.g. 2025)")
    parser.add_argument("--month", type=int, required=True, default=month-1, help="Month of dataset (1-12)")

    args = parser.parse_args()
    if args.year > year:
        raise ValueError("Year should not exceed the current year!")
    if args.month >= month:
        raise ValueError(f"Complete {args.month}-{args.year} data is yet to be collected")

    extract_data(args.year, args.month)