import AppLayout from "../layout/AppLayout";
import Charts from "../components/Charts";
import RiskGauge from "../components/RiskGauge";

export default function Analytics() {
  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Analytics Center
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-3xl">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Risk Trend
          </h2>

          <Charts />
        </div>

        <RiskGauge />

      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">

        <div className="bg-white/5 p-6 rounded-3xl">
          <p className="text-slate-400">Total Claims</p>
          <h2 className="text-4xl font-bold mt-2">
            12,480
          </h2>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl">
          <p className="text-slate-400">Avg Processing Time</p>
          <h2 className="text-4xl font-bold mt-2">
            7 sec
          </h2>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl">
          <p className="text-slate-400">Compliance Accuracy</p>
          <h2 className="text-4xl font-bold mt-2">
            91%
          </h2>
        </div>

      </div>

    </AppLayout>
  );
}