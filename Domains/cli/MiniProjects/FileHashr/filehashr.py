#!/usr/bin/env python3
import argparse
import hashlib
import sys
from pathlib import Path


CHUNK_SIZE_BYTES = 1024 * 1024  # 1 MiB


def create_hasher(algorithm: str) -> "hashlib._Hash":
    normalized = algorithm.lower()
    if normalized not in {"sha256", "sha1", "md5"}:
        raise ValueError(f"Unsupported algorithm: {algorithm}. Use sha256, sha1, or md5.")
    return getattr(hashlib, normalized)()


def hash_file(path: Path, algorithm: str) -> str:
    hasher = create_hasher(algorithm)
    with path.open("rb") as file_handle:
        while True:
            chunk = file_handle.read(CHUNK_SIZE_BYTES)
            if not chunk:
                break
            hasher.update(chunk)
    return hasher.hexdigest()


def hash_stdin(algorithm: str) -> str:
    hasher = create_hasher(algorithm)
    stdin_buffer = getattr(sys.stdin, "buffer", sys.stdin)
    while True:
        chunk = stdin_buffer.read(CHUNK_SIZE_BYTES)
        if not chunk:
            break
        hasher.update(chunk)
    return hasher.hexdigest()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate cryptographic hash for a file or stdin (default: sha256)",
    )
    parser.add_argument(
        "path",
        nargs="?",
        type=Path,
        help="Path to file. If omitted, reads from stdin",
    )
    parser.add_argument(
        "-a",
        "--algo",
        default="sha256",
        choices=["sha256", "sha1", "md5"],
        help="Hash algorithm to use",
    )
    parser.add_argument(
        "-l",
        "--label",
        action="store_true",
        help="Append filename to output when hashing a file",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        if args.path is None:
            digest = hash_stdin(args.algo)
            print(digest)
            return 0

        if not args.path.exists() or not args.path.is_file():
            print(f"Error: File not found: {args.path}", file=sys.stderr)
            return 2

        digest = hash_file(args.path, args.algo)
        if args.label:
            print(f"{digest}  {args.path}")
        else:
            print(digest)
        return 0
    except BrokenPipeError:
        return 0
    except Exception as exc:  # deliberate broad to present clear CLI error
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())


