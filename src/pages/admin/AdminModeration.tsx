import { useState } from "react";
import { Check, X } from "lucide-react";
import { pendingKits } from "@/data/adminMockData";
import { kits, genreLabels } from "@/data/mockData";

const AdminModeration = () => {
  const [tab, setTab] = useState("pending");
  const [rejectModal, setRejectModal] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const tabs = [
    { key: "pending", label: `En attente (${pendingKits.length})` },
    { key: "published", label: `Publiés (${kits.length})` },
    { key: "rejected", label: "Rejetés (0)" },
    { key: "all", label: "Tous" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Modération kits</h1>
      <div className="flex gap-1 mb-6 bg-puchk-surface rounded-xl p-1 w-fit">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-3 py-1.5 rounded-lg text-xs font-bold spring-transition ${tab === t.key ? "bg-puchk-orange text-white" : "text-white/40 hover:text-white"}`}>{t.label}</button>
        ))}
      </div>

      {tab === "pending" && (
        <div className="space-y-4">
          {pendingKits.map((kit) => (
            <div key={kit.id} className="glass rounded-xl p-5 flex items-start gap-4">
              <div className="w-20 h-20 rounded-xl bg-puchk-orange/10 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold uppercase">{kit.name}</h3>
                <p className="text-xs text-white/40 mb-1">par {kit.producer} · {kit.date}</p>
                <p className="text-xs text-white/50">{kit.samples} samples · {genreLabels[kit.genre]}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-puchk-success text-white text-sm font-bold rounded-xl hover:bg-puchk-success/80 spring-transition flex items-center gap-1">
                  <Check className="w-4 h-4" /> Approuver
                </button>
                <button onClick={() => setRejectModal(kit.id)} className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 spring-transition flex items-center gap-1">
                  <X className="w-4 h-4" /> Rejeter
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "published" && (
        <div className="space-y-3">
          {kits.map((kit) => (
            <div key={kit.id} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-puchk-orange/10 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-bold uppercase">{kit.name}</h3>
                <p className="text-[10px] text-white/40">{kit.producer} · {kit.sales} ventes</p>
              </div>
              <button className="px-3 py-1.5 text-xs text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/10 spring-transition">Retirer</button>
            </div>
          ))}
        </div>
      )}

      {rejectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setRejectModal(null)}>
          <div className="glass rounded-2xl p-6 w-[440px] max-w-[90vw] space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold">Raison du rejet</h3>
            <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} rows={3} placeholder="Explique la raison du rejet..." className="w-full px-4 py-3 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none resize-none" />
            <div className="flex gap-3">
              <button onClick={() => setRejectModal(null)} className="flex-1 h-10 glass rounded-xl text-sm font-bold spring-transition">Annuler</button>
              <button onClick={() => { setRejectModal(null); setRejectReason(""); }} className="flex-1 h-10 bg-red-500 text-white rounded-xl text-sm font-bold spring-transition">Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModeration;
