import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar, LineChart, Line } from "recharts";
import { sellerAnalyticsData } from "@/data/adminMockData";

const AnalyticsPage = () => {
  const [period, setPeriod] = useState("30j");
  const { dailySales, topCountries, kitPerformance } = sellerAnalyticsData;
  const maxCountry = topCountries[0].sales;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight">Analytics</h1>
        <div className="flex gap-1 bg-puchk-surface rounded-xl p-1">
          {["7j", "30j", "90j", "12m"].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-bold spring-transition ${period === p ? "bg-puchk-orange text-white" : "text-white/40 hover:text-white"}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* Main chart */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Ventes par jour</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailySales}>
              <defs><linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF6B1A" stopOpacity={0.2} /><stop offset="100%" stopColor="#FF6B1A" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(28,28,28,0.9)", border: "1px solid rgba(255,107,26,0.2)", borderRadius: "12px" }} />
              <Area type="monotone" dataKey="sales" stroke="#FF6B1A" strokeWidth={2} fill="url(#aGrad)" dot={false} activeDot={{ r: 5, fill: "#FF6B1A" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3 mini charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-2xl p-5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Revenus (€)</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySales}><Line type="monotone" dataKey="revenue" stroke="#FF6B1A" strokeWidth={2} dot={false} /><XAxis dataKey="date" hide /><YAxis hide /></LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Previews écoutées</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySales}><Bar dataKey="previews" fill="#FF6B1A" radius={[4, 4, 0, 0]} /><XAxis dataKey="date" hide /><YAxis hide /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Taux de conversion (%)</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySales}><Line type="monotone" dataKey="conversion" stroke="#22C55E" strokeWidth={2} dot={false} /><XAxis dataKey="date" hide /><YAxis hide /></LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Kit performance */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Performance par kit</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-puchk-deep">{["Kit", "Ventes", "Revenus", "Écoutes", "Conversion"].map((h) => <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">{h}</th>)}</tr></thead>
            <tbody>
              {kitPerformance.map((kp, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-puchk-orange/5 spring-transition">
                  <td className="px-4 py-3 text-sm font-bold">{kp.kit.name}</td>
                  <td className="px-4 py-3 text-sm">{kp.sales.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-bold text-puchk-orange">{kp.revenue.toLocaleString()}€</td>
                  <td className="px-4 py-3 text-sm text-white/60">{kp.previews.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{kp.conversion}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top countries */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Top pays acheteurs</h3>
        <div className="space-y-3">
          {topCountries.map((c) => (
            <div key={c.country} className="flex items-center gap-3">
              <span className="text-sm w-40">{c.country}</span>
              <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-puchk-orange rounded-full" style={{ width: `${(c.sales / maxCountry) * 100}%` }} />
              </div>
              <span className="text-sm font-bold w-12 text-right">{c.sales}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
