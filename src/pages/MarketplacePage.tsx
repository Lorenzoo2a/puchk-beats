import { useState } from "react";
import { Search, SlidersHorizontal, Star, X } from "lucide-react";
import { kits, genreLabels, Genre, Kit } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { useSequentialGlow } from "@/hooks/useSequentialGlow";

interface MarketplacePageProps {
  onPlay: (kit: Kit) => void;
}

const genres = Object.entries(genreLabels);

const MarketplacePage = ({ onPlay }: MarketplacePageProps) => {
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(true);

  const filtered = kits
    .filter((k) => {
      if (search && !k.name.toLowerCase().includes(search.toLowerCase()) && !k.producer.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedGenres.length > 0 && !selectedGenres.includes(k.genre)) return false;
      if (minRating > 0 && k.rating < minRating) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "popular") return b.sales - a.sales;
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const toggleGenre = (g: Genre) => {
    setSelectedGenres((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Banner */}
      <div className="relative h-40 bg-gradient-to-r from-puchk-deep via-puchk-base to-puchk-deep flex items-center justify-center noise-overlay overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-puchk-base/80" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-black uppercase tracking-tight">MARKETPLACE</h1>
          <p className="text-white/50 mt-2">{kits.length} kits disponibles</p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 -mt-7 relative z-10">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un kit, un producteur..."
            className="w-full h-14 pl-14 pr-14 bg-puchk-surface rounded-2xl border border-[rgba(255,107,26,0.08)] focus:border-puchk-orange/60 focus:shadow-[0_0_20px_rgba(255,107,26,0.15)] text-white placeholder:text-white/30 outline-none spring-transition"
          />
          <button onClick={() => setShowFilters(!showFilters)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-white/5">
            <SlidersHorizontal className="w-5 h-5 text-white/40" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Filters */}
        {showFilters && (
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-3">Genre</h3>
              <div className="space-y-2">
                {genres.map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border spring-transition flex items-center justify-center ${
                      selectedGenres.includes(key as Genre) ? "bg-puchk-orange border-puchk-orange" : "border-white/20 group-hover:border-white/40"
                    }`}>
                      {selectedGenres.includes(key as Genre) && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <span className="text-sm text-white/60 group-hover:text-white spring-transition">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-3">Rating minimum</h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setMinRating(s === minRating ? 0 : s)}>
                    <Star className={`w-5 h-5 ${s <= minRating ? "text-yellow-500 fill-yellow-500" : "text-white/20"} spring-transition`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-3">Tri</h3>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-puchk-deep rounded-xl px-3 py-2 text-sm text-white/70 border border-[rgba(255,107,26,0.08)] outline-none focus:border-puchk-orange/40"
              >
                <option value="popular">Populaires</option>
                <option value="price_asc">Prix ↑</option>
                <option value="price_desc">Prix ↓</option>
                <option value="rating">Mieux notés</option>
              </select>
            </div>

            <button onClick={() => { setSelectedGenres([]); setMinRating(0); setSort("popular"); setSearch(""); }} className="text-xs text-puchk-orange hover:underline">
              Réinitialiser les filtres
            </button>
          </aside>
        )}

        {/* Grid */}
        <div className="flex-1">
          <div className={`grid gap-5 ${showFilters ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
            {filtered.map((kit, i) => (
              <div key={kit.id} style={{ animationDelay: `${i * 50}ms` }} className="animate-in fade-in slide-in-from-bottom-4">
                <ProductCard kit={kit} onPlay={onPlay} />
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/40">
              <p className="text-lg">Aucun kit trouvé</p>
              <p className="text-sm mt-1">Essaie d'autres filtres</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
