import { useParams, Link } from "react-router-dom";
import { Star, Play, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { kits, genreLabels, Kit } from "@/data/mockData";
import KitCover from "@/components/KitCover";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

interface ProductPageProps {
  onPlay: (kit: Kit) => void;
}

const ProductPage = ({ onPlay }: ProductPageProps) => {
  const { id } = useParams();
  const kit = kits.find((k) => k.id === id) || kits[0];
  const [selectedLicense, setSelectedLicense] = useState(0);
  const similarKits = kits.filter((k) => k.id !== kit.id).slice(0, 4);
  const producer = { name: kit.producer };

  const contents = kit.contents || [
    { icon: "🥁", name: "Kicks", count: 20 },
    { icon: "🔊", name: "808", count: 15 },
    { icon: "🎵", name: "Hi-Hats", count: 25 },
  ];

  const licenses = kit.licenses || [
    { name: "Standard", description: "Usage personnel et commercial.", price: kit.price },
    { name: "Premium", description: "Usage commercial illimité.", price: kit.price * 2 },
  ];

  const reviews = kit.userReviews || [];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Cover */}
      <div className="relative w-full">
        <KitCover genre={kit.genre} title="" producer="" aspectRatio="16/9" className="w-full max-h-[400px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-puchk-base via-puchk-base/50 to-transparent z-[3]" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center z-[5]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPlay(kit)}
            className="w-16 h-16 rounded-full glass bg-puchk-orange/80 flex items-center justify-center shadow-[0_0_30px_rgba(255,107,26,0.5)]"
          >
            <Play className="w-7 h-7 text-white fill-white ml-0.5" />
          </motion.button>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-8 left-0 right-0 z-[5] max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/90">
              {genreLabels[kit.genre]}
            </span>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight text-white drop-shadow-lg">{kit.name}</h1>
          <p className="text-white/60 mt-1">
            par <Link to="/" className="text-puchk-orange hover:underline">{kit.producer}</Link>
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left column */}
        <div className="lg:col-span-3 space-y-10">
          {/* Description */}
          {kit.description && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-3">Description</h2>
              <p className="text-white/70 leading-relaxed">{kit.description}</p>
            </div>
          )}

          {/* Contents */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">CONTENU</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {contents.map((c) => (
                <div key={c.name} className="bg-puchk-surface rounded-xl p-3 border border-[rgba(255,107,26,0.08)] text-center">
                  <span className="text-2xl block mb-1">{c.icon}</span>
                  <span className="text-xs font-medium text-white/70">{c.name}</span>
                  <span className="block text-sm font-bold text-puchk-orange">× {c.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">
                AVIS ({kit.reviews})
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-black text-white">{kit.rating}</span>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.round(kit.rating) ? "text-yellow-500 fill-yellow-500" : "text-white/20"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-white/40">{kit.reviews} avis</span>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.user} className="glass rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-puchk-orange/20 flex items-center justify-center text-xs font-bold text-puchk-orange">
                        {r.user.charAt(0)}
                      </div>
                      <div>
                        <span className="text-sm font-bold">{r.user}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "text-yellow-500 fill-yellow-500" : "text-white/20"}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-white/30 ml-auto">{r.date}</span>
                    </div>
                    <p className="text-sm text-white/60">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">KITS SIMILAIRES</h2>
            <div className="grid grid-cols-2 gap-4">
              {similarKits.slice(0, 4).map((k) => (
                <ProductCard key={k.id} kit={k} onPlay={onPlay} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column - sticky */}
        <div className="lg:col-span-2">
          <div className="sticky top-20 glass rounded-2xl p-6 space-y-6">
            {/* Price */}
            <div className="text-3xl font-black text-puchk-orange">{licenses[selectedLicense].price}€</div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(kit.rating) ? "text-yellow-500 fill-yellow-500" : "text-white/20"}`} />
                ))}
              </div>
              <span className="text-sm text-white/50">{kit.rating} ({kit.reviews} avis)</span>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-xs text-white/40">
              <span>{kit.sales.toLocaleString()} ventes</span>
              <span>{kit.samples} samples</span>
              <span>WAV + MP3</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {[genreLabels[kit.genre], "WAV", "24-bit", "Royalty Free"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full border border-puchk-orange/20 text-[10px] text-puchk-orange uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            {/* Waveform preview */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onPlay(kit)}
                className="w-10 h-10 rounded-full bg-puchk-orange flex items-center justify-center flex-shrink-0"
              >
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </button>
              <div className="flex-1 h-6 flex items-end gap-[2px]">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-puchk-orange/30"
                    style={{ height: `${6 + Math.sin(i * 0.5) * 10 + Math.random() * 8}px` }}
                  />
                ))}
              </div>
            </div>

            <div className="section-divider" />

            {/* Licenses */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50">Licences</h3>
              {licenses.map((lic, i) => (
                <button
                  key={lic.name}
                  onClick={() => setSelectedLicense(i)}
                  className={`w-full text-left p-4 rounded-xl border spring-transition ${
                    selectedLicense === i
                      ? "border-puchk-orange bg-puchk-orange/5"
                      : "border-[rgba(255,107,26,0.08)] hover:border-[rgba(255,107,26,0.2)]"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">{lic.name}</span>
                    <span className="font-bold text-puchk-orange">{lic.price}€</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">{lic.description}</p>
                </button>
              ))}
            </div>

            {/* CTA */}
            <button className="w-full h-14 bg-puchk-orange text-white font-bold text-sm uppercase rounded-xl hover:bg-puchk-orange-hover spring-transition shadow-[0_0_20px_rgba(255,107,26,0.3)] animate-pulse-glow">
              Acheter — {licenses[selectedLicense].price}€
            </button>
            <button className="w-full h-12 glass text-white/70 font-medium text-sm rounded-xl hover:text-white spring-transition flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Ajouter au panier
            </button>

            <div className="section-divider" />

            {/* Producer */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-puchk-orange/20 flex items-center justify-center text-sm font-bold text-puchk-orange">
                {kit.producer.charAt(0)}
              </div>
              <div>
                <span className="text-sm font-bold">{kit.producer}</span>
                <Link to="/" className="text-[10px] text-puchk-orange flex items-center gap-1 hover:underline">
                  Voir le profil <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
