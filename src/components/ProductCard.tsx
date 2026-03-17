import { motion, useInView } from "framer-motion";
import { Play, Heart, ShoppingBag, Star } from "lucide-react";
import { Kit, genreLabels } from "@/data/mockData";
import KitCover from "./KitCover";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

interface ProductCardProps {
  kit: Kit;
  onPlay?: (kit: Kit) => void;
  index?: number;
}

const ProductCard = ({ kit, onPlay, index = 0 }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const [ripple, setRipple] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    onPlay?.(kit);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] hover:shadow-[0_8px_40px_rgba(255,107,26,0.12)] transition-all duration-300"
    >
      {/* Cover */}
      <Link to={`/kit/${kit.id}`} className="block relative overflow-hidden">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <KitCover genre={kit.genre} title={kit.name} producer={kit.producer} />
        </div>

        {/* Play button overlay with ripple */}
        <div className="absolute inset-0 flex items-center justify-center z-[5]">
          <motion.button
            onClick={handlePlay}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75 btn-press relative overflow-hidden"
          >
            <Play className="w-5 h-5 text-white fill-white ml-0.5 relative z-10" />
            {ripple && (
              <span className="absolute inset-0 rounded-full bg-puchk-orange/30 animate-ripple" />
            )}
          </motion.button>
        </div>

        {/* Favorite */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 z-[5] p-1.5 rounded-full bg-black/20 backdrop-blur-sm transition-all duration-200 hover:bg-black/40 btn-press"
        >
          <Heart className={`w-4 h-4 transition-all duration-300 ${liked ? "fill-puchk-orange text-puchk-orange animate-heart-burst" : "text-white/60"}`} />
        </button>
      </Link>

      {/* Info zone */}
      <div className="p-4 flex justify-between items-center">
        <div>
          <span className="text-lg font-bold text-puchk-orange">{kit.price}€</span>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-[10px] text-secondary-puchk">{kit.rating} ({kit.reviews})</span>
          </div>
        </div>
        <button className="p-2.5 rounded-xl bg-white/5 hover:bg-puchk-orange transition-all duration-200 group/btn btn-press">
          <ShoppingBag className="w-4 h-4 group-hover/btn:text-white text-white/50 transition-colors" />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
