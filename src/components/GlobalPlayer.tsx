import { motion } from "framer-motion";
import { Play, Pause, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Kit } from "@/data/mockData";
import KitCover from "./KitCover";

interface GlobalPlayerProps {
  kit: Kit | null;
  onClose: () => void;
}

const WaveformBar = ({ index, playing, baseH }: { index: number; playing: boolean; baseH: number }) => (
  <motion.div
    animate={playing ? {
      height: [baseH, baseH * 0.4 + Math.random() * 20, baseH * 0.7 + Math.random() * 10, baseH],
    } : { height: baseH }}
    transition={playing ? {
      repeat: Infinity,
      duration: 0.6 + Math.random() * 0.6,
      delay: index * 0.02,
      ease: "easeInOut",
    } : {}}
    className={`w-[2px] rounded-full ${index < 20 ? "bg-puchk-orange" : "bg-puchk-orange/15"}`}
  />
);

const GlobalPlayer = ({ kit, onClose }: GlobalPlayerProps) => {
  const [playing, setPlaying] = useState(true);

  const barHeights = useMemo(() =>
    [...Array(50)].map((_, i) => 6 + Math.sin(i * 0.8) * 10 + Math.random() * 8),
    []
  );

  if (!kit) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-0 left-0 right-0 h-20 liquid-glass-strong z-50 flex items-center px-6 gap-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
      style={{ borderRadius: 0 }}
    >
      {/* Orange reflet on top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-puchk-orange/10 to-transparent pointer-events-none" />

      {/* Cover */}
      <div className="flex items-center gap-3 w-[18%] min-w-[140px]">
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <KitCover genre={kit.genre} title="" producer="" aspectRatio="1/1" />
        </div>
        <div className="truncate">
          <div className="text-sm font-bold text-white truncate">{kit.name}</div>
          <div className="text-[10px] text-white/40">{kit.producer}</div>
        </div>
      </div>

      {/* Controls + Waveform */}
      <div className="flex-1 flex items-center gap-4">
        <button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-full bg-puchk-orange flex items-center justify-center shadow-[0_0_15px_rgba(255,107,26,0.3)] flex-shrink-0 btn-press"
        >
          {playing ? <Pause className="w-5 h-5 text-white fill-white" /> : <Play className="w-5 h-5 text-white fill-white ml-0.5" />}
        </button>

        <div className="flex-1 h-8 flex items-end gap-[2px] overflow-hidden">
          {barHeights.map((h, i) => (
            <WaveformBar key={i} index={i} playing={playing} baseH={h} />
          ))}
        </div>
      </div>

      {/* Price + actions */}
      <div className="flex items-center gap-4 w-[18%] min-w-[140px] justify-end">
        <div className="text-right">
          <div className="text-[10px] text-white/30 uppercase">Prix</div>
          <div className="text-sm font-black text-puchk-orange">{kit.price}€</div>
        </div>
        <button className="px-4 py-2 bg-puchk-orange text-white text-xs font-bold rounded-full hover:bg-puchk-orange-hover transition-colors btn-press">
          Ajouter
        </button>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
          <X className="w-4 h-4 text-white/30" />
        </button>
      </div>
    </motion.div>
  );
};

export default GlobalPlayer;
