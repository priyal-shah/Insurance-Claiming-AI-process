import AppLayout from "../layout/AppLayout";
import FindingsTable from "../components/FindingsTable";
import { ragResult } from "../data/ragMockData";

export default function Report() {
  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Compliance Risk Report
      </h1>

      <FindingsTable findings={ragResult.findings} />

    </AppLayout>
  );
}