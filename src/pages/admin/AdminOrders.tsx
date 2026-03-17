import { Download } from "lucide-react";
import { allOrders } from "@/data/adminMockData";

const AdminOrders = () => (
  <div>
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-extrabold uppercase tracking-tight">Toutes les commandes</h1>
      <button className="px-4 py-2 glass text-sm font-bold rounded-xl hover:bg-white/10 spring-transition flex items-center gap-2">
        <Download className="w-4 h-4" /> Export CSV
      </button>
    </div>
    <div className="glass rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead><tr className="bg-puchk-deep">{["Date", "Acheteur", "Kit", "Vendeur", "Montant", "Commission", "Statut"].map((h) => <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">{h}</th>)}</tr></thead>
        <tbody>
          {allOrders.map((order, i) => (
            <tr key={order.id} className={`border-t border-white/5 hover:bg-puchk-orange/5 spring-transition ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
              <td className="px-4 py-3 text-sm text-white/60">{order.date}</td>
              <td className="px-4 py-3 text-sm font-medium">{order.buyer}</td>
              <td className="px-4 py-3 text-sm font-bold">{order.kit}</td>
              <td className="px-4 py-3 text-sm text-white/60">{order.seller}</td>
              <td className="px-4 py-3 text-sm font-bold">{order.amount}€</td>
              <td className="px-4 py-3 text-sm text-white/40">{order.commission}€</td>
              <td className="px-4 py-3"><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${order.status === "completed" ? "bg-puchk-success/15 text-puchk-success border-puchk-success/20" : "bg-puchk-orange/15 text-puchk-orange border-puchk-orange/20"}`}>{order.status === "completed" ? "Complété" : "En cours"}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminOrders;
