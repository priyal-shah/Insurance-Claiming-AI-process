import AppLayout from "../layout/AppLayout";
import { useResult } from "../context/ResultContext";

export default function Claims() {
  const { result } = useResult();

  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Claims Review Center
      </h1>

      {result ? (
        <div className="space-y-4">
          <div
            className="bg-white/5 border border-white/10 p-5 rounded-3xl flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{result.claimId}</div>
              <div className="text-slate-400">{result.customer}</div>
            </div>

            <div className="text-slate-400">{result.fileName}</div>

            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              result.summary.status === "High Risk"
                ? "bg-red-400/10 text-red-400"
                : result.summary.status === "Medium Risk"
                ? "bg-amber-400/10 text-amber-400"
                : "bg-emerald-400/10 text-emerald-400"
            }`}>
              {result.summary.status}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
          <p className="text-slate-400">Upload a claim file to see reviewed claims</p>
        </div>
      )}

    </AppLayout>
  );
}
