import { useState } from "react";
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { kits, Kit } from "@/data/mockData";
import { Link } from "react-router-dom";

const ChartsPage = ({ onPlay }: { onPlay: (kit: Kit) => void }) => {
  const [tab, setTab] = useState("hot");
  const sorted = [...kits].sort((a, b) => b.sales - a.sales);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);
  const tabs = [
    { key: "hot", label: "🔥 Hot", },
    { key: "sales", label: "📈 Ventes" },
    { key: "rated", label: "⭐ Mieux notés" },
    { key: "new", label: "🆕 Nouveautés" },
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-8">CHARTS</h1>
        <div className="flex gap-1 mb-10 bg-puchk-surface rounded-xl p-1 w-fit">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-bold spring-transition ${tab === t.key ? "bg-puchk-orange text-white" : "text-white/40 hover:text-white"}`}>{t.label}</button>
          ))}
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {[top3[1], top3[0], top3[2]].map((kit, i) => {
            const rank = i === 0 ? 2 : i === 1 ? 1 : 3;
            const colors = ["", "border-yellow-500 bg-yellow-500/5", "border-gray-400 bg-gray-400/5", "border-amber-700 bg-amber-700/5"];
            const heights = ["", "h-64", "h-52", "h-44"];
            return (
              <Link to={`/kit/${kit.id}`} key={kit.id} className={`flex-1 max-w-[220px] glass rounded-2xl p-4 text-center border ${colors[rank]} ${heights[rank]} flex flex-col justify-end spring-transition hover:scale-105`}>
                <div className="text-3xl font-black mb-2">#{rank}</div>
                <div className="w-full aspect-[4/3] rounded-xl bg-puchk-orange/10 mb-3" />
                <h3 className="text-sm font-bold uppercase truncate">{kit.name}</h3>
                <p className="text-[10px] text-white/40">{kit.producer}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-white/50">{kit.rating}</span>
                  <span className="text-xs text-white/30">· {kit.sales.toLocaleString()} ventes</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* List */}
        <div className="space-y-1">
          {rest.map((kit, i) => (
            <Link to={`/kit/${kit.id}`} key={kit.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-puchk-orange/5 border-l-2 border-transparent hover:border-puchk-orange spring-transition group">
              <span className="text-2xl font-black text-white/20 w-10 text-center">#{i + 4}</span>
              <div className="w-10 h-10 rounded-lg bg-puchk-orange/10 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold uppercase truncate">{kit.name}</h3>
                <p className="text-[10px] text-white/40">{kit.producer}</p>
              </div>
              <div className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /><span className="text-xs">{kit.rating}</span></div>
              <span className="text-xs text-white/40">{kit.sales.toLocaleString()} ventes</span>
              <span className="text-sm font-bold text-puchk-orange">{kit.price}€</span>
              {i % 3 === 0 ? <TrendingUp className="w-4 h-4 text-puchk-success" /> : i % 3 === 1 ? <TrendingDown className="w-4 h-4 text-red-400" /> : <Minus className="w-4 h-4 text-white/20" />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
