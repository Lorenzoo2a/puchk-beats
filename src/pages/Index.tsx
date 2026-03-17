import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Star, Play, Pause, Folder, FileAudio, Users, Quote, Wrench, Mic, SlidersHorizontal } from "lucide-react";
import { kits, producers, trendingTags, Kit } from "@/data/mockData";
import { useSequentialGlow } from "@/hooks/useSequentialGlow";
import ProductCard from "@/components/ProductCard";
import ProducerCard from "@/components/ProducerCard";
import KitCover from "@/components/KitCover";
import { Link } from "react-router-dom";
import FlowFieldCanvas from "@/components/FlowFieldCanvas";

interface HomePageProps {
  onPlay: (kit: Kit) => void;
}

/* ── Animated counter ── */
const AnimCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as any, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, inView]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ── Text shadow styles for readability ── */
const titleShadow = { textShadow: "0 2px 10px rgba(0,0,0,0.8)" };
const subtitleShadow = { textShadow: "0 1px 6px rgba(0,0,0,0.6)" };

/* ── Scroll reveal wrapper ── */
const ScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Mini player component ── */
const MiniPlayer = ({ kit, onPlay }: { kit: Kit; onPlay: (k: Kit) => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setIsPlaying(false); return 0; }
        return p + 0.5;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl liquid-glass hover:border-white/[0.12] transition-all duration-300 group">
      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
        <KitCover genre={kit.genre} title="" producer="" aspectRatio="1/1" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate">{kit.name}</div>
        <div className="text-[10px] text-secondary-puchk">{kit.producer}</div>
      </div>
      <button
        onClick={() => { setIsPlaying(!isPlaying); onPlay(kit); }}
        className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-puchk-orange transition-colors flex-shrink-0 btn-press ${isPlaying ? "animate-pulse-glow bg-puchk-orange" : ""}`}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5 text-white fill-white" /> : <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />}
      </button>
      <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden flex-shrink-0">
        <div className="h-full bg-puchk-orange rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>
      <span className="text-[10px] text-white/30 w-8 text-right flex-shrink-0">0:30</span>
    </div>
  );
};

/* ── Testimonials data ── */
const testimonials = [
  { text: "PUCHK a changé ma façon de vendre mes kits.", user: "@KXZMA", role: "Vendeur", emoji: "🔥" },
  { text: "Les kits sont de qualité studio. Rien à voir avec les autres marketplaces.", user: "@xMelo", role: "Acheteur", emoji: "🎧" },
  { text: "J'ai fait mes premiers 1000€ en 2 semaines sur PUCHK.", user: "@OZKR", role: "Vendeur", emoji: "💰" },
  { text: "L'interface est propre, le téléchargement est instantané.", user: "@BeatsByJay", role: "Acheteur", emoji: "⚡" },
  { text: "Le Puchk Tool m'a fait gagner des heures sur l'organisation de mes kits.", user: "@mochiprod", role: "Vendeur", emoji: "🛠" },
  { text: "Enfin une marketplace faite PAR des producteurs POUR des producteurs.", user: "@DriftKing", role: "Acheteur", emoji: "✨" },
];

/* ── Hero slides config — Puchk Tool first ── */
const heroSlides = [
  { id: "puchk-tool", type: "tool" as const },
  { id: "kit-week", type: "kit" as const },
  { id: "producers", type: "producers" as const },
  { id: "promo", type: "promo" as const },
];

/* ── Glow wrapper component ── */
const GlowCard = ({ children, isGlowing, className = "" }: { children: React.ReactNode; isGlowing: boolean; className?: string }) => (
  <div
    className={`relative z-[1] hover:z-50 ${className}`}
    style={{
      boxShadow: isGlowing ? "0 0 25px rgba(255,107,26,0.12), 0 0 8px rgba(255,107,26,0.06)" : "none",
      borderRadius: "1rem",
      transition: "box-shadow 600ms ease",
    }}
  >
    {children}
  </div>
);

const HomePage = ({ onPlay }: HomePageProps) => {
  const weekKit = kits[0];
  const promoKit = kits[10];
  const hotKits = [...kits].sort((a, b) => b.sales - a.sales).slice(0, 8);
  const staffPicks = [kits[0], kits[2], kits[8], kits[4], kits[6]];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveringHero, setHoveringHero] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Hot kits carousel state
  const [hotPage, setHotPage] = useState(0);
  const hotCardsPerPage = 4;
  const hotTotalPages = Math.ceil(hotKits.length / hotCardsPerPage);

  const hotGlow = useSequentialGlow(Math.min(hotCardsPerPage, hotKits.length - hotPage * hotCardsPerPage));
  const staffGlow = useSequentialGlow(4);
  const producerGlow = useSequentialGlow(5);

  useEffect(() => {
    if (hoveringHero) return;
    const timer = setInterval(() => setCurrentSlide((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, [hoveringHero]);

  const handleHeroMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleHeroMouseLeave = useCallback(() => {
    setHoveringHero(false);
    setMousePos(null);
  }, []);

  const renderSlide = (slideIndex: number) => {
    switch (heroSlides[slideIndex].type) {
      case "tool":
        return (
          <motion.div className="relative z-[2] max-w-5xl mx-auto px-6 w-full text-center flex flex-col items-center justify-center h-full" key="slide-tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6">
              <motion.div className="w-14 h-14 rounded-2xl bg-puchk-orange/10 border border-puchk-orange/20 flex items-center justify-center mx-auto mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }}>
                <Wrench className="w-7 h-7 text-puchk-orange" />
              </motion.div>
              <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3" style={titleShadow} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                Crée ton drumkit de A à Z
              </motion.h2>
              <motion.p className="text-xs sm:text-sm text-secondary-puchk max-w-xl mx-auto mb-5 leading-relaxed" style={subtitleShadow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                Enregistre tes sons, importe tes samples, mixe dans le Mix Panel intégré, personnalise pour FL Studio, et exporte un kit ZIP prêt à vendre.
              </motion.p>
              <motion.div className="flex flex-wrap justify-center gap-2 mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                {[
                  { icon: "🎙️", label: "Enregistrement" },
                  { icon: "🎛️", label: "Mix Panel" },
                  { icon: "📁", label: "FL Studio" },
                ].map(f => (
                  <div key={f.label} className="liquid-glass rounded-lg px-3 py-2 flex items-center gap-1.5">
                    <span className="text-sm">{f.icon}</span>
                    <span className="text-[11px] font-semibold">{f.label}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div className="flex justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <a href="https://tool.puchk.com" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-puchk-orange text-white font-black text-base rounded-xl btn-orange-glow btn-press inline-flex items-center gap-2 animate-pulse-glow">
                  Ouvrir Puchk Tool <ArrowRight className="w-5 h-5" />
                </a>
                <a href="https://tool.puchk.com" target="_blank" rel="noopener noreferrer" className="px-6 py-4 liquid-glass font-semibold text-sm rounded-xl hover:text-puchk-orange transition-all btn-press">
                  En savoir plus
                </a>
              </motion.div>
            </div>
          </motion.div>
        );

      case "kit":
        return (
          <motion.div className="relative z-[2] max-w-6xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 h-full justify-center" key="slide-kit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
            <div className="flex-1 max-w-xl bg-black/30 backdrop-blur-sm rounded-2xl p-6">
              <motion.h1
                className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-puchk-orange animate-pulse-text-glow leading-[0.85]"
                style={titleShadow}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {"PUCHK".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p className="text-lg text-secondary-puchk mt-6 mb-8 leading-relaxed" style={subtitleShadow} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                Les meilleurs drum kits du game.
              </motion.p>
              <motion.div className="flex gap-3 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Link to="/marketplace" className="px-6 py-3 bg-puchk-orange text-white font-semibold text-sm rounded-xl btn-orange-glow btn-press">
                  Explorer la marketplace →
                </Link>
                <Link to="/dashboard" className="px-6 py-3 liquid-glass font-semibold text-sm rounded-xl hover:text-puchk-orange transition-all btn-press">
                  Commencer à vendre
                </Link>
              </motion.div>
              <div className="flex gap-10">
                {[
                  { value: 2400, label: "kits", suffix: "+" },
                  { value: 850, label: "producteurs", suffix: "+" },
                  { value: 25000, label: "ventes", suffix: "+" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-black tracking-tight" style={titleShadow}>
                      <AnimCounter target={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-secondary-puchk mt-1" style={subtitleShadow}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <motion.div className="w-full max-w-sm rounded-2xl overflow-hidden animate-border-glow liquid-glass puchk-shadow" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, type: "spring" }}>
              <div className="p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 mb-4 flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-yellow-400" /> KIT DE LA SEMAINE
                </div>
                <div className="rounded-xl overflow-hidden mb-4 relative group">
                  <KitCover genre={weekKit.genre} title={weekKit.name} producer={weekKit.producer} aspectRatio="1/1" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-[5]">
                    <button onClick={() => onPlay(weekKit)} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center btn-press">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{weekKit.name}</h3>
                    <p className="text-xs text-secondary-puchk">{weekKit.producer}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-puchk-orange">{weekKit.price}€</div>
                    <Link to={`/kit/${weekKit.id}`} className="text-[10px] text-puchk-orange hover:underline">Découvrir →</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case "producers":
        return (
          <motion.div className="relative z-[2] max-w-3xl mx-auto px-6 w-full text-center flex flex-col items-center justify-center h-full" key="slide-producers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6">
              <motion.div className="w-16 h-16 rounded-2xl bg-puchk-orange/10 border border-puchk-orange/20 flex items-center justify-center mx-auto mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }}>
                <Users className="w-8 h-8 text-puchk-orange" />
              </motion.div>
              <motion.h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={titleShadow} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                Rejoins <span className="text-puchk-orange"><AnimCounter target={850} suffix="+" /></span> producteurs
              </motion.h2>
              <motion.p className="text-base text-secondary-puchk mb-10" style={subtitleShadow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                Publie tes kits, définis tes prix, garde 85% de chaque vente.
              </motion.p>
              <motion.div className="flex justify-center gap-8 mb-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                {[{ v: "15%", l: "Commission" }, { v: "85%", l: "Tu gardes" }, { v: "Mensuel", l: "Paiement" }].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-3xl font-black text-puchk-orange" style={titleShadow}>{s.v}</div>
                    <div className="text-xs text-secondary-puchk uppercase tracking-wider mt-1" style={subtitleShadow}>{s.l}</div>
                  </div>
                ))}
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link to="/dashboard" className="px-8 py-3.5 bg-puchk-orange text-white font-bold text-sm rounded-xl btn-orange-glow btn-press inline-flex items-center gap-2">
                  Commencer à vendre <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        );

      case "promo":
        return (
          <motion.div className="relative z-[2] max-w-6xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 h-full justify-center" key="slide-promo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
            <motion.div className="flex-1 max-w-lg rounded-2xl overflow-hidden" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
              <KitCover genre={promoKit.genre} title={promoKit.name} producer={promoKit.producer} aspectRatio="1/1" />
            </motion.div>
            <motion.div className="flex-1 max-w-md" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <div className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-3 flex items-center gap-1">🆕 NOUVEAU</div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">{promoKit.name}</h2>
              <p className="text-secondary-puchk mb-2">par <span className="text-puchk-orange">{promoKit.producer}</span></p>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-secondary-puchk">{promoKit.rating} · {promoKit.sales.toLocaleString()} ventes</span>
              </div>
              <div className="text-4xl font-black text-puchk-orange mb-6">{promoKit.price}€</div>
              <Link to={`/kit/${promoKit.id}`} className="px-8 py-3.5 bg-puchk-orange text-white font-bold text-sm rounded-xl btn-orange-glow btn-press inline-flex items-center gap-2">
                Découvrir <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* ===== HERO CAROUSEL — Fixed height ===== */}
      <section
        ref={heroRef}
        className="relative h-[50vh] lg:h-[55vh] flex items-center overflow-hidden"
        onMouseEnter={() => setHoveringHero(true)}
        onMouseLeave={handleHeroMouseLeave}
        onMouseMove={handleHeroMouseMove}
      >
        {/* Flow field canvas background */}
        <FlowFieldCanvas mousePos={mousePos} />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)]/20 via-transparent to-[var(--bg-base)] z-[1] pointer-events-none" />
        <div className="absolute inset-0 noise-overlay z-[1] pointer-events-none" />

        {/* Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-[0]"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, rgba(255,107,26,0.06) 0%, transparent 50%)",
            animation: "halo-pulse 6s ease-in-out infinite",
          }}
        />

        <AnimatePresence mode="wait">
          {renderSlide(currentSlide)}
        </AnimatePresence>

        {/* Carousel controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex items-center gap-3">
          <button onClick={() => setCurrentSlide((c) => (c - 1 + heroSlides.length) % heroSlides.length)} className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center hover:bg-white/10 transition-colors btn-press">
            <ChevronLeft className="w-4 h-4 text-white/60" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-500 ${i === currentSlide ? "bg-puchk-orange w-8 h-2.5" : "bg-white/20 w-2.5 h-2.5 hover:bg-white/40"}`}
              />
            ))}
          </div>
          <button onClick={() => setCurrentSlide((c) => (c + 1) % heroSlides.length)} className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center hover:bg-white/10 transition-colors btn-press">
            <ChevronRight className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </section>

      {/* ===== TRENDING TAGS ===== */}
      <ScrollReveal>
        <section className="bg-[var(--bg-warm)] py-5">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <span className="text-xs font-bold uppercase tracking-widest text-puchk-orange flex-shrink-0">Tendances</span>
            {trendingTags.map((tag, i) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-secondary-puchk hover:text-puchk-orange hover:border-puchk-orange/20 hover:bg-puchk-orange/[0.05] hover:backdrop-blur-sm transition-all duration-300 btn-press tag-flash"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== HOT THIS WEEK ===== */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-puchk-orange">en ce moment</span>
              <h2 className="text-4xl font-black tracking-tight mt-1">Kits les plus vendus</h2>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setHotPage(p => Math.max(0, p - 1))} disabled={hotPage === 0} className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:bg-white/10 transition-colors btn-press disabled:opacity-30">
                <ChevronLeft className="w-5 h-5 text-white/50" />
              </button>
              <button onClick={() => setHotPage(p => Math.min(hotTotalPages - 1, p + 1))} disabled={hotPage >= hotTotalPages - 1} className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:bg-white/10 transition-colors btn-press disabled:opacity-30">
                <ChevronRight className="w-5 h-5 text-white/50" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div
          className="overflow-visible"
          onMouseEnter={() => hotGlow.pause()}
          onMouseLeave={() => hotGlow.resume()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hotKits.slice(hotPage * hotCardsPerPage, (hotPage + 1) * hotCardsPerPage).map((kit, i) => (
              <ScrollReveal key={`${hotPage}-${kit.id}`} delay={i * 0.08}>
                <GlowCard isGlowing={hotGlow.glowIndex === i}>
                  <ProductCard kit={kit} onPlay={onPlay} index={i} />
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {[...Array(hotTotalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setHotPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === hotPage ? "bg-puchk-orange w-6" : "bg-white/15 w-1.5"}`}
            />
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 text-center">
            <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm text-secondary-puchk hover:text-puchk-orange transition-colors">
              Voir tous les kits <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <div className="section-divider" />

      {/* ===== STAFF PICKS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <ScrollReveal>
          <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">curated</span>
          <h2 className="text-4xl font-black tracking-tight mt-1 mb-10">Staff Picks</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" style={{ minHeight: 480 }}>
          {/* Featured large card — info ONLY in overlay */}
          <ScrollReveal className="h-full">
            <Link to={`/kit/${staffPicks[0].id}`} className="block relative rounded-2xl overflow-hidden group h-full min-h-[480px]">
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                <KitCover genre={staffPicks[0].genre} title="" producer="" aspectRatio="1/1" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 z-[5] px-2.5 py-1 rounded-full bg-yellow-500/15 backdrop-blur-xl border border-yellow-500/15">
                <span className="text-[10px] font-bold tracking-widest uppercase text-yellow-400">Staff Pick</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-[5]">
                <h3 className="text-3xl font-black tracking-tight text-white drop-shadow-lg">{staffPicks[0].name}</h3>
                <p className="text-sm text-white/60 mt-1">{staffPicks[0].producer}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-black text-puchk-orange">{staffPicks[0].price}€</span>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-white/60">{staffPicks[0].rating}</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-[5]">
                <button onClick={(e) => { e.preventDefault(); onPlay(staffPicks[0]); }} className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center btn-press">
                  <Play className="w-7 h-7 text-white fill-white ml-0.5" />
                </button>
              </div>
            </Link>
          </ScrollReveal>

          {/* 2x2 grid of smaller picks with sequential glow */}
          <div
            className="grid grid-cols-2 gap-4"
            onMouseEnter={() => staffGlow.pause()}
            onMouseLeave={() => staffGlow.resume()}
          >
            {staffPicks.slice(1, 5).map((kit, i) => (
              <ScrollReveal key={kit.id} delay={0.08 + i * 0.08}>
                <GlowCard isGlowing={staffGlow.glowIndex === i}>
                  <ProductCard kit={kit} onPlay={onPlay} index={i} />
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== ÉCOUTE NOS KITS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <ScrollReveal>
          <span className="text-xs font-bold uppercase tracking-widest text-puchk-orange">previews</span>
          <h2 className="text-4xl font-black tracking-tight mt-1 mb-10">Écoute nos kits</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {kits.slice(0, 8).map((kit, i) => (
            <ScrollReveal key={kit.id} delay={i * 0.05}>
              <MiniPlayer kit={kit} onPlay={onPlay} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== RISING PRODUCERS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <ScrollReveal>
          <span className="text-xs font-bold uppercase tracking-widest text-puchk-orange">producteurs</span>
          <h2 className="text-4xl font-black tracking-tight mt-1 mb-10">Rising Producers</h2>
        </ScrollReveal>

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          onMouseEnter={() => producerGlow.pause()}
          onMouseLeave={() => producerGlow.resume()}
        >
          {producers.slice(0, 5).map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.08}>
              <GlowCard isGlowing={producerGlow.glowIndex === i}>
                <ProducerCard producer={p} />
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-28 overflow-hidden">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-6 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-puchk-orange">témoignages</span>
            <h2 className="text-4xl font-black tracking-tight mt-1">Ce qu'ils disent</h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[340px] flex-shrink-0 liquid-glass rounded-2xl p-6">
                <div className="text-2xl mb-3">{t.emoji}</div>
                <p className="text-sm text-white/80 leading-relaxed italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-puchk-orange/15 flex items-center justify-center text-[10px] font-bold text-puchk-orange">
                    {t.user.charAt(1).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{t.user}</div>
                    <div className="text-[10px] text-secondary-puchk">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== CTA FINAL ===== */}
      <section className="py-36 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,107,26,0.06)_0%,transparent_60%)] animate-halo pointer-events-none" />

        <ScrollReveal>
          <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-4">
              Crée. Vends. <span className="text-puchk-orange">Inspire.</span>
            </h2>
            <p className="text-lg text-secondary-puchk mb-10 leading-relaxed">
              Commence gratuitement. Rejoins la communauté PUCHK.
            </p>
            <div className="flex justify-center gap-3">
              <Link to="/marketplace" className="px-7 py-3.5 bg-puchk-orange text-white font-semibold text-sm rounded-xl btn-orange-glow btn-press">
                Explorer les kits
              </Link>
              <a href="https://tool.puchk.com" target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 liquid-glass font-semibold text-sm rounded-xl hover:text-puchk-orange transition-all btn-press">
                Essayer Puchk Tool →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default HomePage;
