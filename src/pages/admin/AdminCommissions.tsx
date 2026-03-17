import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { customCommissions } from "@/data/adminMockData";

const AdminCommissions = () => {
  const [defaultRate, setDefaultRate] = useState(15);
  const [customs, setCustoms] = useState(customCommissions);
  const [showModal, setShowModal] = useState(false);
  const [newSeller, setNewSeller] = useState("");
  const [newRate, setNewRate] = useState("10");

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Commissions</h1>
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Commission par défaut</h3>
        <div className="flex items-center gap-3">
          <input type="number" value={defaultRate} onChange={(e) => setDefaultRate(parseInt(e.target.value))} className="w-24 h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white text-center outline-none" />
          <span className="text-sm text-white/40">%</span>
          <button className="px-4 py-2 bg-puchk-orange text-white text-sm font-bold rounded-xl hover:bg-puchk-orange-hover spring-transition">Modifier</button>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider">Commissions personnalisées</h3>
          <button onClick={() => setShowModal(true)} className="px-3 py-1.5 bg-puchk-orange text-white text-xs font-bold rounded-lg hover:bg-puchk-orange-hover spring-transition flex items-center gap-1">
            <Plus className="w-3 h-3" /> Ajouter
          </button>
        </div>
        <table className="w-full">
          <thead><tr className="bg-puchk-deep"><th className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">Vendeur</th><th className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">Taux</th><th className="px-4 py-3"></th></tr></thead>
          <tbody>
            {customs.map((c, i) => (
              <tr key={i} className="border-t border-white/5">
                <td className="px-4 py-3 text-sm font-bold">{c.seller}</td>
                <td className="px-4 py-3 text-sm text-puchk-orange font-bold">{c.rate}%</td>
                <td className="px-4 py-3 flex gap-1 justify-end">
                  <button className="p-1.5 hover:bg-white/5 rounded-lg"><Pencil className="w-3.5 h-3.5 text-white/40" /></button>
                  <button onClick={() => setCustoms(customs.filter((_, idx) => idx !== i))} className="p-1.5 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="glass rounded-2xl p-6 w-[400px] max-w-[90vw] space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold">Ajouter une exception</h3>
            <input value={newSeller} onChange={(e) => setNewSeller(e.target.value)} placeholder="Nom du vendeur" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none" />
            <input type="number" value={newRate} onChange={(e) => setNewRate(e.target.value)} placeholder="%" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none" />
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 h-10 glass rounded-xl text-sm font-bold spring-transition">Annuler</button>
              <button onClick={() => { setCustoms([...customs, { seller: newSeller, rate: parseInt(newRate) }]); setShowModal(false); }} className="flex-1 h-10 bg-puchk-orange text-white rounded-xl text-sm font-bold spring-transition">Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCommissions;
