import { recentSales, kits } from "@/data/mockData";

const SellerSalesPage = () => {
  const totalEarned = 1247.50;
  const pendingPayout = 324.97;

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Historique des ventes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="glass rounded-2xl p-5">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Total gagné</p>
          <p className="text-2xl font-black text-puchk-orange">{totalEarned.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">En attente de versement</p>
          <p className="text-2xl font-black text-puchk-warning">{pendingPayout.toFixed(2)} €</p>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-puchk-deep">
                {["Date", "Acheteur", "Kit", "Licence", "Montant", "Commission", "Ta part", "Statut"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale, i) => {
                const commission = sale.amount * 0.15;
                const net = sale.amount - commission;
                return (
                  <tr key={i} className={`border-t border-white/5 hover:bg-puchk-orange/5 spring-transition ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                    <td className="px-4 py-3 text-sm text-white/60">{sale.time}</td>
                    <td className="px-4 py-3 text-sm font-medium">{sale.buyer}</td>
                    <td className="px-4 py-3 text-sm font-bold">{sale.kit}</td>
                    <td className="px-4 py-3 text-sm text-white/60">{sale.license || "Standard"}</td>
                    <td className="px-4 py-3 text-sm font-bold">{sale.amount}€</td>
                    <td className="px-4 py-3 text-sm text-white/40">-{commission.toFixed(2)}€</td>
                    <td className="px-4 py-3 text-sm font-bold text-puchk-orange">{net.toFixed(2)}€</td>
                    <td className="px-4 py-3">
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-puchk-success/15 text-puchk-success border border-puchk-success/20">Payé</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerSalesPage;
