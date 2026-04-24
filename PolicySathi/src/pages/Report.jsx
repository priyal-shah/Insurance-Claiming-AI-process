import AppLayout from "../layout/AppLayout";
import FindingsTable from "../components/FindingsTable";
import { useResult } from "../context/ResultContext";

export default function Report() {
  const { result } = useResult();

  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Compliance Risk Report
      </h1>

      {result ? (
        <FindingsTable findings={result.findings || []} />
      ) : (
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
          <p className="text-slate-400">Upload a claim file to generate a report</p>
        </div>
      )}

    </AppLayout>
  );
}
