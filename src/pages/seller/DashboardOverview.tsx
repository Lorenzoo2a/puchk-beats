import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Package, DollarSign, TrendingUp, Tag, Settings, Eye, Upload } from "lucide-react";
import { dashboardStats, recentSales, topKits, salesChartData, genreDistribution, kits } from "@/data/mockData";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Kit } from "@/data/mockData";

const StatCard = ({ stat }: { stat: { value: number; change: number; label: string; icon: string; suffix?: string } }) => (
  <div className="glass rounded-2xl p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-2xl">{stat.icon}</span>
      <span className={`text-xs font-bold ${stat.change >= 0 ? "text-puchk-success" : "text-puchk-error"}`}>
        {stat.change >= 0 ? "+" : ""}{stat.change}%
      </span>
    </div>
    <div className="text-2xl font-black text-white">
      {typeof stat.value === "number" && stat.value % 1 !== 0
        ? stat.value.toLocaleString("fr-FR", { minimumFractionDigits: 2 })
        : stat.value.toLocaleString()}
      {stat.suffix || (stat.label === "Revenus" ? " €" : "")}
    </div>
    <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{stat.label}</div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 shadow-xl">
        <p className="text-xs font-bold text-white mb-1">{label}</p>
        <p className="text-xs text-white/60">{payload[0].value} ventes</p>
        <p className="text-xs text-puchk-orange font-bold">{payload[0].payload.revenue.toFixed(2)}€</p>
      </div>
    );
  }
  return null;
};

const DashboardOverview = () => {
  const [period, setPeriod] = useState("30j");
  const periods = ["7j", "30j", "90j", "12m"];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight">Tableau de bord</h1>
          <p className="text-white/50 text-sm mt-1">Bienvenue, KXZMA 👋</p>
        </div>
        <div className="flex gap-1 bg-puchk-surface rounded-xl p-1">
          {periods.map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-bold spring-transition ${period === p ? "bg-puchk-orange text-white" : "text-white/40 hover:text-white"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.values(dashboardStats).map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </div>

      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Ventes des 30 derniers jours</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesChartData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B1A" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#FF6B1A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="sales" stroke="#FF6B1A" strokeWidth={2} fill="url(#salesGrad)" dot={false} activeDot={{ r: 5, fill: "#FF6B1A" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Ventes récentes</h3>
            <Link to="/dashboard/sales" className="text-[10px] text-puchk-orange uppercase tracking-wider hover:underline">Voir tout →</Link>
          </div>
          <div className="space-y-1">
            {recentSales.map((sale, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-puchk-orange/5 spring-transition">
                <div className="w-8 h-8 rounded-lg bg-puchk-surface flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-white/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate"><span className="font-medium">{sale.buyer}</span><span className="text-white/40"> a acheté </span><span className="font-bold">{sale.kit}</span></p>
                </div>
                <span className="text-sm font-bold text-puchk-orange flex-shrink-0">{sale.amount}€</span>
                <span className="text-[10px] text-white/30 flex-shrink-0">{sale.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Top kits</h3>
            <Link to="/dashboard/kits" className="text-[10px] text-puchk-orange uppercase tracking-wider hover:underline">Voir tout →</Link>
          </div>
          <div className="space-y-4">
            {topKits.map(({ kit, revenue }) => {
              const maxSales = topKits[0].kit.sales;
              return (
                <div key={kit.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-puchk-surface overflow-hidden flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{kit.name}</p>
                    <div className="flex items-center gap-3 text-[10px] text-white/40">
                      <span>{kit.sales.toLocaleString()} ventes</span>
                      <span className="font-bold text-puchk-orange">{revenue.toLocaleString()}€</span>
                    </div>
                    <div className="mt-1.5 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-puchk-orange rounded-full" style={{ width: `${(kit.sales / maxSales) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-puchk-success/15 text-puchk-success border border-puchk-success/20">Published</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Répartition par genre</h3>
        <div className="space-y-4">
          {genreDistribution.map((g) => (
            <div key={g.genre} className="flex items-center gap-4">
              <span className="text-sm font-medium w-16">{g.genre}</span>
              <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full spring-transition" style={{ width: `${g.percentage}%`, backgroundColor: g.color }} />
              </div>
              <span className="text-sm font-bold text-white/70 w-8 text-right">{g.sales}</span>
              <span className="text-xs text-white/30 w-10 text-right">{g.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
