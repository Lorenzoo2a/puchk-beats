import { useState } from "react";
import { Plus, X } from "lucide-react";
import { promoCodes } from "@/data/adminMockData";

const PromosPage = () => {
  const [codes, setCodes] = useState(promoCodes);
  const [showModal, setShowModal] = useState(false);
  const [newCode, setNewCode] = useState({ code: "", discount: "20", kit: "Tous mes kits", max: "50", expires: "" });

  const handleCreate = () => {
    setCodes([...codes, { id: `p${codes.length + 1}`, code: newCode.code, discount: parseInt(newCode.discount), kit: newCode.kit, used: 0, max: parseInt(newCode.max), expires: newCode.expires, active: true }]);
    setShowModal(false);
    setNewCode({ code: "", discount: "20", kit: "Tous mes kits", max: "50", expires: "" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight">Codes Promo</h1>
        <button onClick={() => setShowModal(true)} className="px-4 py-2.5 bg-puchk-orange text-white text-sm font-bold rounded-xl hover:bg-puchk-orange-hover spring-transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Créer un code promo
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-puchk-deep">{["Code", "Réduction", "Kit", "Utilisations", "Expire le", "Statut", ""].map((h) => <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>
            {codes.map((code) => (
              <tr key={code.id} className="border-t border-white/5 hover:bg-puchk-orange/5 spring-transition">
                <td className="px-4 py-3 text-sm font-bold font-mono">{code.code}</td>
                <td className="px-4 py-3 text-sm font-bold text-puchk-orange">-{code.discount}%</td>
                <td className="px-4 py-3 text-sm text-white/60">{code.kit}</td>
                <td className="px-4 py-3 text-sm">{code.used}/{code.max}</td>
                <td className="px-4 py-3 text-sm text-white/60">{code.expires}</td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${code.active ? "bg-puchk-success/15 text-puchk-success border-puchk-success/20" : "bg-red-500/15 text-red-400 border-red-500/20"}`}>
                    {code.active ? "Actif" : "Expiré"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className={`w-8 h-4 rounded-full spring-transition relative ${code.active ? "bg-puchk-orange" : "bg-white/10"}`}>
                    <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 spring-transition ${code.active ? "left-4" : "left-0.5"}`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="glass rounded-2xl p-6 w-[440px] max-w-[90vw] space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold">Créer un code promo</h3>
            <input value={newCode.code} onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })} placeholder="CODE" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white font-mono uppercase outline-none focus:border-puchk-orange/40 spring-transition" />
            <input type="number" value={newCode.discount} onChange={(e) => setNewCode({ ...newCode, discount: e.target.value })} placeholder="% de réduction" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
            <input type="number" value={newCode.max} onChange={(e) => setNewCode({ ...newCode, max: e.target.value })} placeholder="Utilisations max" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
            <input type="date" value={newCode.expires} onChange={(e) => setNewCode({ ...newCode, expires: e.target.value })} className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none" />
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 h-10 glass rounded-xl text-sm font-bold spring-transition">Annuler</button>
              <button onClick={handleCreate} className="flex-1 h-10 bg-puchk-orange text-white rounded-xl text-sm font-bold hover:bg-puchk-orange-hover spring-transition">Créer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromosPage;
