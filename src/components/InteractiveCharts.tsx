import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Metric } from "../types";
import { Sparkles, TrendingUp } from "lucide-react";

interface InteractiveChartsProps {
  metrics: Metric[];
}

export const InteractiveCharts: React.FC<InteractiveChartsProps> = ({ metrics }) => {
  // Graceful fallback if metrics array is empty
  const defaultMetrics: Metric[] = [
    { traitName: "Empathy & Kindness", score: 95, description: "Treats others with kindness" },
    { traitName: "Chore Division Index", score: 90, description: "Happy to split 50/50 housework" },
    { traitName: "Communication Skill", score: 85, description: "Active open-minded conversations" },
    { traitName: "Self Reliance Status", score: 80, description: "Can wash own socks & organize room" },
    { traitName: "Financial Teamwork", score: 88, description: "Plans budget transparently" },
  ];

  const data = metrics && metrics.length === 5 ? metrics : defaultMetrics;

  // Golden and Bronze luxurious color scheme
  const colors = ["#b8860b", "#c5a059", "#aa7c11", "#d4af37", "#e1c16e"];

  return (
    <div className="bg-[#0c0d0f] rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8860b]/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#b8860b]/10 border border-[#b8860b]/20 text-[#b8860b] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#b8860b]" /> Core Marriage Assets
          </span>
          <h3 className="font-serif text-2xl font-bold text-white tracking-wide mt-1.5">
            Your Partnership Value Model
          </h3>
          <p className="text-gray-400 text-xs mt-0.5">
            These are the real asset classes that dictate success in modern marriage teams.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-medium text-gray-300">
          <TrendingUp className="w-4 h-4 text-[#b8860b]" /> Avg Core Index:{" "}
          <span className="font-mono font-bold text-[#b8860b]">
            {Math.round(data.reduce((acc, m) => acc + m.score, 0) / data.length)}%
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Recharts Column */}
        <div className="lg:col-span-7 h-64 md:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                dataKey="traitName"
                type="category"
                axisLine={false}
                tickLine={false}
                width={120}
                tick={{ fill: "#d1d5db", fontSize: 11, fontWeight: 500, fontFamily: "Inter" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(184, 134, 11, 0.05)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const m = payload[0].payload as Metric;
                    return (
                      <div className="bg-[#121418] text-white p-3.5 rounded-xl border border-white/15 shadow-2xll text-xs max-w-xs space-y-1.5">
                        <p className="font-bold font-serif text-[#b8860b] tracking-wider text-sm">{m.traitName}</p>
                        <p className="font-semibold text-white font-mono text-[11px]">Evaluated Competency: <span className="text-[#b8860b]">{m.score}%</span></p>
                        <p className="text-gray-400 text-[11px] leading-relaxed">{m.description}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={16}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Metrics breakdown cards */}
        <div className="lg:col-span-5 space-y-3">
          {data.map((metric, i) => (
            <div
              key={metric.traitName}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#b8860b]/30 transition-all duration-300"
            >
              {/* Colored tag */}
              <div
                className="w-2.5 h-10 rounded-full flex-shrink-0 mt-0.5"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex justify-between items-center gap-2">
                  <span className="font-semibold text-white text-xs truncate">
                    {metric.traitName}
                  </span>
                  <span className="text-xs font-bold text-[#b8860b] font-mono">
                    {metric.score}%
                  </span>
                </div>
                <p className="text-[10.5px] text-gray-400 leading-relaxed font-sans">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

