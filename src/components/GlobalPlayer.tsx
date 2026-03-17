import { motion } from "framer-motion";
import { Play, Pause, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Kit } from "@/data/mockData";

interface GlobalPlayerProps {
  kit: Kit | null;
  onClose: () => void;
}

const WaveformBar = ({ index, playing }: { index: number; playing: boolean }) => {
  const baseHeight = 8 + Math.sin(index * 0.8) * 12 + Math.random() * 8;
  return (
    <motion.div
      animate={playing ? { height: [baseHeight, baseHeight * 0.5 + Math.random() * 20, baseHeight] } : { height: baseHeight }}
      transition={playing ? { repeat: Infinity, duration: 0.8 + Math.random() * 0.5, delay: index * 0.03 } : {}}
      className={`w-[3px] rounded-full ${index < 20 ? "bg-puchk-orange" : "bg-puchk-orange/20"}`}
    />
  );
};

const GlobalPlayer = ({ kit, onClose }: GlobalPlayerProps) => {
  const [playing, setPlaying] = useState(true);

  if (!kit) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 h-20 bg-[#0D0D0D]/90 backdrop-blur-2xl border-t border-[rgba(255,107,26,0.08)] z-50 flex items-center px-6 gap-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
    >
      {/* Cover */}
      <div className="flex items-center gap-3 w-[18%] min-w-[140px]">
        <div className="w-12 h-12 rounded-lg bg-puchk-orange/20 border border-white/10 overflow-hidden flex-shrink-0" />
        <div className="truncate">
          <div className="text-sm font-bold text-white uppercase truncate">{kit.name}</div>
          <div className="text-[10px] text-white/40 uppercase tracking-widest">{kit.producer}</div>
        </div>
      </div>

      {/* Controls + Waveform */}
      <div className="flex-1 flex items-center gap-4">
        <button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-full bg-puchk-orange flex items-center justify-center shadow-[0_0_15px_rgba(255,107,26,0.3)] flex-shrink-0"
        >
          {playing ? <Pause className="w-5 h-5 text-white fill-white" /> : <Play className="w-5 h-5 text-white fill-white ml-0.5" />}
        </button>

        <div className="flex-1 h-8 flex items-end gap-[2px] overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <WaveformBar key={i} index={i} playing={playing} />
          ))}
        </div>
      </div>

      {/* Price + actions */}
      <div className="flex items-center gap-4 w-[18%] min-w-[140px] justify-end">
        <div className="text-right">
          <div className="text-[10px] text-white/40 uppercase">Prix</div>
          <div className="text-sm font-black text-puchk-orange">{kit.price}€</div>
        </div>
        <button className="px-4 py-2 bg-puchk-orange text-white text-xs font-bold uppercase rounded-full hover:bg-puchk-orange-hover spring-transition">
          Ajouter
        </button>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 spring-transition">
          <X className="w-4 h-4 text-white/40" />
        </button>
      </div>
    </motion.div>
  );
};

export default GlobalPlayer;
