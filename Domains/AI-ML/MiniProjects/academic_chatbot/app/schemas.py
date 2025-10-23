from pydantic import BaseModel, Field
from typing import List, Optional


class IngestRequest(BaseModel):
    files: List[str] = Field(default_factory=list, description="List of filenames under data/")


class ChatRequest(BaseModel):
    session_id: str
    message: str
    language: str = "auto"


class ChatResponse(BaseModel):
    answer: str
    fallback_used: bool = False
    sources: List[str] = Field(default_factory=list)
