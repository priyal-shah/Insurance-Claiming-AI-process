import AppLayout from "../layout/AppLayout";

const alerts = [
  {
    title: "Missing Signature",
    severity: "High"
  },
  {
    title: "Duplicate Claim Suspected",
    severity: "Medium"
  },
  {
    title: "Policy Mismatch",
    severity: "High"
  },
  {
    title: "KYC Pending",
    severity: "Low"
  }
];

export default function Alerts() {
  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Compliance Alerts
      </h1>

      <div className="grid md:grid-cols-2 gap-4">

        {alerts.map((item) => (
          <div
            key={item.title}
            className="bg-white/5 border border-white/10 p-6 rounded-3xl"
          >
            <h2 className="text-xl font-semibold">
              {item.title}
            </h2>

            <p className={`mt-2 ${
              item.severity === "High"
                ? "text-rose-300"
                : item.severity === "Medium"
                ? "text-amber-300"
                : "text-emerald-300"
            }`}>
              {item.severity}
            </p>
          </div>
        ))}

      </div>

    </AppLayout>
  );
}