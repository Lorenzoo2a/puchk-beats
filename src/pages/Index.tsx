import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Star, Play } from "lucide-react";
import { kits, producers, trendingTags } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import ProducerCard from "@/components/ProducerCard";
import KitCover from "@/components/KitCover";
import { Link } from "react-router-dom";
import { Kit } from "@/data/mockData";

interface HomePageProps {
  onPlay: (kit: Kit) => void;
}

/* Animated counter */
const AnimCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* Floating particles */
const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-puchk-orange/40"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{ y: [-10, 10, -10], x: [-5, 5, -5], opacity: [0.2, 0.6, 0.2] }}
        transition={{ repeat: Infinity, duration: 4 + Math.random() * 4, delay: Math.random() * 3 }}
      />
    ))}
  </div>
);

const HomePage = ({ onPlay }: HomePageProps) => {
  const weekKit = kits[0]; // INFERNO as kit of the week
  const hotKits = [...kits].sort((a, b) => b.sales - a.sales).slice(0, 6);
  const staffPicks = [kits[0], kits[2], kits[8]]; // INFERNO, DRILL SURGERY, SILK
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-16">
      {/* ===== HERO ===== */}
      <section className="relative max-h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        {/* BG Grid */}
        <div className="absolute inset-0" style={{ perspective: "1000px" }}>
          <div
            className="absolute inset-0 animate-gradient"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,107,26,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,107,26,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              transform: "rotateX(60deg) translateZ(-100px)",
              transformOrigin: "center top",
            }}
          />
        </div>

        <Particles />
        <div className="absolute inset-0 bg-gradient-to-b from-puchk-base/30 via-transparent to-puchk-base z-[1]" />

        <div className="relative z-[2] max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 py-16">
          {/* Left */}
          <div className="flex-1">
            <motion.h1
              className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-puchk-orange glow-text leading-none"
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
              className="text-xl text-white/70 mt-4 mb-8 max-w-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Les meilleurs drum kits du game.
            </motion.p>

            <motion.div
              className="flex gap-3 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                to="/#hot"
                className="px-6 py-3 bg-puchk-orange text-white font-bold text-sm rounded-xl hover:bg-puchk-orange-hover spring-transition shadow-[0_0_20px_rgba(255,107,26,0.3)]"
              >
                Explorer la marketplace →
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-3 glass text-white/80 font-bold text-sm rounded-xl hover:text-white spring-transition"
              >
                Commencer à vendre
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
                  <div className="text-2xl font-black text-white">
                    <AnimCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Kit of the week */}
          <motion.div
            className="w-full max-w-sm rounded-2xl overflow-hidden border border-puchk-orange/20 animate-border-glow puchk-shadow"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div className="glass p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 mb-3 flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400" /> KIT DE LA SEMAINE
              </div>
              <div className="rounded-xl overflow-hidden mb-3 relative group">
                <KitCover genre={weekKit.genre} title={weekKit.name} producer={weekKit.producer} aspectRatio="1/1" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-[5]">
                  <button
                    onClick={() => onPlay(weekKit)}
                    className="w-16 h-16 rounded-full bg-puchk-orange/90 backdrop-blur flex items-center justify-center shadow-[0_0_25px_rgba(255,107,26,0.5)]"
                  >
                    <Play className="w-7 h-7 text-white fill-white ml-0.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold uppercase">{weekKit.name}</h3>
                  <p className="text-xs text-white/50">{weekKit.producer}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-white/50">{weekKit.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-puchk-orange">{weekKit.price}€</div>
                  <Link
                    to={`/kit/${weekKit.id}`}
                    className="text-[10px] text-puchk-orange hover:underline uppercase tracking-wider"
                  >
                    Acheter →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TRENDING TAGS ===== */}
      <section className="bg-puchk-deep/60 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange flex-shrink-0">Tendances :</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-puchk-surface border border-[rgba(255,107,26,0.08)] text-xs text-white/50 hover:text-puchk-orange hover:border-puchk-orange/30 hover:bg-puchk-orange/5 spring-transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== HOT THIS WEEK ===== */}
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
            <button onClick={() => scroll(-1)} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur flex items-center justify-center hover:bg-white/10 spring-transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll(1)} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur flex items-center justify-center hover:bg-white/10 spring-transition">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {hotKits.map((kit) => (
            <div key={kit.id} className="min-w-[280px] max-w-[300px] snap-start flex-shrink-0">
              <ProductCard kit={kit} onPlay={onPlay} />
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== STAFF PICKS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl text-yellow-400">⭐</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400">CURATED</span>
        </div>
        <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Staff Picks</h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Large card */}
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
              <button
                onClick={(e) => { e.preventDefault(); onPlay(staffPicks[0]); }}
                className="w-16 h-16 rounded-full bg-puchk-orange/90 backdrop-blur flex items-center justify-center shadow-[0_0_25px_rgba(255,107,26,0.5)]"
              >
                <Play className="w-7 h-7 text-white fill-white ml-0.5" />
              </button>
            </div>
          </Link>

          {/* Two small cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {staffPicks.slice(1).map((kit) => (
              <ProductCard key={kit.id} kit={kit} onPlay={onPlay} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== RISING PRODUCERS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">👥</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange">PRODUCTEURS</span>
        </div>
        <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Rising Producers</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {producers.slice(0, 5).map((p) => (
            <ProducerCard key={p.id} producer={p} />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== CTA SELL ===== */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="relative glass rounded-3xl p-10 text-center noise-overlay overflow-hidden animate-border-glow">
          <div className="absolute inset-0 bg-gradient-radial from-puchk-orange/5 to-transparent pointer-events-none" />
          <h2 className="text-4xl font-extrabold uppercase tracking-tight mb-3 relative z-10">
            Garde <span className="text-puchk-orange animate-pulse-glow">85%</span> de tes ventes.
          </h2>
          <p className="text-white/50 max-w-lg mx-auto mb-8 relative z-10">
            Upload tes drum kits, définis tes licences, et touche le maximum de chaque vente.
          </p>
          <div className="flex justify-center gap-8 mb-8 relative z-10">
            {[
              { value: "15%", label: "commission" },
              { value: "85%", label: "tu gardes" },
              { value: "Mensuel", label: "paiement" },
            ].map((s) => (
              <div key={s.label}>
                <div className={`text-2xl font-black ${s.value === "85%" ? "text-puchk-orange animate-pulse-glow" : "text-white"}`}>
                  {s.value}
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3 relative z-10">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-puchk-orange text-white font-bold text-sm rounded-xl hover:bg-puchk-orange-hover spring-transition"
            >
              Commencer à vendre →
            </Link>
            <button className="px-6 py-3 glass text-white/70 font-bold text-sm rounded-xl hover:text-white spring-transition">
              Voir les top vendeurs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
