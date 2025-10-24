from typing import List, Tuple
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser

from .config import GOOGLE_API_KEY, GEN_AI_MODEL


def build_llm():
    if not GOOGLE_API_KEY:
        raise RuntimeError("GOOGLE_API_KEY not set")
    return ChatGoogleGenerativeAI(model=GEN_AI_MODEL, google_api_key=GOOGLE_API_KEY, temperature=0.2)


SYSTEM_PROMPT = (
    "You are a helpful, concise campus assistant. Answer in the user's language. "
    "Cite from provided context only. If unsure, say you are not certain and suggest the official contact."
)


def build_rag_chain(retriever):
    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT + "\nContext:\n{context}"),
        ("human", "{question}"),
    ])
    llm = build_llm()
    return prompt | llm | StrOutputParser()
