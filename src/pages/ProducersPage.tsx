import { useState } from "react";
import { Search } from "lucide-react";
import { producers } from "@/data/mockData";
import { Link } from "react-router-dom";

const badgeStyles: Record<string, string> = {
  "Top Seller": "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  "Verified": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Rising": "bg-puchk-orange/15 text-puchk-orange border-puchk-orange/20",
  "Fan Favorite": "bg-purple-500/15 text-purple-400 border-purple-500/20",
  "New": "bg-green-500/15 text-green-400 border-green-500/20",
};

const ProducersPage = () => {
  const [search, setSearch] = useState("");
  const filtered = producers.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-8">PRODUCTEURS</h1>
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un producteur..." className="w-full h-12 pl-11 pr-4 bg-puchk-surface rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <Link to={`/producer/${p.id}`} key={p.id} className="glass rounded-2xl p-6 text-center hover:border-[rgba(255,107,26,0.2)] spring-transition group" style={{ background: `linear-gradient(135deg, ${p.genreColor}08, #1C1C1C 50%)` }}>
              <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-extrabold border-2 ${p.verified ? "shadow-[0_0_12px_rgba(255,107,26,0.3)]" : ""}`} style={{ borderColor: p.verified ? p.genreColor + "60" : "rgba(255,255,255,0.1)", background: `linear-gradient(135deg, ${p.genreColor}40, ${p.genreColor}15)` }}>
                {p.name.charAt(0)}
              </div>
              <h3 className="font-bold mb-1">{p.name}</h3>
              <p className="text-xs text-white/40 mb-2 line-clamp-1">{p.bio}</p>
              <div className="flex justify-center gap-3 text-[10px] text-white/40 mb-3">
                <span>{p.kits} kits</span><span>{p.sales.toLocaleString()} ventes</span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                {p.verified && <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${badgeStyles["Verified"]}`}>Verified</span>}
                {p.badge && <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${badgeStyles[p.badge] || ""}`}>{p.badge}</span>}
              </div>
              <span className="text-xs text-puchk-orange group-hover:underline">Voir le profil →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProducersPage;
