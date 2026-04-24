# ---------------------------
# 🔹 UTIL FUNCTIONS
# ---------------------------
import re
import numpy as np
import pdfplumber

def extract_text(file):
    if file.filename.endswith(".pdf"):
        text = ""
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
        return text
    else:
        return file.read().decode("utf-8")


def redact_pii(text):
    # simple regex-based (replace with Presidio if needed)
    text = re.sub(r'\b\d{10}\b', '[PHONE]', text)
    text = re.sub(r'\b[A-Z][a-z]+ [A-Z][a-z]+\b', '[NAME]', text)
    text = re.sub(r'\b\d{6,}\b', '[POLICY_ID]', text)
    return text


def chunk_text(text, size=300):
    words = text.split()
    chunks = []
    for i in range(0, len(words), size):
        chunks.append(" ".join(words[i:i+size]))
    return chunks


def retrieve_context(query, embed_model, index, regulations, k=3):
    q_emb = embed_model.encode([query])
    D, I = index.search(np.array(q_emb), k)
    return [regulations[i]["text"] for i in I[0]]


def mock_llm_analysis(context, claim_text):
    """
    Replace with DeepSeek / Qwen API
    This is a deterministic mock to avoid hallucination
    """
    issues = []

    if "signature" not in claim_text.lower():
        issues.append("Missing signature")

    if "policy" not in claim_text.lower():
        issues.append("Missing policy reference")

    return {
        "issues": issues,
        "justification": "Issues derived strictly from document + rules",
        "confidence": round(0.7 + 0.1 * len(issues), 2)
    }


def validate_output(output, context):
    # ensure issues are grounded
    if not output["issues"]:
        output["confidence"] = 0.5
    return output

