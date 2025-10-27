import sys
from pathlib import Path
from .ingest import ingest_local


def main():
    if len(sys.argv) < 2:
        print("Usage: python -m app.ingest_cli <file1> [file2 ...]")
        sys.exit(1)
    added = ingest_local(sys.argv[1:])
    print(f"Added {added} chunks")


if __name__ == "__main__":
    main()
