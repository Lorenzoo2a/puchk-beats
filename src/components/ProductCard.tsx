import { motion } from "framer-motion";
import { Play, Heart, ShoppingBag, Star } from "lucide-react";
import { Kit, genreLabels } from "@/data/mockData";
import KitCover from "./KitCover";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProductCardProps {
  kit: Kit;
  onPlay?: (kit: Kit) => void;
}

const ProductCard = ({ kit, onPlay }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="group relative bg-puchk-surface rounded-2xl overflow-hidden border border-[rgba(255,107,26,0.08)] hover:border-[rgba(255,107,26,0.3)] spring-transition puchk-shadow"
    >
      {/* Cover */}
      <Link to={`/kit/${kit.id}`} className="block relative">
        <KitCover genre={kit.genre} title={kit.name} producer={kit.producer} />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[5]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.preventDefault(); onPlay?.(kit); }}
            className="w-14 h-14 rounded-full bg-puchk-orange flex items-center justify-center shadow-[0_0_20px_rgba(255,107,26,0.5)]"
          >
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </motion.button>
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-3 right-3 z-[5] p-1.5 rounded-full bg-black/30 backdrop-blur-sm spring-transition hover:bg-black/50"
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : "text-white/70"}`} />
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
        <button className="p-3 rounded-xl bg-white/5 hover:bg-puchk-orange spring-transition group/btn">
          <ShoppingBag className="w-5 h-5 group-hover/btn:text-white text-white/70 spring-transition" />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
