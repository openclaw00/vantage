"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  index: number;
  date: string;
  score: number;
  subject: string;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: DataPoint; value: number }> }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[#0B1830] border border-[#162840] rounded px-3 py-2 text-xs">
      <div className="text-[#F5F0E8] font-medium mb-0.5">{d.score}%</div>
      <div className="text-[#7A90A8]">{d.subject}</div>
      <div className="text-[#3A5068]">{d.date}</div>
    </div>
  );
};

export function DashboardCharts({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#162840" />
        <XAxis
          dataKey="index"
          tick={{ fill: "#3A5068", fontSize: 10, fontFamily: "var(--font-mono)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: "#3A5068", fontSize: 10, fontFamily: "var(--font-mono)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#D97706"
          strokeWidth={2}
          dot={{ fill: "#D97706", strokeWidth: 0, r: 3 }}
          activeDot={{ r: 5, fill: "#F59E0B", strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
