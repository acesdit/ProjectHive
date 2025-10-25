from __future__ import annotations
import orjson
from datetime import datetime
from pathlib import Path
from typing import Any, Dict

from .config import LOGS_DIR


def log_event(event: Dict[str, Any]) -> None:
    ts = datetime.utcnow()
    fn = LOGS_DIR / f"conversations_{ts.strftime('%Y-%m-%d')}.jsonl"
    record = {"ts": ts.isoformat() + "Z", **event}
    with open(fn, "ab") as f:
        f.write(orjson.dumps(record))
        f.write(b"\n")
