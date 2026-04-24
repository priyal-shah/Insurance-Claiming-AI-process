import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { riskTrend } from "../data/ragMockData";

export default function Charts() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={riskTrend}>
          <XAxis dataKey="month" stroke="#94a3b8" />
          <Tooltip />
          <Bar
            dataKey="risk"
            fill="#06b6d4"
            radius={[10,10,0,0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}