import duckdb
import os

def load_csv_to_duckdb(csv_path: str, duckdb_path: str, table_name: str = 'nyc_taxi_trips') -> str:
    """Load a CSV into a DuckDB database file."""
    os.makedirs(os.path.dirname(duckdb_path), exist_ok=True)
    print(f"Loading {csv_path} into DuckDB at {duckdb_path} (table: {table_name}) ...")
    con = duckdb.connect(duckdb_path)
    # create or replace table by reading csv
    con.execute(f"CREATE OR REPLACE TABLE {table_name} AS SELECT * FROM read_csv_auto('{csv_path}') limit 0")
    con.execute(f"INSERT INTO {table_name} SELECT * FROM read_csv_auto('{csv_path}')")

    # simple index-like optimization: run ANALYZE
    try:
        con.execute(f"ANALYZE {table_name}")
    except Exception as e:
        print(f"Warning: ANALYZE failed with error: {e}")
    con.close()
    print(f"Loaded data {csv_path} into DuckDB: {duckdb_path}")
    return duckdb_path


if __name__ == '__main__':
    import os
    for _, _, filenames in os.walk('./data/processed'):
        for filename in filenames:
            load_csv_to_duckdb(f'data/processed/{filename}', 'data/nyc_taxi.duckdb')
