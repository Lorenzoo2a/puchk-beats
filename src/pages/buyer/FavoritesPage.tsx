import { kits, Kit } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const favoriteKits = [kits[0], kits[2], kits[3], kits[8]];

interface FavoritesPageProps {
  onPlay: (kit: Kit) => void;
}

const FavoritesPage = ({ onPlay }: FavoritesPageProps) => {
  if (favoriteKits.length === 0) {
    return (
      <div className="text-center py-20">
        <Heart className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Aucun favori pour l'instant</h2>
        <Link to="/marketplace" className="text-puchk-orange hover:underline text-sm">Découvrir des kits →</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Mes Favoris</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {favoriteKits.map((kit) => (
          <ProductCard key={kit.id} kit={kit} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
