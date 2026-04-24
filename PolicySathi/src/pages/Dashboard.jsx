import AppLayout from "../layout/AppLayout";
import KPI from "../components/KPI";
import Charts from "../components/Charts";

import { ragResult } from "../data/ragMockData";

export default function Dashboard() {
  return (
    <AppLayout>

      <div className="grid md:grid-cols-4 gap-4">

        <KPI title="Risk Score" value={`${ragResult.summary.riskScore}%`} />
        <KPI title="Confidence" value={`${ragResult.summary.confidence}%`} />
        <KPI title="Status" value={ragResult.summary.status} />
        <KPI title="Review Time" value={ragResult.summary.processingTime} />

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

          {ragResult.findings.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 p-4 rounded-2xl mb-3"
            >
              <div>{item.issue}</div>
              <div className="text-rose-300 text-sm mt-1">
                {item.severity}
              </div>
            </div>
          ))}

        </div>

      </div>

    </AppLayout>
  );
}