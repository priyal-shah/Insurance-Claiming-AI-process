import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useResult } from "../context/ResultContext";

export default function Charts() {
  const { result } = useResult();

  // Build chart data from result if available, otherwise empty
  const data = result
    ? [{ month: "Current", risk: result.summary.riskScore }]
    : [];

  return (
    <div className="h-80">

      {result ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#94a3b8" />
            <Tooltip />
            <Bar
              dataKey="risk"
              fill="#06b6d4"
              radius={[10,10,0,0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-slate-400">Upload a file to see risk analytics</p>
        </div>
      )}

    </div>
  );
}
