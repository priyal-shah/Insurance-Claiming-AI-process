import { useResult } from "../context/ResultContext";

export default function RiskGauge() {
  const { result } = useResult();

  const getColor = (score) => {
    if (score >= 60) return "text-red-400";
    if (score >= 30) return "text-amber-400";
    return "text-emerald-400";
  };

  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center">

      <h2 className="text-xl font-semibold mb-4">
        Overall Risk Score
      </h2>

      {result ? (
        <>
          <div className={`text-6xl font-bold ${getColor(result.summary.riskScore)}`}>
            {result.summary.riskScore}%
          </div>

          <p className="text-slate-400 mt-2">
            {result.summary.status}
          </p>
        </>
      ) : (
        <>
          <div className="text-4xl font-bold text-slate-500">--</div>
          <p className="text-slate-400 mt-2">No data</p>
        </>
      )}

    </div>
  );
}
