import { reports } from "@/data/adminMockData";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  resolved: "bg-puchk-success/15 text-puchk-success border-puchk-success/20",
  dismissed: "bg-white/10 text-white/40 border-white/10",
};

const AdminReports = () => (
  <div>
    <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Signalements</h1>
    <div className="glass rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead><tr className="bg-puchk-deep">{["Kit", "Raison", "Signalé par", "Date", "Statut", "Actions"].map((h) => <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">{h}</th>)}</tr></thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-t border-white/5 hover:bg-puchk-orange/5 spring-transition">
              <td className="px-4 py-3 text-sm font-bold">{r.kit}</td>
              <td className="px-4 py-3 text-sm text-white/60 max-w-xs truncate">{r.reason}</td>
              <td className="px-4 py-3 text-sm">{r.reporter}</td>
              <td className="px-4 py-3 text-sm text-white/40">{r.date}</td>
              <td className="px-4 py-3"><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${statusColors[r.status]}`}>{r.status === "pending" ? "En attente" : r.status === "resolved" ? "Traité" : "Rejeté"}</span></td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <button className="px-2 py-1 text-[10px] rounded-lg bg-white/5 text-white/50 hover:bg-white/10 spring-transition">Aucune action</button>
                  <button className="px-2 py-1 text-[10px] rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 spring-transition">Supprimer kit</button>
                  <button className="px-2 py-1 text-[10px] rounded-lg bg-red-900/20 text-red-300 hover:bg-red-900/30 spring-transition">Bannir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminReports;
