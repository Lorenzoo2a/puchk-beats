import { useParams, Link } from "react-router-dom";
import { Star, Play, ShoppingBag, Heart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { kits, genreLabels, Kit } from "@/data/mockData";
import KitCover from "@/components/KitCover";
import ProductCard from "@/components/ProductCard";
import { useState, useRef } from "react";
import { useSequentialGlow } from "@/hooks/useSequentialGlow";

interface ProductPageProps {
  onPlay: (kit: Kit) => void;
}

const ScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const ProductPage = ({ onPlay }: ProductPageProps) => {
  const similarGlow = useSequentialGlow(4);
  const { id } = useParams();
  const kit = kits.find((k) => k.id === id) || kits[0];
  const [selectedLicense, setSelectedLicense] = useState(0);
  const [liked, setLiked] = useState(false);
  const similarKits = kits.filter((k) => k.id !== kit.id && k.genre === kit.genre).length > 0
    ? kits.filter((k) => k.id !== kit.id && k.genre === kit.genre)
    : kits.filter((k) => k.id !== kit.id).slice(0, 4);
  const similarScrollRef = useRef<HTMLDivElement>(null);

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
  const producerData = { name: kit.producer, id: kit.producerId };

  return (
    <div className="min-h-screen pt-16">
      {/* === HERO COVER — Full width 16:9 === */}
      <div className="relative w-screen -ml-[calc((100vw-100%)/2)]" style={{ left: "calc((100vw - 100%) / 2)" }}>
        <div className="w-full" style={{ aspectRatio: "16/9", maxHeight: "60vh" }}>
          <KitCover genre={kit.genre} title="" producer="" aspectRatio="16/9" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/50 to-transparent z-[3]" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center z-[5]">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPlay(kit)}
            className="w-[72px] h-[72px] rounded-full liquid-glass flex items-center justify-center shadow-[0_0_60px_rgba(255,107,26,0.2)] btn-press border-white/20"
          >
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </motion.button>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-10 left-0 right-0 z-[5]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block px-2.5 py-1 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] text-[10px] font-bold tracking-widest uppercase text-white/80">
                {genreLabels[kit.genre]}
              </span>
              <button
                onClick={() => setLiked(!liked)}
                className="p-2 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] btn-press"
              >
                <Heart className={`w-4 h-4 transition-all duration-300 ${liked ? "fill-puchk-orange text-puchk-orange animate-heart-burst" : "text-white/60"}`} />
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.8)]">
              {kit.name}
            </h1>
            <p className="text-white/50 mt-2 text-lg">
              par <Link to={`/producer/${producerData.id}`} className="text-puchk-orange hover:underline">{kit.producer}</Link>
            </p>
          </div>
        </div>
      </div>

      {/* === Main 2-column layout === */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left column (58%) */}
        <div className="lg:col-span-3 space-y-20">
          {/* Description */}
          {kit.description && (
            <ScrollReveal>
              <h2 className="text-xs font-bold uppercase tracking-widest text-puchk-orange mb-4">Description</h2>
              <p className="text-secondary-puchk leading-relaxed text-base">{kit.description}</p>
            </ScrollReveal>
          )}

          {/* Contents */}
          <ScrollReveal delay={0.1}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-puchk-orange mb-5">Contenu</h2>
            <div className="flex flex-wrap gap-3">
              {contents.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="bg-[var(--bg-surface)] rounded-xl p-3 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,107,26,0.06)]"
                >
                  <span className="text-xl block mb-1">{c.icon}</span>
                  <span className="text-xs font-medium text-secondary-puchk">{c.name}</span>
                  <span className="block text-sm font-bold text-puchk-orange">× {c.count}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Reviews */}
          {reviews.length > 0 && (
            <ScrollReveal delay={0.15}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-puchk-orange mb-5">
                Avis ({kit.reviews})
              </h2>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl font-black">{kit.rating}</span>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.round(kit.rating) ? "text-yellow-500 fill-yellow-500" : "text-white/15"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-secondary-puchk mt-1 block">{kit.reviews} avis</span>
                </div>
              </div>
              {/* Star distribution */}
              <div className="space-y-2 mb-8">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 65 : star === 4 ? 20 : star === 3 ? 10 : star === 2 ? 3 : 2;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-secondary-puchk w-3">{star}</span>
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-puchk-orange rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] text-secondary-puchk w-8 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <motion.div
                    key={r.user}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    className="liquid-glass rounded-xl p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-puchk-orange/15 flex items-center justify-center text-xs font-bold text-puchk-orange">
                        {r.user.charAt(0)}
                      </div>
                      <div>
                        <span className="text-sm font-bold">{r.user}</span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "text-yellow-500 fill-yellow-500" : "text-white/15"}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-secondary-puchk ml-auto">{r.date}</span>
                    </div>
                    <p className="text-sm text-secondary-puchk leading-relaxed">{r.comment}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Similar Kits */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-puchk-orange">Kits similaires</h2>
              <div className="flex gap-2">
                <button onClick={() => similarScrollRef.current?.scrollBy({ left: -280, behavior: "smooth" })} className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center hover:bg-white/10 transition-colors btn-press">
                  <ChevronLeft className="w-4 h-4 text-white/50" />
                </button>
                <button onClick={() => similarScrollRef.current?.scrollBy({ left: 280, behavior: "smooth" })} className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center hover:bg-white/10 transition-colors btn-press">
                  <ChevronRight className="w-4 h-4 text-white/50" />
                </button>
              </div>
            </div>
            <div
              ref={similarScrollRef}
              className="flex gap-4 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none" }}
              onMouseEnter={() => similarGlow.pause()}
              onMouseLeave={() => similarGlow.resume()}
            >
              {similarKits.slice(0, 4).map((k, i) => (
                <div
                  key={k.id}
                  className="min-w-[220px] max-w-[260px] flex-shrink-0"
                  style={{
                    boxShadow: similarGlow.glowIndex === i ? "0 0 25px rgba(255,107,26,0.12), 0 0 8px rgba(255,107,26,0.06)" : "none",
                    borderRadius: "1rem",
                    transition: "box-shadow 600ms ease",
                  }}
                >
                  <ProductCard kit={k} onPlay={onPlay} index={i} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right column (42%) — sticky */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 liquid-glass rounded-2xl p-6 space-y-6">
            <div className="text-4xl font-black text-puchk-orange">{licenses[selectedLicense].price}€</div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(kit.rating) ? "text-yellow-500 fill-yellow-500" : "text-white/15"}`} />
                ))}
              </div>
              <span className="text-sm text-secondary-puchk">{kit.rating} ({kit.reviews} avis)</span>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-xs text-secondary-puchk">
              <span>{kit.sales.toLocaleString()} ventes</span>
              <span>{kit.samples} samples</span>
              <span>WAV + MP3</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {[genreLabels[kit.genre], "WAV", "24-bit", "Royalty Free"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full border border-puchk-orange/15 text-[10px] text-puchk-orange uppercase tracking-wider hover:bg-puchk-orange/[0.05] hover:backdrop-blur-sm transition-all tag-flash cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

            {/* Waveform preview */}
            <div className="flex items-center gap-3">
              <button onClick={() => onPlay(kit)} className="w-10 h-10 rounded-full bg-puchk-orange flex items-center justify-center flex-shrink-0 btn-press shadow-[0_0_15px_rgba(255,107,26,0.3)]">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </button>
              <div className="flex-1 h-6 flex items-end gap-[2px]">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="w-[3px] rounded-full bg-puchk-orange/20" style={{ height: `${6 + Math.sin(i * 0.5) * 10 + Math.random() * 8}px` }} />
                ))}
              </div>
            </div>

            <div className="section-divider" />

            {/* Licenses */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-secondary-puchk">Licences</h3>
              {licenses.map((lic, i) => (
                <button
                  key={lic.name}
                  onClick={() => setSelectedLicense(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    selectedLicense === i
                      ? "border-puchk-orange/40 bg-puchk-orange/[0.04]"
                      : "border-white/[0.06] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selectedLicense === i ? "border-puchk-orange" : "border-white/20"}`}>
                        {selectedLicense === i && <div className="w-2 h-2 rounded-full bg-puchk-orange" />}
                      </div>
                      <span className="font-bold text-sm">{lic.name}</span>
                    </div>
                    <span className="font-bold text-puchk-orange">{lic.price}€</span>
                  </div>
                  <p className="text-xs text-secondary-puchk mt-1 ml-6">{lic.description}</p>
                </button>
              ))}
            </div>

            {/* CTA */}
            <button className="w-full h-14 bg-puchk-orange text-white font-bold text-sm rounded-xl hover:bg-puchk-orange-hover hover:scale-[1.02] transition-all animate-pulse-glow btn-press">
              Acheter — {licenses[selectedLicense].price}€
            </button>
            <button className="w-full h-12 liquid-glass font-medium text-sm rounded-xl hover:text-puchk-orange hover:border-white/[0.15] transition-all flex items-center justify-center gap-2 btn-press">
              <ShoppingBag className="w-4 h-4" /> Ajouter au panier
            </button>

            <div className="section-divider" />

            {/* Producer */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-puchk-orange/15 flex items-center justify-center text-sm font-bold text-puchk-orange">
                {kit.producer.charAt(0)}
              </div>
              <div>
                <span className="text-sm font-bold">{kit.producer}</span>
                <Link to={`/producer/${producerData.id}`} className="text-[10px] text-puchk-orange flex items-center gap-1 hover:underline">
                  Voir le profil <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky buy bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 liquid-glass-strong p-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-secondary-puchk">{licenses[selectedLicense].name}</div>
          <div className="text-xl font-black text-puchk-orange">{licenses[selectedLicense].price}€</div>
        </div>
        <button className="flex-1 max-w-[200px] h-12 bg-puchk-orange text-white font-bold text-sm rounded-xl shadow-[0_0_20px_rgba(255,107,26,0.3)] btn-press">
          Acheter
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
