import { useState, useRef } from "react";
import { Download, Copy, Share2, Check } from "lucide-react";
import { kits } from "@/data/mockData";
import KitCover from "@/components/KitCover";

const sellerKits = kits.filter((k) => k.producerId === "kxzma");

const ECardPage = () => {
  const [selectedKit, setSelectedKit] = useState(sellerKits[0]?.id || "");
  const [copied, setCopied] = useState(false);
  const kit = sellerKits.find((k) => k.id === selectedKit) || sellerKits[0];
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://puchk.com/kit/${kit.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">E-Cards</h1>
      <p className="text-secondary-puchk mb-8">Génère des visuels pour partager tes kits sur les réseaux.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div>
          <div
            ref={cardRef}
            className="relative w-full max-w-[400px] mx-auto aspect-square rounded-2xl overflow-hidden"
            style={{ background: "#0D0D0D" }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,107,26,0.12)_0%,transparent_60%)]" />

            {/* Cover */}
            <div className="absolute inset-x-8 top-8 bottom-24 rounded-xl overflow-hidden">
              <KitCover genre={kit.genre} title={kit.name} producer={kit.producer} aspectRatio="1/1" />
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-black text-white mb-1">{kit.name}</h3>
              <p className="text-sm text-white/50 mb-2">by {kit.producer}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-puchk-orange">{kit.price}€</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-puchk-orange flex items-center justify-center">
                    <span className="text-white text-[8px] font-extrabold">P</span>
                  </div>
                  <span className="text-[10px] text-white/40 font-bold tracking-wider">PUCHK</span>
                </div>
              </div>
            </div>

            {/* Puchk Tool badge (mock) */}
            <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-puchk-orange/20 text-[9px] font-bold text-puchk-orange border border-puchk-orange/20">
              Créé avec Puchk Tool
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-puchk block mb-2">Choisir un kit</label>
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

          <div className="space-y-3">
            <button className="w-full h-12 bg-puchk-orange text-white font-bold text-sm rounded-xl btn-orange-glow btn-press flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Télécharger la e-card (PNG)
            </button>
            <button onClick={handleCopyLink} className="w-full h-12 liquid-glass font-medium text-sm rounded-xl hover:text-puchk-orange transition-all btn-press flex items-center justify-center gap-2">
              {copied ? <><Check className="w-4 h-4 text-green-400" /> Lien copié !</> : <><Copy className="w-4 h-4" /> Copier le lien du kit</>}
            </button>
          </div>

          <div className="liquid-glass rounded-xl p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary-puchk mb-2">Conseils</h3>
            <ul className="space-y-2 text-sm text-secondary-puchk">
              <li>• Format 1080×1080, idéal pour Instagram</li>
              <li>• Le badge "Créé avec Puchk Tool" apparaît si ton kit a été créé avec l'outil</li>
              <li>• Partage le lien direct vers ton kit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECardPage;
