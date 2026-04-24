import os
import json
import ssl
import sys
import warnings

# Disable SSL verification for HuggingFace downloads (workaround for SSL cert issues)
os.environ['CURL_CA_BUNDLE'] = ''
os.environ['HF_HUB_DISABLE_IMPERSONATOR'] = '1'
os.environ['REQUESTS_CA_BUNDLE'] = ''
os.environ['SSL_CERT_FILE'] = ''
ssl._create_default_https_context = ssl._create_unverified_context

# Disable SSL warnings
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Patch requests to always use verify=False
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Monkey-patch merge_environment_settings to disable SSL verification
original_merge_environment_settings = requests.Session.merge_environment_settings

def merge_environment_settings(self, url, proxies, stream, verify, cert):
    settings = original_merge_environment_settings(self, url, proxies, stream, verify, cert)
    settings['verify'] = False
    return settings

requests.Session.merge_environment_settings = merge_environment_settings

from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Add BackEnd to path and import utilities
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'BackEnd'))
from BackEnd.Utils import (
    extract_text, redact_pii, chunk_text, retrieve_context,
    mock_llm_analysis, validate_output, extract_customer_name
)
import time

app = Flask(__name__)

# ---------------------------
# 🔹 Load Embedding Model
# ---------------------------
embed_model = SentenceTransformer('all-MiniLM-L6-v2')

# ---------------------------
# 🔹 Load Regulatory Dataset
# ---------------------------
data_path = os.path.join(os.path.dirname(__file__), 'data', 'regulations.json')
with open(data_path, "r") as f:
    regulations = json.load(f)

reg_texts = [r["text"] for r in regulations]
reg_embeddings = embed_model.encode(reg_texts)

dim = reg_embeddings.shape[1]
index = faiss.IndexFlatL2(dim)
index.add(np.array(reg_embeddings))

# ---------------------------
# 🔹 MAIN API
# ---------------------------

@app.route("/analyze", methods=["POST"])
def analyze():
    start_time = time.time()
    file = request.files["file"]
    file_name = file.filename

    # Step 1: Extract raw text
    text = extract_text(file)

    # Extract customer name before redaction
    customer_name = extract_customer_name(text)

    # Step 2: Redact PII
    redacted = redact_pii(text)

    # Step 3: Chunk
    chunks = chunk_text(redacted)

    # Step 4: Retrieve context (returns regulation objects)
    context_objs = retrieve_context(chunks[0], embed_model, index, regulations)
    context_texts = [obj["text"] for obj in context_objs]

    # Step 5: LLM Analysis with structured findings
    result = mock_llm_analysis(context_objs, redacted)

    # Step 6: Validate & calculate risk metrics
    final_result = validate_output(result, context_objs)

    processing_time = round(time.time() - start_time, 1)

    # Transform into ragResult format
    response_payload = {
        "fileName": file_name,
        "claimId": f"CLM-{time.strftime('%Y')}-{str(int(time.time()))[-3:]}",
        "customer": customer_name,
        "jurisdiction": "India",
        "summary": {
            "riskScore": final_result.get("riskScore", 0),
            "status": final_result.get("status", "Clean"),
            "confidence": final_result.get("confidence", 94),
            "processingTime": f"{processing_time} sec"
        },
        "findings": final_result.get("findings", []),
        "context_used": context_texts,
        "redacted_text": redacted[:500]
    }

    return jsonify(response_payload)


@app.route("/health", methods=["GET"])
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(debug=True)
