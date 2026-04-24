import AppLayout from "../layout/AppLayout";
import { useResult } from "../context/ResultContext";
import { ragResult } from "../data/ragMockData";

export default function Alerts() {
  const { result } = useResult();
  const data = result || ragResult;

  const highRisk = data.findings ? data.findings.filter(
    (x) => x.severity === "High"
  ) : [];

  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Compliance Alerts
      </h1>

      {highRisk.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">

          {highRisk.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 p-6 rounded-3xl"
            >
              <h2 className="text-xl font-semibold">
                {item.issue}
              </h2>

              <p className="text-rose-300 mt-2">
                High Severity
              </p>
            </div>
          ))}

        </div>
      ) : (
        <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-6 text-center">
          <p className="text-emerald-400">No high-risk alerts at this time.</p>
        </div>
      )}

    </AppLayout>
  );
}
