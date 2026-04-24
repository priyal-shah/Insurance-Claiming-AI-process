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
from BackEnd.Utils import extract_text, redact_pii, chunk_text, retrieve_context, mock_llm_analysis, validate_output

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
    # Debug: print what we received
    print("=== DEBUG INFO ===")
    print(f"request.files: {list(request.files.keys())}")
    print(f"request.form: {list(request.form.keys())}")
    print(f"request.content_type: {request.content_type}")
    print("==================")
    
    # Check if file is present
    if 'file' not in request.files:
        return jsonify({
            "error": "No file provided",
            "hint": "Make sure to use 'file' as the key name in form-data",
            "received_keys": list(request.files.keys())
        }), 400
    
    file = request.files["file"]
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # Step 1: Extract
    text = extract_text(file)

    # Step 2: Redact PII
    redacted = redact_pii(text)

    # Step 3: Chunk
    chunks = chunk_text(redacted)

    # Step 4: Retrieve context (use first chunk)
    context = retrieve_context(chunks[0], embed_model, index, regulations)

    # Step 5: LLM
    result = mock_llm_analysis(context, redacted)

    # Step 6: Validate
    final_result = validate_output(result, context)

    return jsonify({
        "redacted_text": redacted[:500],
        "context_used": context,
        "analysis": final_result
    })


@app.route("/health", methods=["GET"])
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(debug=True)
