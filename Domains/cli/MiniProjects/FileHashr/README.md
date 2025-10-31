# FileHashr

**Contributor:** acesdit

## Description
Simple CLI tool to generate cryptographic hashes (SHA256 by default) for files or stdin. Useful for integrity checks and quick verifications.

## Features
- Hash a file or standard input
- Algorithms: sha256 (default), sha1, md5
- Output plain hash with optional filename

## Usage
```bash
# Hash a file (sha256)
python3 filehashr.py path/to/file

# Specify algorithm
python3 filehashr.py --algo sha1 path/to/file

# Read from stdin
echo "hello" | python3 filehashr.py --algo md5
```

## Arguments
- `path` (optional): Path to the file. If omitted, reads from stdin.
- `--algo` / `-a`: Hash algorithm (`sha256`, `sha1`, `md5`). Default: `sha256`.
- `--label` / `-l`: Append filename label to output when hashing a file.

## Requirements
- Python 3.8+
- No external dependencies

## Examples
```bash
python3 filehashr.py sample.txt
python3 filehashr.py -a md5 -l sample.txt
cat sample.txt | python3 filehashr.py -a sha1
```

## Notes
- For large files, the script streams in chunks to minimize memory usage.


