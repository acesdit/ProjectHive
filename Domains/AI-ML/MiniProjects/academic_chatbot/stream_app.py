import os
import io
import base64
import streamlit as st
from typing import List

from app.ingest import ingest_local
from app.vectordb import similarity_search
from app.llm import build_rag_chain
from app.config import TOP_K, CONTACT_FALLBACK, GOOGLE_API_KEY

# Voice deps
try:
    from streamlit_mic_recorder import mic_recorder
    import speech_recognition as sr
    from gtts import gTTS
    from pydub import AudioSegment
except Exception:
    mic_recorder = None

st.set_page_config(page_title="Campus Assistant - Streamlit (Local)", page_icon="🎓", layout="centered")

st.title("🎓 Campus Assistant - Local Prototype")

if not GOOGLE_API_KEY:
    st.error("GOOGLE_API_KEY not set. Add it to your environment or .env and restart.")

if "messages" not in st.session_state:
    st.session_state["messages"] = []
if "session_id" not in st.session_state:
    st.session_state["session_id"] = os.urandom(6).hex()

# Language selection (UI language and TTS language)
LANG_OPTIONS = {
    "English (en)": "en",
    "Hindi (hi)": "hi",
    "Bengali (bn)": "bn",
    "Marathi (mr)": "mr",
    "Tamil (ta)": "ta",
    "Telugu (te)": "te",
    "Kannada (kn)": "kn",
    "Gujarati (gu)": "gu",
}
col_lang, col_tts = st.columns(2)
with col_lang:
    ui_lang = st.selectbox("Preferred language", list(LANG_OPTIONS.keys()), index=0)
with col_tts:
    tts_lang = st.selectbox("Voice reply language", list(LANG_OPTIONS.keys()), index=0)
ui_lang_code = LANG_OPTIONS[ui_lang]
tts_lang_code = LANG_OPTIONS[tts_lang]

with st.sidebar:
    st.header("Ingestion (Local)")
    st.caption("Reads from the data/ directory recursively: pdfs, txt, md, csv, xlsx, xls")
    if st.button("Ingest: All under data/"):
        try:
            added = ingest_local([])
            st.success(f"Added {added} chunks")
        except Exception as e:
            st.error(str(e))
    subfolders = st.text_input("Or subfolders (comma-separated)", value="pdfs, excels")
    if st.button("Ingest: Selected subfolders"):
        items: List[str] = [s.strip() for s in subfolders.split(",") if s.strip()]
        try:
            added = ingest_local(items)
            st.success(f"Added {added} chunks from: {items}")
        except Exception as e:
            st.error(str(e))

st.write("")
st.caption(f"Session: {st.session_state['session_id']}")

# Chat history
for msg in st.session_state["messages"]:
    if msg["role"] in ("user", "assistant"):
        st.chat_message(msg["role"]).write(msg["content"]) 
        if msg["role"] == "assistant" and msg.get("audio_b64"):
            st.audio(msg["audio_b64"], format="audio/mp3")


def _transcode_to_wav_bytes(raw_bytes: bytes) -> bytes:
    # Try to decode with pydub using common browser formats, export WAV mono 16k
    last_error = None
    for fmt in (None, "webm", "ogg", "mp3", "wav"):
        try:
            seg = AudioSegment.from_file(io.BytesIO(raw_bytes), format=fmt) if fmt else AudioSegment.from_file(io.BytesIO(raw_bytes))
            seg = seg.set_channels(1).set_frame_rate(16000)
            out = io.BytesIO()
            seg.export(out, format="wav")
            out.seek(0)
            return out.read()
        except Exception as e:
            last_error = e
            continue
    raise RuntimeError(f"Could not transcode audio to WAV. Install ffmpeg and retry. Details: {last_error}")

# Input row: text + optional mic
col_text, col_mic = st.columns([3,1])
with col_text:
    prompt = st.chat_input("Ask about fees, scholarships, timetable, etc.")
voice_prompt = None
with col_mic:
    if mic_recorder is not None:
        audio = mic_recorder(start_prompt="🎙️ Voice", stop_prompt="Stop", just_once=True, use_container_width=True)
        if audio and audio.get("bytes"):
            try:
                wav_bytes = _transcode_to_wav_bytes(audio["bytes"]) if AudioSegment else audio["bytes"]
                rec = sr.Recognizer()
                with sr.AudioFile(io.BytesIO(wav_bytes)) as source:
                    audio_data = rec.record(source)
                    voice_prompt = rec.recognize_google(audio_data, language=ui_lang_code)
            except Exception as e:
                st.warning(f"Voice recognition error: {e}\nTip: install ffmpeg and ensure it's on PATH.")

user_input = prompt or voice_prompt

if user_input:
    st.session_state["messages"].append({"role": "user", "content": user_input})
    st.chat_message("user").write(user_input)

    try:
        docs = similarity_search(user_input, k=TOP_K)
        context_text = "\n\n".join(d.page_content for d in docs)
        sources = list({str(d.metadata.get("source", "unknown")) for d in docs})

        chain = build_rag_chain(retriever=None)
        answer = chain.invoke({"context": context_text, "question": user_input})
        if not docs or not context_text.strip():
            answer = answer.strip() + f"\n\nIf this doesn't answer your question, please contact: {CONTACT_FALLBACK}"

        entry = {"role": "assistant", "content": answer}

        # TTS synthesis
        try:
            tts = gTTS(text=answer, lang=tts_lang_code)
            buf = io.BytesIO()
            tts.write_to_fp(buf)
            buf.seek(0)
            audio_b64 = "data:audio/mp3;base64," + base64.b64encode(buf.read()).decode("ascii")
            entry["audio_b64"] = audio_b64
        except Exception:
            pass

        st.session_state["messages"].append(entry)
        st.chat_message("assistant").write(answer)
        if entry.get("audio_b64"):
            st.audio(entry["audio_b64"], format="audio/mp3")

        if sources:
            with st.expander("Sources"):
                for s in sources:
                    st.write(f"- {s}")

    except Exception as e:
        err = f"Error: {e}"
        st.session_state["messages"].append({"role": "assistant", "content": err})
        st.chat_message("assistant").write(err)
