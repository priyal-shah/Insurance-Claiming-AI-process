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


def extract_customer_name(text):
    """Extract claimant/customer name from document before redaction."""
    patterns = [
        r'(?:Claimant|Customer|Insured|Policyholder|Applicant)[\s]*[:\-]?\s*([A-Z][a-z]+\s[A-Z][a-z]+)',
        r'(?:Name)[\s]*[:\-]?\s*([A-Z][a-z]+\s[A-Z][a-z]+)'
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(1)
    return "Unknown"


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
    """Return full regulation objects for mapping to findings."""
    q_emb = embed_model.encode([query])
    D, I = index.search(np.array(q_emb), k)
    return [regulations[i] for i in I[0]]


def mock_llm_analysis(context_objs, claim_text):
    """
    Return structured findings matching ragResult format.
    context_objs: list of regulation dicts {id, text, category}
    """
    findings = []
    next_id = 1

    # Map issues to regulations by category
    regulation_map = {obj["category"]: obj for obj in context_objs}

    if "signature" not in claim_text.lower():
        reg = regulation_map.get("documentation", {"id": "REG001", "text": "Documentation rules"})
        findings.append({
            "id": next_id,
            "issue": "Missing claimant signature",
            "severity": "High",
            "confidence": 97,
            "regulation": reg["id"]
        })
        next_id += 1

    if "policy" not in claim_text.lower():
        reg = regulation_map.get("validation", {"id": "REG007", "text": "Validation rules"})
        findings.append({
            "id": next_id,
            "issue": "Policy number mismatch / missing reference",
            "severity": "High",
            "confidence": 91,
            "regulation": reg["id"]
        })
        next_id += 1

    # Additional heuristic checks
    if "date" not in claim_text.lower() and "2024" not in claim_text.lower():
        reg = regulation_map.get("timelines", {"id": "REG002", "text": "Timeline rules"})
        findings.append({
            "id": next_id,
            "issue": "Late claim submission / missing dates",
            "severity": "Medium",
            "confidence": 88,
            "regulation": reg["id"]
        })
        next_id += 1

    if "receipt" not in claim_text.lower() and "document" not in claim_text.lower():
        reg = regulation_map.get("documentation", {"id": "REG004", "text": "Supporting docs"})
        findings.append({
            "id": next_id,
            "issue": "Missing supporting documents / receipts",
            "severity": "Medium",
            "confidence": 85,
            "regulation": reg["id"]
        })
        next_id += 1

    confidence = round(70 + 8 * len(findings), 2) if findings else 94.0

    return {
        "findings": findings,
        "justification": "Issues derived strictly from document + rules",
        "confidence": min(confidence, 99.0)
    }


def calculate_risk_score(findings):
    """Calculate risk score from findings (0-100)."""
    severity_weights = {"High": 30, "Medium": 15, "Low": 5}
    score = sum(severity_weights.get(f["severity"], 10) for f in findings)
    return min(score, 100)


def get_status_from_risk(score):
    if score >= 60:
        return "High Risk"
    elif score >= 30:
        return "Medium Risk"
    elif score > 0:
        return "Low Risk"
    return "Clean"


def validate_output(output, context_objs):
    """Validate and enrich output with risk metrics."""
    findings = output.get("findings", [])
    risk_score = calculate_risk_score(findings)
    output["riskScore"] = risk_score
    output["status"] = get_status_from_risk(risk_score)
    if not findings:
        output["confidence"] = 94.0
    return output

