export const ragResult = {
  fileName: "Health_Claim_2026.pdf",
  claimId: "CLM-2026-001",
  customer: "Rahul Sharma",
  jurisdiction: "India",
  processedAt: "24 Apr 2026 14:22",

  summary: {
    riskScore: 78,
    status: "High Risk",
    confidence: 94,
    processingTime: "6.4 sec"
  },

  findings: [
    {
      id: 1,
      issue: "Missing claimant signature",
      severity: "High",
      confidence: 97,
      regulation: "IRDAI Claim Form Rule 2.1",
      page: 2,
      recommendation: "Obtain signed declaration"
    },
    {
      id: 2,
      issue: "Claim submitted after allowed timeline",
      severity: "Medium",
      confidence: 88,
      regulation: "Submission within 30 days",
      page: 1,
      recommendation: "Need late filing justification"
    },
    {
      id: 3,
      issue: "Policy number mismatch",
      severity: "High",
      confidence: 91,
      regulation: "Policy Validation Rule",
      page: 3,
      recommendation: "Verify policy reference"
    }
  ],

  aiDecision: {
    suggestedAction: "Hold for Manual Review",
    reason:
      "High severity issues detected including missing signature and policy mismatch."
  }
};

export const analyticsData = [
 { month:"Jan", highRisk:12, approved:84 },
 { month:"Feb", highRisk:19, approved:92 },
 { month:"Mar", highRisk:14, approved:87 },
 { month:"Apr", highRisk:24, approved:95 }
];

export const queueData = [
 {
   claimId:"CLM-2026-002",
   customer:"Neha Verma",
   status:"Approved",
   risk:18
 },
 {
   claimId:"CLM-2026-003",
   customer:"Arjun Patel",
   status:"Pending",
   risk:42
 }
];