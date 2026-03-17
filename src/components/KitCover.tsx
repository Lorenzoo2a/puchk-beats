import { Genre, genreColors, genreLabels } from "@/data/mockData";

interface KitCoverProps {
  genre: Genre;
  title: string;
  producer: string;
  aspectRatio?: "4/3" | "16/9" | "1/1";
  className?: string;
}

const GenreShapes = ({ genre }: { genre: Genre }) => {
  const colors = genreColors[genre];

  switch (genre) {
    case "trap_dark":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <linearGradient id="trap-dark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.accent} stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <polygon points="0,300 150,50 200,180 350,0 400,300" fill="url(#trap-dark-grad)" />
          <line x1="0" y1="80" x2="400" y2="80" stroke={colors.accent} strokeOpacity="0.15" strokeWidth="1" />
          <line x1="0" y1="160" x2="400" y2="155" stroke={colors.accent} strokeOpacity="0.1" strokeWidth="1" />
          <line x1="0" y1="220" x2="400" y2="225" stroke={colors.accent} strokeOpacity="0.08" strokeWidth="1" />
          <polygon points="180,40 220,40 200,0" fill={colors.accent} fillOpacity="0.2" />
          <rect x="50" y="100" width="80" height="2" fill={colors.accent} fillOpacity="0.3" transform="rotate(-15 90 101)" />
          <rect x="280" y="150" width="60" height="2" fill={colors.accent} fillOpacity="0.2" transform="rotate(12 310 151)" />
        </svg>
      );
    case "trap_melodic":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <radialGradient id="melodic-grad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor={colors.accent} stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="120" rx="180" ry="80" fill="url(#melodic-grad)" />
          <path d="M 50 250 Q 200 100 350 250" stroke={colors.accent2} strokeOpacity="0.2" strokeWidth="2" fill="none" />
          <path d="M 80 280 Q 200 140 320 280" stroke={colors.accent} strokeOpacity="0.15" strokeWidth="1.5" fill="none" />
          {[...Array(8)].map((_, i) => (
            <circle key={i} cx={50 + i * 45} cy={60 + Math.sin(i) * 30} r="1.5" fill={colors.accent} fillOpacity={0.3 + Math.random() * 0.3} />
          ))}
        </svg>
      );
    case "trap_street":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          {[...Array(6)].map((_, i) => (
            <line key={i} x1="0" y1={50 + i * 45} x2="400" y2={48 + i * 45 + (i % 2 ? 3 : -2)} stroke={colors.accent} strokeOpacity={0.08 + i * 0.02} strokeWidth="1" />
          ))}
          <rect x="100" y="80" width="200" height="3" fill={colors.accent} fillOpacity="0.15" />
          <rect x="150" y="180" width="120" height="2" fill={colors.accent} fillOpacity="0.1" />
        </svg>
      );
    case "trap_evil":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <radialGradient id="evil-grad" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor={colors.accent} stopOpacity="0.15" />
              <stop offset="50%" stopColor={colors.accent2} stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="150" r="120" fill="url(#evil-grad)" />
          <ellipse cx="200" cy="150" rx="40" ry="35" stroke={colors.accent} strokeOpacity="0.2" strokeWidth="1" fill="none" />
          <circle cx="200" cy="150" r="12" fill={colors.accent2} fillOpacity="0.15" />
          <path d="M 100 150 Q 150 50 200 150 Q 250 250 300 150" stroke={colors.accent} strokeOpacity="0.1" strokeWidth="1" fill="none" />
        </svg>
      );
    case "drill":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          {[...Array(5)].map((_, i) => (
            <line key={i} x1={80 + i * 60} y1="0" x2={120 + i * 60} y2="300" stroke={colors.accent} strokeOpacity={0.1 + i * 0.03} strokeWidth="1.5" />
          ))}
          <polygon points="180,100 220,100 210,200 190,200" stroke={colors.accent} strokeOpacity="0.15" strokeWidth="1" fill="none" />
        </svg>
      );
    case "drill_ny":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          {[...Array(8)].map((_, i) => (
            <rect key={i} x={30 + i * 48} y={200 - (i % 3 + 1) * 40} width="20" height={(i % 3 + 1) * 40 + 100} fill={colors.accent} fillOpacity={0.05 + i * 0.01} />
          ))}
        </svg>
      );
    case "lofi":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <radialGradient id="lofi-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.accent} stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          {[3, 2, 1].map((s, i) => (
            <circle key={i} cx="200" cy="150" r={40 + s * 35} stroke={colors.accent2 || colors.accent} strokeOpacity={0.08 + i * 0.04} strokeWidth="1" fill="none" />
          ))}
          <circle cx="200" cy="150" r="100" fill="url(#lofi-grad)" />
        </svg>
      );
    case "lofi_dreamy":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <filter id="dreamy-blur">
              <feGaussianBlur stdDeviation="20" />
            </filter>
          </defs>
          <ellipse cx="120" cy="130" rx="100" ry="60" fill={colors.accent} fillOpacity="0.08" filter="url(#dreamy-blur)" />
          <ellipse cx="300" cy="180" rx="80" ry="50" fill={colors.accent2 || colors.accent} fillOpacity="0.06" filter="url(#dreamy-blur)" />
          {[...Array(6)].map((_, i) => (
            <circle key={i} cx={60 + i * 60} cy={40 + Math.sin(i * 2) * 20} r="1" fill={colors.accent} fillOpacity="0.4" />
          ))}
        </svg>
      );
    case "phonk":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="0" y1={20 + i * 24} x2="400" y2={20 + i * 24} stroke={colors.accent} strokeOpacity={0.05 + (i % 3) * 0.05} strokeWidth="1" />
          ))}
          <path d="M 50 200 L 150 180 L 250 200 L 350 190" stroke={colors.accent2 || colors.accent} strokeOpacity="0.12" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "boom_bap":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <circle cx="200" cy="150" r="100" stroke={colors.accent} strokeOpacity="0.1" strokeWidth="1" fill="none" />
          <circle cx="200" cy="150" r="80" stroke={colors.accent} strokeOpacity="0.08" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="150" r="60" stroke={colors.accent} strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="150" r="40" stroke={colors.accent} strokeOpacity="0.15" strokeWidth="1" fill="none" />
          <circle cx="200" cy="150" r="5" fill={colors.accent} fillOpacity="0.2" />
        </svg>
      );
    case "future_bass":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <radialGradient id="future-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.accent} stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 60} x2="400" y2={i * 60} stroke={colors.accent} strokeOpacity="0.06" strokeWidth="0.5" />
          ))}
          {[...Array(8)].map((_, i) => (
            <line key={`v${i}`} x1={i * 57} y1="0" x2={i * 57} y2="300" stroke={colors.accent} strokeOpacity="0.06" strokeWidth="0.5" />
          ))}
          <circle cx="200" cy="150" r="60" fill="url(#future-glow)" />
        </svg>
      );
    case "rnb":
      return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <path d="M 0 200 Q 100 100 200 200 Q 300 300 400 200" stroke={colors.accent} strokeOpacity="0.12" strokeWidth="1.5" fill="none" />
          <path d="M 0 180 Q 100 120 200 180 Q 300 240 400 180" stroke={colors.accent} strokeOpacity="0.08" strokeWidth="1" fill="none" />
          <path d="M 0 220 Q 100 160 200 220 Q 300 280 400 220" stroke={colors.accent} strokeOpacity="0.06" strokeWidth="1" fill="none" />
        </svg>
      );
    default:
      return null;
  }
};

const KitCover = ({ genre, title, producer, aspectRatio = "4/3", className = "" }: KitCoverProps) => {
  const colors = genreColors[genre];
  const label = genreLabels[genre];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio, backgroundColor: colors.bg }}
    >
      {/* Genre-specific shapes */}
      <GenreShapes genre={genre} />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay z-[2]" />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[3]" />

      {/* Genre badge */}
      <div className="absolute top-3 left-3 z-[4] px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
        <span className="text-[10px] font-bold tracking-widest uppercase text-white/90">
          {label}
        </span>
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-[4]">
        <h3
          className="text-xl font-extrabold uppercase tracking-tight text-white drop-shadow-lg"
          style={{ textShadow: `0 0 20px ${colors.accent}40` }}
        >
          {title}
        </h3>
        <p className="text-xs text-white/60 font-medium mt-0.5">{producer}</p>
      </div>
    </div>
  );
};

export default KitCover;
