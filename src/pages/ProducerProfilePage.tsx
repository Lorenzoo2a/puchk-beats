import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { producers, kits, Kit } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";

const ScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const badgeStyles: Record<string, string> = {
  "Top Seller": "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  "Verified": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Rising": "bg-puchk-orange/15 text-puchk-orange border-puchk-orange/20",
  "Fan Favorite": "bg-purple-500/15 text-purple-400 border-purple-500/20",
  "New": "bg-green-500/15 text-green-400 border-green-500/20",
};

/* Mock social links per producer */
const socialLinks: Record<string, { platform: string; url: string; color: string; icon: string }[]> = {
  kxzma: [
    { platform: "Instagram", url: "#", color: "#E4405F", icon: "📷" },
    { platform: "Twitter/X", url: "#", color: "#1DA1F2", icon: "🐦" },
    { platform: "YouTube", url: "#", color: "#FF0000", icon: "🎥" },
    { platform: "SoundCloud", url: "#", color: "#FF5500", icon: "☁️" },
    { platform: "Spotify", url: "#", color: "#1DB954", icon: "🎵" },
  ],
  ozkr: [
    { platform: "Instagram", url: "#", color: "#E4405F", icon: "📷" },
    { platform: "YouTube", url: "#", color: "#FF0000", icon: "🎥" },
    { platform: "BeatStars", url: "#", color: "#FF6B1A", icon: "🎹" },
  ],
  mochiprod: [
    { platform: "Instagram", url: "#", color: "#E4405F", icon: "📷" },
    { platform: "SoundCloud", url: "#", color: "#FF5500", icon: "☁️" },
    { platform: "TikTok", url: "#", color: "#000000", icon: "🎵" },
    { platform: "Genius", url: "#", color: "#FFFF64", icon: "📝" },
  ],
  "yung-satellite": [
    { platform: "Instagram", url: "#", color: "#E4405F", icon: "📷" },
    { platform: "Spotify", url: "#", color: "#1DB954", icon: "🎵" },
  ],
};

const ProducerProfilePage = ({ onPlay }: { onPlay: (kit: Kit) => void }) => {
  const { username } = useParams();
  const producer = producers.find((p) => p.id === username) || producers[0];
  const producerKits = kits.filter((k) => k.producerId === producer.id);
  const [following, setFollowing] = useState(false);
  const [comment, setComment] = useState("");
  const avgRating = producerKits.length > 0 ? (producerKits.reduce((s, k) => s + k.rating, 0) / producerKits.length).toFixed(1) : "0";
  const links = socialLinks[producer.id] || [];

  return (
    <div className="min-h-screen pt-16">
      {/* Banner */}
      <div className="h-48 relative" style={{ background: `linear-gradient(135deg, ${producer.genreColor}30, #141414)` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-base)]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <ScrollReveal>
          <div className="flex items-end gap-5 mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold border-4 border-[var(--bg-base)] animate-ring-pulse" style={{ background: `linear-gradient(135deg, ${producer.genreColor}60, ${producer.genreColor}20)` }}>
              {producer.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold">{producer.name}</h1>
              <p className="text-sm text-secondary-puchk">@{producer.id}</p>
            </div>
            <button onClick={() => setFollowing(!following)} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all btn-press ${following ? "border border-green-500/30 text-green-400" : "border border-puchk-orange/30 text-puchk-orange hover:bg-puchk-orange/5"}`}>
              {following ? "Suivi ✓" : "Follow"}
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-secondary-puchk mb-4">{producer.bio}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {producer.verified && <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${badgeStyles["Verified"]}`}>Verified</span>}
            {producer.badge && <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${badgeStyles[producer.badge] || ""}`}>{producer.badge}</span>}
          </div>

          {/* Social Links */}
          {links.length > 0 && (
            <div className="flex gap-2 mb-6">
              {links.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-lg transition-all duration-300 hover:shadow-[0_0_15px_var(--glow)] btn-press"
                  style={{ "--glow": `${s.color}40` } as React.CSSProperties}
                  title={s.platform}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          )}

          <div className="flex gap-4 mb-10">
            {[{ v: producer.kits, l: "kits" }, { v: producer.sales.toLocaleString(), l: "ventes" }, { v: avgRating, l: "note moy." }, { v: producer.followers.toLocaleString(), l: "followers" }].map((s) => (
              <div key={s.l} className="px-3 py-2 rounded-xl liquid-glass text-center">
                <div className="text-sm font-bold">{s.v}</div>
                <div className="text-[9px] text-secondary-puchk uppercase tracking-widest">{s.l}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="section-divider mb-8" />

        {/* Comments */}
        <ScrollReveal delay={0.15}>
          <div className="mb-10">
            <h2 className="text-lg font-extrabold uppercase mb-4">Commentaires</h2>
            <div className="flex gap-3 mb-4">
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Laisse un commentaire..." rows={2} className="flex-1 px-4 py-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--glass-border)] text-sm outline-none resize-none focus:border-puchk-orange/40 input-focus" />
              <button className="px-4 py-2 bg-puchk-orange text-white text-sm font-bold rounded-xl btn-orange-glow btn-press self-end">Publier</button>
            </div>
            <div className="space-y-3">
              {[{ user: "xMelo", text: "Les kits sont incroyables, qualité dingue !", date: "il y a 3j" }, { user: "ProdNova", text: "Mon producteur préféré sur PUCHK.", date: "il y a 1 sem" }].map((c, i) => (
                <div key={i} className="liquid-glass rounded-xl p-4 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-puchk-orange/20 flex items-center justify-center text-xs font-bold text-puchk-orange flex-shrink-0">{c.user.charAt(0)}</div>
                  <div><div className="flex items-center gap-2 mb-1"><span className="text-sm font-bold">{c.user}</span><span className="text-[10px] text-secondary-puchk">{c.date}</span></div><p className="text-sm text-secondary-puchk">{c.text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="section-divider mb-8" />

        {/* Kits */}
        <ScrollReveal delay={0.2}>
          <h2 className="text-lg font-extrabold uppercase mb-4">Kits de {producer.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {producerKits.map((kit, i) => (
              <ProductCard key={kit.id} kit={kit} onPlay={onPlay} index={i} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default ProducerProfilePage;
