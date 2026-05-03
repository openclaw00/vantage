"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DataPoint { index: number; date: string; score: number; subject: string }

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: DataPoint }> }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[#0c0c18] border border-white/[0.09] rounded-xl px-3 py-2 text-xs shadow-lg">
      <div className="text-white font-semibold mb-0.5">{d.score}%</div>
      <div className="text-white/40">{d.subject} · {d.date}</div>
    </div>
  );
};

export function DashboardCharts({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="index" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6", strokeWidth: 0, r: 3 }} activeDot={{ r: 5, fill: "#a78bfa", strokeWidth: 0 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
