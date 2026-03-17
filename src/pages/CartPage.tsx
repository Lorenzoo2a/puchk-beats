import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Tag, ShoppingBag, ArrowRight } from "lucide-react";
import { kits } from "@/data/mockData";

const initialCart = [
  { kit: kits[0], license: "Standard", price: 24.99 },
  { kit: kits[4], license: "Standard", price: 19.99 },
];

const CartPage = () => {
  const [cart, setCart] = useState(initialCart);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal - discount;

  const removeItem = (i: number) => setCart(cart.filter((_, idx) => idx !== i));

  const applyPromo = () => {
    if (promo.toUpperCase() === "FIRE20") {
      setDiscount(subtotal * 0.2);
      setPromoApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-puchk-surface flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-white/20" />
          </div>
          <h1 className="text-2xl font-extrabold uppercase mb-2">Ton panier est vide</h1>
          <p className="text-white/40 mb-6">Ajoute des drumkits pour commencer</p>
          <Link to="/marketplace" className="px-6 py-3 bg-puchk-orange text-white font-bold text-sm rounded-xl hover:bg-puchk-orange-hover spring-transition">
            Explorer la marketplace →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-1">Mon Panier</h1>
        <p className="text-white/40 text-sm mb-8">{cart.length} article{cart.length > 1 ? "s" : ""}</p>

        <div className="space-y-3 mb-8">
          {cart.map((item, i) => (
            <div key={i} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-puchk-orange/10 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm uppercase truncate">{item.kit.name}</p>
                <p className="text-[10px] text-white/40">{item.kit.producer} · Licence {item.license}</p>
              </div>
              <span className="text-lg font-bold text-puchk-orange">{item.price}€</span>
              <button onClick={() => removeItem(i)} className="p-2 rounded-lg hover:bg-white/5 spring-transition">
                <X className="w-4 h-4 text-white/40" />
              </button>
            </div>
          ))}
        </div>

        {/* Promo */}
        <div className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Code promo"
              className="w-full h-12 pl-10 pr-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white placeholder:text-white/30 outline-none focus:border-puchk-orange/40 spring-transition"
            />
          </div>
          <button onClick={applyPromo} className="px-5 h-12 bg-white/5 text-white/70 text-sm font-bold rounded-xl hover:bg-white/10 spring-transition">
            Appliquer
          </button>
        </div>

        {promoApplied && <p className="text-sm text-puchk-success mb-4">✓ Code FIRE20 appliqué — -20%</p>}

        {/* Summary */}
        <div className="glass rounded-2xl p-6 space-y-3">
          <div className="flex justify-between text-sm text-white/60">
            <span>Sous-total</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-puchk-success">
              <span>Réduction</span>
              <span>-{discount.toFixed(2)}€</span>
            </div>
          )}
          <div className="section-divider" />
          <div className="flex justify-between items-center">
            <span className="text-white/60">Total</span>
            <span className="text-2xl font-black text-puchk-orange">{total.toFixed(2)}€</span>
          </div>
          <button className="w-full h-14 bg-puchk-orange text-white font-bold text-sm uppercase rounded-xl hover:bg-puchk-orange-hover spring-transition shadow-[0_0_20px_rgba(255,107,26,0.3)] animate-pulse-glow mt-4">
            Payer — {total.toFixed(2)}€
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
