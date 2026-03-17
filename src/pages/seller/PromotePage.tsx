import { useState } from "react";
import { Zap, Star, Crown, ArrowRight } from "lucide-react";
import { kits } from "@/data/mockData";

const sellerKits = kits.filter((k) => k.producerId === "kxzma");

const plans = [
  {
    id: "boost",
    name: "Boost",
    price: 4.99,
    period: "/semaine",
    icon: Zap,
    color: "text-blue-400",
    borderColor: "border-blue-400/20",
    description: "Ton kit apparaît dans 'Sponsorisé' sur la marketplace",
    badge: "Sponsorisé",
    features: ["Visibilité accrue sur la marketplace", "Badge 'Sponsorisé' sur la card", "Stats de performance"],
  },
  {
    id: "featured",
    name: "Featured",
    price: 9.99,
    period: "/semaine",
    icon: Star,
    color: "text-puchk-orange",
    borderColor: "border-puchk-orange/30",
    description: "Ton kit apparaît dans le carrousel homepage",
    badge: "Featured",
    popular: true,
    features: ["Position premium en homepage", "Carrousel de la page d'accueil", "Badge 'Featured'", "Stats détaillées"],
  },
  {
    id: "spotlight",
    name: "Spotlight",
    price: 19.99,
    period: "/semaine",
    icon: Crown,
    color: "text-yellow-400",
    borderColor: "border-yellow-400/20",
    description: "Ton kit est le Kit de la semaine pendant 7 jours",
    badge: "Kit de la semaine",
    features: ["Position #1 absolue", "Section hero dédiée", "Badge 'Kit de la semaine'", "Notification à tous les abonnés", "Rapport de performance complet"],
  },
];

const durations = [
  { label: "1 semaine", multiplier: 1 },
  { label: "2 semaines", multiplier: 1.8 },
  { label: "1 mois", multiplier: 3.5 },
];

const PromotePage = () => {
  const [selectedPlan, setSelectedPlan] = useState("featured");
  const [selectedKit, setSelectedKit] = useState(sellerKits[0]?.id || "");
  const [selectedDuration, setSelectedDuration] = useState(0);

  const plan = plans.find((p) => p.id === selectedPlan)!;
  const totalPrice = (plan.price * durations[selectedDuration].multiplier).toFixed(2);

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Mise en avant</h1>
      <p className="text-secondary-puchk mb-8">Booste la visibilité de tes kits.</p>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {plans.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPlan(p.id)}
            className={`relative liquid-glass rounded-2xl p-6 text-left transition-all duration-300 ${
              selectedPlan === p.id ? `border-2 ${p.borderColor} shadow-[0_0_30px_rgba(255,107,26,0.1)]` : ""
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-puchk-orange text-white text-[10px] font-bold uppercase rounded-full">
                Populaire
              </div>
            )}
            <p.icon className={`w-8 h-8 ${p.color} mb-3`} />
            <h3 className="text-lg font-bold mb-1">{p.name}</h3>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-puchk-orange">{p.price}€</span>
              <span className="text-xs text-secondary-puchk">{p.period}</span>
            </div>
            <p className="text-sm text-secondary-puchk mb-4">{p.description}</p>
            <ul className="space-y-2">
              {p.features.map((f) => (
                <li key={f} className="text-xs text-secondary-puchk flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-puchk-orange" />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* Configuration */}
      <div className="liquid-glass rounded-2xl p-6 max-w-xl space-y-6">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-puchk block mb-2">Kit à promouvoir</label>
          <select
            value={selectedKit}
            onChange={(e) => setSelectedKit(e.target.value)}
            className="w-full h-11 px-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--glass-border)] text-sm outline-none focus:border-puchk-orange/40 input-focus appearance-none"
          >
            {sellerKits.map((k) => (
              <option key={k.id} value={k.id}>{k.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-puchk block mb-2">Durée</label>
          <div className="flex gap-2">
            {durations.map((d, i) => (
              <button
                key={d.label}
                onClick={() => setSelectedDuration(i)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all btn-press ${
                  selectedDuration === i ? "bg-puchk-orange text-white" : "liquid-glass text-secondary-puchk hover:text-white"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="section-divider" />

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-secondary-puchk">Total</div>
            <div className="text-3xl font-black text-puchk-orange">{totalPrice}€</div>
          </div>
          <button className="px-8 py-3 bg-puchk-orange text-white font-bold text-sm rounded-xl btn-orange-glow btn-press inline-flex items-center gap-2">
            Payer et activer <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotePage;
