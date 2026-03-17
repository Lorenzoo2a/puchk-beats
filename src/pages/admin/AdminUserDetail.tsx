import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { allUsers } from "@/data/adminMockData";

const AdminUserDetail = () => {
  const { id } = useParams();
  const user = allUsers.find((u) => u.id === id) || allUsers[0];
  const [banModal, setBanModal] = useState(false);
  const [banReason, setBanReason] = useState("");

  return (
    <div>
      <Link to="/admin/users" className="text-xs text-puchk-orange hover:underline mb-4 inline-block">← Retour aux utilisateurs</Link>
      <div className="glass rounded-2xl p-6 mb-6 flex items-start gap-6">
        <div className="w-16 h-16 rounded-full bg-puchk-orange/20 flex items-center justify-center text-xl font-bold text-puchk-orange">{user.name.charAt(0)}</div>
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold">{user.name}</h1>
          <p className="text-sm text-white/40">{user.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${user.role === "seller" ? "bg-puchk-orange/15 text-puchk-orange border-puchk-orange/20" : "bg-blue-500/15 text-blue-400 border-blue-500/20"}`}>{user.role}</span>
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${user.status === "active" ? "bg-puchk-success/15 text-puchk-success border-puchk-success/20" : "bg-red-500/15 text-red-400 border-red-500/20"}`}>{user.status}</span>
          </div>
          <div className="flex gap-6 mt-3 text-xs text-white/40">
            <span>Inscrit le {user.joined}</span>
            <span>Dernière connexion : {user.lastSeen}</span>
          </div>
        </div>
      </div>

      {user.role === "buyer" && (
        <div className="glass rounded-2xl p-6 mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Informations acheteur</h3>
          <p className="text-sm text-white/60">Total dépensé : <span className="font-bold text-puchk-orange">{user.spent}€</span></p>
        </div>
      )}

      {user.role === "seller" && (
        <div className="glass rounded-2xl p-6 mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Informations vendeur</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div><p className="text-[10px] text-white/40 uppercase">Revenu total</p><p className="text-lg font-bold text-puchk-orange">{user.earned.toLocaleString()}€</p></div>
            <div><p className="text-[10px] text-white/40 uppercase">Commission payée</p><p className="text-lg font-bold">{(user.earned * 0.15).toLocaleString()}€</p></div>
            <div><p className="text-[10px] text-white/40 uppercase">Kits publiés</p><p className="text-lg font-bold">{user.kits}</p></div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {user.role === "seller" && <button className="px-4 py-2 bg-puchk-orange text-white text-sm font-bold rounded-xl hover:bg-puchk-orange-hover spring-transition">Vérifier le vendeur</button>}
        <button className="px-4 py-2 border border-red-500/30 text-red-400 text-sm font-bold rounded-xl hover:bg-red-500/10 spring-transition">Promouvoir admin</button>
        <button onClick={() => setBanModal(true)} className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 spring-transition">Bannir</button>
        <button className="px-4 py-2 border border-yellow-500/30 text-yellow-400 text-sm font-bold rounded-xl hover:bg-yellow-500/10 spring-transition">Suspendre 30j</button>
      </div>

      {banModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setBanModal(false)}>
          <div className="glass rounded-2xl p-6 w-[440px] max-w-[90vw] space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold">Bannir {user.name}</h3>
            <textarea value={banReason} onChange={(e) => setBanReason(e.target.value)} rows={3} placeholder="Raison du ban..." className="w-full px-4 py-3 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none resize-none" />
            <div className="flex gap-3">
              <button onClick={() => setBanModal(false)} className="flex-1 h-10 glass rounded-xl text-sm font-bold spring-transition">Annuler</button>
              <button onClick={() => setBanModal(false)} className="flex-1 h-10 bg-red-500 text-white rounded-xl text-sm font-bold spring-transition">Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserDetail;
