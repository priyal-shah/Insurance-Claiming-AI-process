export const ragResult = {
  fileName: "Health_Claim_2026.pdf",
  claimId: "CLM-2026-001",
  customer: "Rahul Sharma",
  jurisdiction: "India",

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
      regulation: "IRDAI Rule 2.1"
    },
    {
      id: 2,
      issue: "Late claim submission",
      severity: "Medium",
      confidence: 88,
      regulation: "Submission within 30 days"
    },
    {
      id: 3,
      issue: "Policy number mismatch",
      severity: "High",
      confidence: 91,
      regulation: "Policy Validation Rule"
    }
  ]
};

export const queueData = [
  {
    id: "CLM-2026-002",
    customer: "Neha Verma",
    amount: "₹82,000",
    status: "Approved"
  },
  {
    id: "CLM-2026-003",
    customer: "Arjun Patel",
    amount: "₹1,25,000",
    status: "Pending"
  },
  {
    id: "CLM-2026-004",
    customer: "Sneha Joshi",
    amount: "₹58,000",
    status: "Rejected"
  }
];

export const chartData = [
  { month: "Jan", risk: 12 },
  { month: "Feb", risk: 22 },
  { month: "Mar", risk: 18 },
  { month: "Apr", risk: 28 }
];