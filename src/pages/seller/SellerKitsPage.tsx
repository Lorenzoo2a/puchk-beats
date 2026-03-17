import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, BarChart3, Trash2 } from "lucide-react";
import { kits } from "@/data/mockData";

const sellerKits = kits.filter((k) => k.producerId === "kxzma");

type StatusFilter = "all" | "published" | "draft" | "pending" | "scheduled";

const statusConfig: Record<string, { label: string; color: string }> = {
  published: { label: "Published", color: "bg-puchk-success/15 text-puchk-success border-puchk-success/20" },
  draft: { label: "Draft", color: "bg-puchk-orange/15 text-puchk-orange border-puchk-orange/20" },
  pending: { label: "Pending", color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20" },
  scheduled: { label: "Scheduled", color: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
};

const SellerKitsPage = () => {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const tabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "Tous" },
    { key: "published", label: "Publiés" },
    { key: "draft", label: "Brouillons" },
    { key: "pending", label: "En attente" },
    { key: "scheduled", label: "Programmés" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight">Mes Kits</h1>
        <Link to="/dashboard/kits/new" className="px-4 py-2.5 bg-puchk-orange text-white text-sm font-bold rounded-xl hover:bg-puchk-orange-hover spring-transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Publier un nouveau kit
        </Link>
      </div>

      <div className="flex gap-1 mb-6 bg-puchk-surface rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setFilter(tab.key)} className={`px-3 py-1.5 rounded-lg text-xs font-bold spring-transition ${filter === tab.key ? "bg-puchk-orange text-white" : "text-white/40 hover:text-white"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sellerKits.map((kit) => (
          <div key={kit.id} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-[rgba(255,107,26,0.2)] spring-transition">
            <div className="w-14 h-14 rounded-lg bg-puchk-orange/10 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold uppercase truncate">{kit.name}</h3>
              <p className="text-[10px] text-white/40">{kit.samples} samples · {kit.genre}</p>
            </div>
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${statusConfig.published.color}`}>Published</span>
            <div className="text-right mr-4">
              <p className="text-sm font-bold text-puchk-orange">{kit.sales.toLocaleString()} ventes</p>
              <p className="text-[10px] text-white/40">{kit.price}€</p>
            </div>
            <div className="flex gap-1">
              <Link to={`/dashboard/kits/new`} className="p-2 rounded-lg hover:bg-white/5 spring-transition"><Pencil className="w-4 h-4 text-white/40" /></Link>
              <Link to={`/dashboard/analytics`} className="p-2 rounded-lg hover:bg-white/5 spring-transition"><BarChart3 className="w-4 h-4 text-white/40" /></Link>
              <button onClick={() => setShowDeleteModal(kit.id)} className="p-2 rounded-lg hover:bg-red-500/10 spring-transition"><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowDeleteModal(null)}>
          <div className="glass rounded-2xl p-6 w-96 max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">Supprimer ce kit ?</h3>
            <p className="text-sm text-white/50 mb-6">Cette action est irréversible. Le kit sera définitivement supprimé.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(null)} className="flex-1 h-10 glass rounded-xl text-sm font-bold hover:bg-white/10 spring-transition">Annuler</button>
              <button onClick={() => setShowDeleteModal(null)} className="flex-1 h-10 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 spring-transition">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerKitsPage;
