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
          <Charts />
        </div>

        <RiskGauge />

      </div>

    </AppLayout>
  );
}