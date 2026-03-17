import { Producer } from "@/data/mockData";

const badgeStyles: Record<string, string> = {
  "Top Seller": "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  "Verified": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Rising": "bg-puchk-orange/15 text-puchk-orange border-puchk-orange/20",
  "Fan Favorite": "bg-purple-500/15 text-purple-400 border-purple-500/20",
  "New": "bg-green-500/15 text-green-400 border-green-500/20",
};

const ProducerCard = ({ producer }: { producer: Producer }) => (
  <div
    className="bg-puchk-surface rounded-2xl p-5 border border-[rgba(255,107,26,0.08)] hover:border-[rgba(255,107,26,0.2)] spring-transition text-center group"
    style={{
      background: `linear-gradient(135deg, ${producer.genreColor}08, #1C1C1C 50%)`,
    }}
  >
    {/* Avatar */}
    <div
      className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-extrabold text-white border-2 ${producer.verified ? "shadow-[0_0_12px_rgba(255,107,26,0.3)]" : ""}`}
      style={{
        borderColor: producer.verified ? producer.genreColor + "60" : "rgba(255,255,255,0.1)",
        background: `linear-gradient(135deg, ${producer.genreColor}40, ${producer.genreColor}15)`,
      }}
    >
      {producer.name.charAt(0)}
    </div>

    <h4 className="text-sm font-bold text-white mb-1">{producer.name}</h4>
    <p className="text-xs text-white/40 mb-3">{producer.sales.toLocaleString()} ventes</p>

    {/* Badges */}
    <div className="flex flex-wrap justify-center gap-1.5">
      {producer.verified && (
        <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${badgeStyles["Verified"]}`}>
          Verified
        </span>
      )}
      {producer.badge && (
        <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${badgeStyles[producer.badge] || ""}`}>
          {producer.badge}
        </span>
      )}
    </div>
  </div>
);

export default ProducerCard;
