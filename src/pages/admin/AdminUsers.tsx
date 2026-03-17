import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { allUsers } from "@/data/adminMockData";

const roleColors: Record<string, string> = {
  buyer: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  seller: "bg-puchk-orange/15 text-puchk-orange border-puchk-orange/20",
  admin: "bg-red-500/15 text-red-400 border-red-500/20",
};

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = allUsers.filter((u) => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Utilisateurs</h1>
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full h-10 pl-10 pr-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="h-10 px-3 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none">
          <option value="all">Tous</option>
          <option value="buyer">Acheteurs</option>
          <option value="seller">Vendeurs</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-puchk-deep">{["", "Username", "Email", "Rôle", "Inscrit le", "Dernière co.", "Statut", ""].map((h) => <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40 px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((user, i) => (
              <tr key={user.id} className={`border-t border-white/5 hover:bg-puchk-orange/5 spring-transition ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                <td className="px-4 py-3"><div className="w-8 h-8 rounded-full bg-puchk-orange/20 flex items-center justify-center text-[10px] font-bold text-puchk-orange">{user.name.charAt(0)}</div></td>
                <td className="px-4 py-3 text-sm font-bold">{user.name}</td>
                <td className="px-4 py-3 text-sm text-white/50">{user.email}</td>
                <td className="px-4 py-3"><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${roleColors[user.role]}`}>{user.role}</span></td>
                <td className="px-4 py-3 text-sm text-white/40">{user.joined}</td>
                <td className="px-4 py-3 text-sm text-white/40">{user.lastSeen}</td>
                <td className="px-4 py-3"><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${user.status === "active" ? "bg-puchk-success/15 text-puchk-success border-puchk-success/20" : "bg-red-500/15 text-red-400 border-red-500/20"}`}>{user.status === "active" ? "Actif" : "Banni"}</span></td>
                <td className="px-4 py-3"><Link to={`/admin/users/${user.id}`} className="text-xs text-puchk-orange hover:underline">Détails</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
