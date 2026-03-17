import { Download, FileText } from "lucide-react";
import { buyerOrders } from "@/data/adminMockData";

const OrdersPage = () => (
  <div>
    <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Mes Commandes</h1>
    <div className="glass rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-puchk-deep">
              <th className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">Date</th>
              <th className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">Kit</th>
              <th className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">Licence</th>
              <th className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">Montant</th>
              <th className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">Statut</th>
              <th className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {buyerOrders.map((order, i) => (
              <tr key={order.id} className={`border-t border-white/5 hover:bg-puchk-orange/5 spring-transition ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                <td className="px-4 py-3 text-sm text-white/60">{order.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-puchk-orange/10 flex-shrink-0" />
                    <span className="text-sm font-bold">{order.kit.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-white/60">{order.license}</td>
                <td className="px-4 py-3 text-sm font-bold text-puchk-orange">{order.amount}€</td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    order.status === "completed" ? "bg-puchk-success/15 text-puchk-success border border-puchk-success/20" : "bg-puchk-orange/15 text-puchk-orange border border-puchk-orange/20"
                  }`}>{order.status === "completed" ? "Complété" : "En cours"}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-white/5 spring-transition"><Download className="w-3.5 h-3.5 text-puchk-orange" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-white/5 spring-transition"><FileText className="w-3.5 h-3.5 text-white/40" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default OrdersPage;
