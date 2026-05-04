"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint { index: number; date: string; score: number; subject: string }

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: DataPoint }> }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const color = d.score >= 70 ? "#16a34a" : d.score >= 50 ? "#d97706" : "#dc2626";
  return (
    <div
      className="px-3 py-2.5 text-xs rounded-xl"
      style={{
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)"
      }}
    >
      <div className="font-bold mb-0.5" style={{ color, fontSize: 16 }}>{d.score}%</div>
      <div className="text-gray-500">{d.subject}</div>
      <div className="text-gray-400 font-mono">{d.date}</div>
    </div>
  );
};

export function DashboardCharts({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <AreaChart data={data} margin={{ top: 8, right: 4, left: -28, bottom: 0 }}>
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" stopOpacity={0.25} />
            <stop offset="60%" stopColor="#22c55e" stopOpacity={0.06} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
        <XAxis
          dataKey="index"
          tick={{ fill: "rgba(0,0,0,0.3)", fontSize: 10, fontFamily: "var(--font-mono)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: "rgba(0,0,0,0.3)", fontSize: 10, fontFamily: "var(--font-mono)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(249,115,22,0.2)", strokeWidth: 1.5 }} />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#16a34a"
          strokeWidth={2.5}
          fill="url(#scoreGrad)"
          dot={{ fill: "#16a34a", strokeWidth: 0, r: 3.5 }}
          activeDot={{ r: 6, fill: "#22c55e", strokeWidth: 2, stroke: "rgba(22,163,74,0.3)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
