import AppLayout from "../layout/AppLayout";
import Tables from "../components/Tables";

const rows = [
  {
    id: "CL101",
    customer: "Rahul Sharma",
    amount: "₹45,000",
    status: "Pending"
  },
  {
    id: "CL102",
    customer: "Neha Verma",
    amount: "₹82,000",
    status: "Approved"
  },
  {
    id: "CL103",
    customer: "Arjun Patel",
    amount: "₹1,20,000",
    status: "Rejected"
  }
];

export default function Claims() {
  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Claims Review Center
      </h1>

      <Tables rows={rows} />

    </AppLayout>
  );
}