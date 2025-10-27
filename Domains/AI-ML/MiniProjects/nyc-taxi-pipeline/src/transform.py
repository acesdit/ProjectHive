
import os
import pandas as pd

def transform_parquet_to_csv(parquet_path: str, csv_path: str) -> str:
    """Read parquet, perform light cleaning, and write to CSV."""
    print(f"Reading parquet from {parquet_path} ...")
    df = pd.read_parquet(parquet_path, engine='auto')

    # Select a subset of columns (NYC yellow taxi common columns)
    possible_cols = [
        'tpep_pickup_datetime', 'tpep_dropoff_datetime', 'passenger_count',
        'trip_distance', 'payment_type', 'fare_amount', 'extra', 'mta_tax',
        'tip_amount', 'tolls_amount', 'improvement_surcharge', 'total_amount',
        'congestion_surcharge', 'store_and_fwd_flag', 'PULocationID', 'DOLocationID'
    ]
    cols = [c for c in possible_cols if c in df.columns]
    df = df[cols]

    # Basic cleaning: remove non-positive distances / totals
    if 'trip_distance' in df.columns:
        df = df[df['trip_distance'] > 0]
    if 'total_amount' in df.columns:
        df = df[df['total_amount'] > 0]

    os.makedirs(os.path.dirname(csv_path), exist_ok=True)
    df.to_csv(csv_path, index=False)
    print(f"Transformed data written to {csv_path} (rows: {len(df)})")
    return csv_path


if __name__ == '__main__':
    import os
    for _, _, filenames in os.walk('./data/raw'):
        print(filenames)
        for filename in filenames:
            new_filename = filename.split('.')[0] + '_cleaned.csv'
            transform_parquet_to_csv(f'data/raw/{filename}', f'data/processed/{new_filename}')