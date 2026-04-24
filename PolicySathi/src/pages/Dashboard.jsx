import AppLayout from "../layout/AppLayout";
import KPI from "../components/KPI";
import Charts from "../components/Charts";
import { useResult } from "../context/ResultContext";
import { ragResult } from "../data/ragMockData";

export default function Dashboard() {
  const { result } = useResult();
  const data = result || ragResult;

  return (
    <AppLayout>

      <div className="grid md:grid-cols-4 gap-4">

        <KPI title="Risk Score" value={`${data.summary.riskScore}%`} />
        <KPI title="Confidence" value={`${data.summary.confidence}%`} />
        <KPI title="Status" value={data.summary.status} />
        <KPI title="Review Time" value={data.summary.processingTime} />

      </div>

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

          {data.findings && data.findings.length > 0 ? (
            data.findings.map((item) => (
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
