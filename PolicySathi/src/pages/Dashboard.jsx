import AppLayout from "../layout/AppLayout";
import KPI from "../components/KPI";
import Charts from "../components/Charts";
import { useResult } from "../context/ResultContext";

export default function Dashboard() {
  const { result } = useResult();

  return (
    <AppLayout>

      {result ? (
        <div className="grid md:grid-cols-4 gap-4">

          <KPI title="Risk Score" value={`${result.summary.riskScore}%`} />
          <KPI title="Confidence" value={`${result.summary.confidence}%`} />
          <KPI title="Status" value={result.summary.status} />
          <KPI title="Review Time" value={result.summary.processingTime} />

        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center mb-6">
          <p className="text-slate-400">Upload a claim file to see analysis results</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 mt-6">

        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-3xl">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Risk Trend
          </h2>

          <Charts />
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">

          <h2 className="text-xl font-semibold mb-4">
            Latest Findings
          </h2>

          {result && result.findings && result.findings.length > 0 ? (
            result.findings.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 p-4 rounded-2xl mb-3"
              >
                <div>{item.issue}</div>
                <div className="text-rose-300 text-sm mt-1">
                  {item.severity}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-4 text-center">
              <p className="text-emerald-400 text-sm">No issues found</p>
            </div>
          )}

        </div>

      </div>

    </AppLayout>
  );
}
