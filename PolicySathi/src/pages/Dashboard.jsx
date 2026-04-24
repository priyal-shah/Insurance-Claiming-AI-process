import AppLayout from "../layout/AppLayout";
import KPI from "../components/KPI";
import Charts from "../components/Charts";

import {
  stats,
  findings
} from "../data/ragMockData";

export default function Dashboard() {
  return (
    <AppLayout>

      <div className="grid md:grid-cols-4 gap-4">

        {stats.map((item) => (
          <KPI
            key={item.title}
            title={item.title}
            value={item.value}
          />
        ))}

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

          {findings.map((item) => (
            <div
              key={item.issue}
              className="bg-white/5 p-4 rounded-2xl mb-3"
            >
              <div className="font-medium">
                {item.issue}
              </div>

              <div className="text-sm text-rose-300 mt-1">
                {item.severity}
              </div>
            </div>
          ))}

        </div>

      </div>

    </AppLayout>
  );
}