import { adminStats, monthlyRevenue, weeklySignups, recentActivity } from "@/data/adminMockData";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const AdminDashboard = () => (
  <div>
    <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Dashboard Admin</h1>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {Object.values(adminStats).map((stat) => (
        <div key={stat.label} className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            {stat.change > 0 && <span className="text-xs font-bold text-puchk-success">+{stat.change}%</span>}
          </div>
          <div className="text-2xl font-black">{stat.value.toLocaleString()}{stat.label.includes("Revenus") || stat.label.includes("Commissions") ? " €" : ""}</div>
          <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Revenus par mois</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(28,28,28,0.9)", border: "1px solid rgba(255,107,26,0.2)", borderRadius: "12px" }} />
              <Bar dataKey="revenue" fill="#FF6B1A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Inscriptions par semaine</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklySignups}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(28,28,28,0.9)", border: "1px solid rgba(255,107,26,0.2)", borderRadius: "12px" }} />
              <Line type="monotone" dataKey="signups" stroke="#FF6B1A" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    <div className="glass rounded-2xl p-6">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Activité récente</h3>
      <div className="space-y-1">
        {recentActivity.map((a, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-puchk-orange/5 spring-transition">
            <span className="text-lg">{a.icon}</span>
            <span className="flex-1 text-sm text-white/70">{a.action}</span>
            <span className="text-[10px] text-white/30">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AdminDashboard;
