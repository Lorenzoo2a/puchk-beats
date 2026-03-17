import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Star, Play, Folder, FileAudio, Users } from "lucide-react";
import { kits, producers, trendingTags } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import ProducerCard from "@/components/ProducerCard";
import KitCover from "@/components/KitCover";
import { Link } from "react-router-dom";
import { Kit } from "@/data/mockData";

interface HomePageProps {
  onPlay: (kit: Kit) => void;
}

/* Animated counter — 2s duration */
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

/* Floating particles */
const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(18)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-puchk-orange/30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${2 + Math.random() * 3}px`,
          height: `${2 + Math.random() * 3}px`,
        }}
        animate={{ y: [-15, 15, -15], x: [-8, 8, -8], opacity: [0.15, 0.5, 0.15] }}
        transition={{ repeat: Infinity, duration: 4 + Math.random() * 5, delay: Math.random() * 4, ease: "easeInOut" }}
      />
    ))}
  </div>
);

/* Waveform SVG background */
const WaveformBG = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 400">
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.path
        key={i}
        d={`M0,${200 + i * 30} ${Array.from({ length: 12 }, (_, j) => `Q${j * 100 + 50},${200 + i * 30 + (j % 2 === 0 ? -30 : 30)} ${(j + 1) * 100},${200 + i * 30}`).join(" ")}`}
        fill="none"
        stroke="rgba(255,107,26,0.06)"
        strokeWidth="1.5"
        animate={{
          d: [
            `M0,${200 + i * 30} ${Array.from({ length: 12 }, (_, j) => `Q${j * 100 + 50},${200 + i * 30 + (j % 2 === 0 ? -30 : 30)} ${(j + 1) * 100},${200 + i * 30}`).join(" ")}`,
            `M0,${200 + i * 30} ${Array.from({ length: 12 }, (_, j) => `Q${j * 100 + 50},${200 + i * 30 + (j % 2 === 0 ? 30 : -30)} ${(j + 1) * 100},${200 + i * 30}`).join(" ")}`,
          ],
        }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 6 + i * 0.8, ease: "easeInOut" }}
      />
    ))}
  </svg>
);

/* Scroll reveal wrapper */
const ScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* Hero Slides */
const heroSlides = [
  { id: "kit-week", type: "kit" as const },
  { id: "puchk-tool", type: "tool" as const },
  { id: "producers", type: "producers" as const },
  { id: "promo", type: "promo" as const },
];

const HomePage = ({ onPlay }: HomePageProps) => {
  const weekKit = kits[0];
  const promoKit = kits[10]; // Pastel Dreams
  const hotKits = [...kits].sort((a, b) => b.sales - a.sales).slice(0, 6);
  const staffPicks = [kits[0], kits[2], kits[8]];
  const scrollRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveringHero, setHoveringHero] = useState(false);

  // Auto-rotation
  useEffect(() => {
    if (hoveringHero) return;
    const timer = setInterval(() => {
      setCurrentSlide((c) => (c + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [hoveringHero]);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const renderSlideRight = (slideIndex: number) => {
    switch (heroSlides[slideIndex].type) {
      case "kit":
        return (
          <motion.div
            className="w-full max-w-sm rounded-2xl overflow-hidden border border-puchk-orange/20 animate-border-glow puchk-shadow"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            key="kit"
          >
            <div className="glass p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 mb-3 flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400" /> KIT DE LA SEMAINE
              </div>
              <div className="rounded-xl overflow-hidden mb-3 relative group">
                <KitCover genre={weekKit.genre} title={weekKit.name} producer={weekKit.producer} aspectRatio="1/1" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-[5]">
                  <button onClick={() => onPlay(weekKit)} className="w-16 h-16 rounded-full bg-puchk-orange/90 backdrop-blur flex items-center justify-center shadow-[0_0_25px_rgba(255,107,26,0.5)] btn-press">
                    <Play className="w-7 h-7 text-white fill-white ml-0.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold uppercase">{weekKit.name}</h3>
                  <p className="text-xs text-secondary-puchk">{weekKit.producer}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-secondary-puchk">{weekKit.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-puchk-orange">{weekKit.price}€</div>
                  <Link to={`/kit/${weekKit.id}`} className="text-[10px] text-puchk-orange hover:underline uppercase tracking-wider">Acheter →</Link>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "tool":
        return (
          <motion.div
            className="w-full max-w-sm rounded-2xl overflow-hidden border border-puchk-orange/20 puchk-shadow glass p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            key="tool"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">🛠 PUCHK TOOL</div>
            {/* Decorative file tree */}
            <div className="bg-puchk-deep/50 rounded-xl p-4 mb-4 space-y-2 border border-[rgba(255,107,26,0.08)]">
              <div className="flex items-center gap-2 text-xs text-puchk-orange"><Folder className="w-3.5 h-3.5" /> My Drum Kit/</div>
              <div className="ml-4 flex items-center gap-2 text-xs text-secondary-puchk"><Folder className="w-3 h-3" /> Kicks/</div>
              <div className="ml-8 flex items-center gap-2 text-xs text-secondary-puchk"><FileAudio className="w-3 h-3" /> kick_hard_01.wav</div>
              <div className="ml-4 flex items-center gap-2 text-xs text-secondary-puchk"><Folder className="w-3 h-3" /> 808s/</div>
              <div className="ml-8 flex items-center gap-2 text-xs text-secondary-puchk"><FileAudio className="w-3 h-3" /> 808_sub_distorted.wav</div>
              <div className="ml-4 flex items-center gap-2 text-xs text-secondary-puchk"><Folder className="w-3 h-3" /> Hi-Hats/</div>
            </div>
            <h3 className="text-lg font-extrabold uppercase mb-1">Crée ton drumkit de A à Z</h3>
            <p className="text-xs text-secondary-puchk mb-4">Organise tes sons, personnalise tes dossiers pour FL Studio, et exporte un kit prêt à vendre.</p>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-puchk-orange text-white text-xs font-bold uppercase rounded-xl hover:bg-puchk-orange-hover spring-transition btn-press">
              Ouvrir Puchk Tool <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        );

      case "producers":
        return (
          <motion.div
            className="w-full max-w-sm rounded-2xl overflow-hidden border border-puchk-orange/20 puchk-shadow glass p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            key="producers"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> COMMUNAUTÉ
            </div>
            <h3 className="text-2xl font-extrabold uppercase mb-2">Rejoins 850+ producteurs</h3>
            <p className="text-xs text-secondary-puchk mb-4">Publie tes kits, touche 85% de chaque vente, et rejoins la communauté de beatmakers.</p>
            <div className="flex gap-4 mb-5">
              {[{ v: "850+", l: "Producteurs" }, { v: "25k+", l: "Ventes" }, { v: "85%", l: "Tu gardes" }].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-lg font-black text-puchk-orange">{s.v}</div>
                  <div className="text-[9px] text-secondary-puchk uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 bg-puchk-orange text-white text-xs font-bold uppercase rounded-xl hover:bg-puchk-orange-hover spring-transition btn-press">
              Commencer à vendre <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        );

      case "promo":
        return (
          <motion.div
            className="w-full max-w-sm rounded-2xl overflow-hidden border border-puchk-orange/20 animate-border-glow puchk-shadow"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            key="promo"
          >
            <div className="glass p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-3 flex items-center gap-1">🆕 NOUVEAU</div>
              <div className="rounded-xl overflow-hidden mb-3 relative group">
                <KitCover genre={promoKit.genre} title={promoKit.name} producer={promoKit.producer} aspectRatio="1/1" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-[5]">
                  <button onClick={() => onPlay(promoKit)} className="w-16 h-16 rounded-full bg-puchk-orange/90 backdrop-blur flex items-center justify-center shadow-[0_0_25px_rgba(255,107,26,0.5)] btn-press">
                    <Play className="w-7 h-7 text-white fill-white ml-0.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold uppercase">{promoKit.name}</h3>
                  <p className="text-xs text-secondary-puchk">{promoKit.producer}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-puchk-orange">{promoKit.price}€</div>
                  <Link to={`/kit/${promoKit.id}`} className="text-[10px] text-puchk-orange hover:underline uppercase tracking-wider">Voir →</Link>
                </div>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  const slideTexts = [
    { title: "Les meilleurs drum kits du game.", cta1: "Explorer la marketplace →", cta1Link: "/marketplace", cta2: "Commencer à vendre", cta2Link: "/dashboard" },
    { title: "Crée, organise et publie tes drum kits.", cta1: "Ouvrir Puchk Tool →", cta1Link: "#", cta2: "En savoir plus", cta2Link: "#" },
    { title: "Rejoins la communauté de producteurs.", cta1: "Devenir vendeur →", cta1Link: "/dashboard", cta2: "Voir les producteurs", cta2Link: "/producers" },
    { title: "Découvre les dernières sorties.", cta1: "Nouveautés →", cta1Link: "/marketplace", cta2: "Charts", cta2Link: "/charts" },
  ];

  return (
    <div className="min-h-screen pt-16 page-enter">
      {/* ===== HERO CAROUSEL ===== */}
      <section
        className="relative max-h-[70vh] min-h-[500px] flex items-center overflow-hidden"
        onMouseEnter={() => setHoveringHero(true)}
        onMouseLeave={() => setHoveringHero(false)}
      >
        <WaveformBG />
        <Particles />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)]/30 via-transparent to-[var(--bg-base)] z-[1]" />

        <div className="relative z-[2] max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 py-16">
          {/* Left */}
          <div className="flex-1">
            <motion.h1
              className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-puchk-orange animate-pulse-text-glow leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {"PUCHK".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-xl text-secondary-puchk mt-4 mb-8 max-w-md"
              key={currentSlide}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {slideTexts[currentSlide].title}
            </motion.p>

            <motion.div className="flex gap-3 mb-10" key={`cta-${currentSlide}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <Link to={slideTexts[currentSlide].cta1Link} className="px-6 py-3 bg-puchk-orange text-white font-bold text-sm rounded-xl hover:bg-puchk-orange-hover spring-transition shadow-[0_0_20px_rgba(255,107,26,0.3)] btn-press">
                {slideTexts[currentSlide].cta1}
              </Link>
              <Link to={slideTexts[currentSlide].cta2Link} className="px-6 py-3 glass font-bold text-sm rounded-xl hover:text-puchk-orange spring-transition btn-press">
                {slideTexts[currentSlide].cta2}
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { value: 2400, label: "kits", suffix: "+" },
                { value: 850, label: "producteurs", suffix: "+" },
                { value: 25000, label: "ventes", suffix: "+" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black">
                    <AnimCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] text-secondary-puchk uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Carousel slides */}
          <div className="w-full max-w-sm relative min-h-[380px] flex items-center justify-center">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {renderSlideRight(currentSlide)}
            </motion.div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[5] flex items-center gap-3">
          <button onClick={() => setCurrentSlide((c) => (c - 1 + heroSlides.length) % heroSlides.length)} className="w-8 h-8 rounded-full bg-white/5 backdrop-blur flex items-center justify-center hover:bg-white/10 spring-transition btn-press">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full spring-transition ${i === currentSlide ? "bg-puchk-orange w-6" : "bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
          <button onClick={() => setCurrentSlide((c) => (c + 1) % heroSlides.length)} className="w-8 h-8 rounded-full bg-white/5 backdrop-blur flex items-center justify-center hover:bg-white/10 spring-transition btn-press">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ===== TRENDING TAGS ===== */}
      <ScrollReveal>
        <section className="bg-[var(--bg-deep)]/60 py-4">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange flex-shrink-0">Tendances :</span>
            {trendingTags.map((tag) => (
              <button key={tag} className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--glass-border)] text-xs text-secondary-puchk hover:text-puchk-orange hover:border-puchk-orange/30 hover:bg-puchk-orange/5 spring-transition btn-press">
                {tag}
              </button>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <div className="section-divider" />

      {/* ===== HOT THIS WEEK ===== */}
      <ScrollReveal>
        <section id="hot" className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🔥</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange">EN CE MOMENT</span>
              </div>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight">Kits les plus vendus</h2>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => scroll(-1)} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur flex items-center justify-center hover:bg-white/10 spring-transition btn-press">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll(1)} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur flex items-center justify-center hover:bg-white/10 spring-transition btn-press">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
            {hotKits.map((kit, i) => (
              <motion.div
                key={kit.id}
                className="min-w-[280px] max-w-[300px] snap-start flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ProductCard kit={kit} onPlay={onPlay} />
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <div className="section-divider" />

      {/* ===== STAFF PICKS ===== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl text-yellow-400">⭐</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400">CURATED</span>
          </div>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Staff Picks</h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <Link to={`/kit/${staffPicks[0].id}`} className="lg:col-span-3 relative rounded-2xl overflow-hidden group">
              <KitCover genre={staffPicks[0].genre} title={staffPicks[0].name} producer={staffPicks[0].producer} aspectRatio="16/9" />
              <div className="absolute top-4 left-4 z-[5] px-2.5 py-1 rounded-full bg-yellow-500/20 backdrop-blur-md border border-yellow-500/20">
                <span className="text-[10px] font-bold tracking-widest uppercase text-yellow-400">Staff Pick</span>
              </div>
              <div className="absolute bottom-6 left-6 z-[5]">
                <h3 className="text-3xl font-extrabold uppercase tracking-tight text-white drop-shadow-lg">{staffPicks[0].name}</h3>
                <p className="text-sm text-white/60">{staffPicks[0].producer}</p>
                <span className="text-xl font-black text-puchk-orange mt-2 inline-block">{staffPicks[0].price}€</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-[5]">
                <button onClick={(e) => { e.preventDefault(); onPlay(staffPicks[0]); }} className="w-16 h-16 rounded-full bg-puchk-orange/90 backdrop-blur flex items-center justify-center shadow-[0_0_25px_rgba(255,107,26,0.5)] btn-press">
                  <Play className="w-7 h-7 text-white fill-white ml-0.5" />
                </button>
              </div>
            </Link>

            <div className="lg:col-span-2 flex flex-col gap-5">
              {staffPicks.slice(1).map((kit, i) => (
                <motion.div key={kit.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <ProductCard kit={kit} onPlay={onPlay} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div className="section-divider" />

      {/* ===== RISING PRODUCERS ===== */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">👥</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange">PRODUCTEURS</span>
          </div>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Rising Producers</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {producers.slice(0, 5).map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <ProducerCard producer={p} />
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <div className="section-divider" />

      {/* ===== CTA SELL ===== */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="relative glass rounded-3xl p-10 text-center noise-overlay overflow-hidden animate-border-glow">
            <div className="absolute inset-0 bg-gradient-radial from-puchk-orange/5 to-transparent pointer-events-none" />
            <h2 className="text-4xl font-extrabold uppercase tracking-tight mb-3 relative z-10">
              Garde <span className="text-puchk-orange animate-pulse-glow">85%</span> de tes ventes.
            </h2>
            <p className="text-secondary-puchk max-w-lg mx-auto mb-8 relative z-10">
              Upload tes drum kits, définis tes licences, et touche le maximum de chaque vente.
            </p>
            <div className="flex justify-center gap-8 mb-8 relative z-10">
              {[
                { value: "15%", label: "commission" },
                { value: "85%", label: "tu gardes" },
                { value: "Mensuel", label: "paiement" },
              ].map((s) => (
                <div key={s.label}>
                  <div className={`text-2xl font-black ${s.value === "85%" ? "text-puchk-orange animate-pulse-glow" : ""}`}>{s.value}</div>
                  <div className="text-[10px] text-secondary-puchk uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3 relative z-10">
              <Link to="/dashboard" className="px-6 py-3 bg-puchk-orange text-white font-bold text-sm rounded-xl hover:bg-puchk-orange-hover spring-transition btn-press">
                Commencer à vendre →
              </Link>
              <Link to="/producers" className="px-6 py-3 glass font-bold text-sm rounded-xl hover:text-puchk-orange spring-transition btn-press">
                Voir les top vendeurs
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default HomePage;
