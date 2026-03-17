import { useState } from "react";
import { Star, TrendingUp, TrendingDown, Minus, Crown } from "lucide-react";
import { kits, Kit, genreLabels } from "@/data/mockData";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import KitCover from "@/components/KitCover";

type TabKey = "hot" | "sales" | "rated" | "new";

const ScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "hot", label: "Hot" },
  { key: "sales", label: "Meilleures ventes" },
  { key: "rated", label: "Mieux notés" },
  { key: "new", label: "Nouveautés" },
];

const getSorted = (tab: TabKey): Kit[] => {
  switch (tab) {
    case "hot": return [...kits].sort((a, b) => b.sales * b.rating - a.sales * a.rating);
    case "sales": return [...kits].sort((a, b) => b.sales - a.sales);
    case "rated": return [...kits].sort((a, b) => b.rating - a.rating);
    case "new": return [...kits].reverse();
  }
};

const getTrend = (i: number): "up" | "down" | "new" | "stable" => {
  if (i < 2) return "new";
  if (i % 4 === 0) return "up";
  if (i % 4 === 1) return "down";
  return "stable";
};

const ChartsPage = ({ onPlay }: { onPlay: (kit: Kit) => void }) => {
  const [tab, setTab] = useState<TabKey>("hot");
  const sorted = getSorted(tab);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumRanks = [2, 1, 3];
  const podiumBadges = ["🥈", "👑", "🥉"];
  const podiumScales = [1, 1.1, 1];
  const podiumHeights = ["h-56", "h-72", "h-48"];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <ScrollReveal>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-2">CHARTS</h1>
          <p className="text-lg text-secondary-puchk mb-10">Les kits qui font le game cette semaine</p>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="relative flex gap-1 mb-12 bg-[var(--bg-surface)] rounded-xl p-1 w-fit">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${tab === t.key ? "text-white" : "text-white/40 hover:text-white"}`}
              >
                {tab === t.key && (
                  <motion.div layoutId="chart-tab-bg" className="absolute inset-0 bg-puchk-orange rounded-lg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Podium */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ScrollReveal>
              <div className="flex items-end justify-center gap-4 sm:gap-6 mb-16">
                {podiumOrder.map((kit, i) => {
                  if (!kit) return null;
                  const rank = podiumRanks[i];
                  return (
                    <motion.div
                      key={kit.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transform: `scale(${podiumScales[i]})` }}
                    >
                      <Link
                        to={`/kit/${kit.id}`}
                        className={`flex-1 max-w-[240px] liquid-glass rounded-2xl p-5 text-center ${podiumHeights[i]} flex flex-col justify-end transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,26,0.15)] group ${rank === 1 ? "border-puchk-orange/30 animate-border-glow" : ""}`}
                      >
                        <div className="text-3xl mb-2">{podiumBadges[i]}</div>
                        <div className="text-4xl font-black text-puchk-orange mb-3">#{rank}</div>
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-[1.04]">
                          <KitCover genre={kit.genre} title="" producer="" aspectRatio="4/3" />
                        </div>
                        <h3 className="text-sm font-bold truncate">{kit.name}</h3>
                        <p className="text-[10px] text-secondary-puchk">{kit.producer}</p>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-secondary-puchk">{kit.rating}</span>
                          <span className="text-xs text-white/30">· {kit.sales.toLocaleString()}</span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Rankings #4-end */}
            <div className="space-y-1">
              {rest.map((kit, i) => {
                const rank = i + 4;
                const trend = getTrend(i);
                return (
                  <ScrollReveal key={kit.id} delay={i * 0.04}>
                    <Link
                      to={`/kit/${kit.id}`}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.03] hover:backdrop-blur-sm border-l-[3px] border-transparent hover:border-puchk-orange transition-all duration-300 group"
                    >
                      <span className={`text-2xl font-black w-10 text-center ${rank <= 10 ? "text-puchk-orange" : "text-white/20"}`}>#{rank}</span>
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.05]">
                        <KitCover genre={kit.genre} title="" producer="" aspectRatio="1/1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold truncate">{kit.name}</h3>
                        <p className="text-[10px] text-secondary-puchk">{kit.producer}</p>
                      </div>
                      <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-secondary-puchk">
                        {genreLabels[kit.genre]}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs">{kit.rating}</span>
                      </div>
                      <span className="text-xs text-secondary-puchk w-20 text-right">{kit.sales.toLocaleString()} ventes</span>
                      <span className="text-sm font-bold text-puchk-orange w-16 text-right">{kit.price}€</span>
                      <div className="w-8 flex justify-center">
                        {trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
                        {trend === "down" && <TrendingDown className="w-4 h-4 text-red-400" />}
                        {trend === "new" && <span className="text-[9px] px-1.5 py-0.5 rounded bg-puchk-orange/15 text-puchk-orange font-bold">NEW</span>}
                        {trend === "stable" && <Minus className="w-4 h-4 text-white/20" />}
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChartsPage;
