import AppLayout from "../layout/AppLayout";
import FindingsTable from "../components/FindingsTable";
import { useResult } from "../context/ResultContext";
import { ragResult } from "../data/ragMockData";

export default function Report() {
  const { result } = useResult();
  const data = result || ragResult;

  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Compliance Risk Report
      </h1>

      <FindingsTable findings={data.findings || []} />

    </AppLayout>
  );
}
