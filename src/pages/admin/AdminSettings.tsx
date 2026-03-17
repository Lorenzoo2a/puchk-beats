import { useState } from "react";
import { Download, ChevronUp, ChevronDown, Eye, EyeOff, GripVertical } from "lucide-react";

interface CarouselSlide {
  id: string;
  title: string;
  description: string;
  type: string;
  enabled: boolean;
}

const AdminSettings = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>([
    { id: "kit-week", title: "Kit de la semaine", description: "Mise en avant du kit de la semaine", type: "kit", enabled: true },
    { id: "puchk-tool", title: "Puchk Tool", description: "CTA vers l'outil de création de drumkits", type: "tool", enabled: true },
    { id: "producers", title: "Rejoindre la communauté", description: "CTA pour attirer les vendeurs", type: "producers", enabled: true },
    { id: "promo", title: "Kit en avant", description: "Mise en avant promotionnelle", type: "promo", enabled: true },
  ]);

  const moveSlide = (index: number, dir: -1 | 1) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= slides.length) return;
    const newSlides = [...slides];
    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
    setSlides(newSlides);
  };

  const toggleSlide = (index: number) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], enabled: !newSlides[index].enabled };
    setSlides(newSlides);
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Paramètres</h1>
      <div className="space-y-6 max-w-2xl">
        {/* Site info */}
        <div className="liquid-glass rounded-2xl p-6 space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-2">Informations du site</h2>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-puchk block mb-1.5">Nom du site</label>
            <input defaultValue="PUCHK" className="w-full h-11 px-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--glass-border)] text-sm outline-none focus:border-puchk-orange/40 input-focus" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-puchk block mb-1.5">Description</label>
            <textarea defaultValue="La marketplace premium de drumkits" rows={2} className="w-full px-4 py-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--glass-border)] text-sm outline-none resize-none focus:border-puchk-orange/40 input-focus" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-puchk block mb-1.5">Email contact</label>
            <input defaultValue="contact@puchk.io" className="w-full h-11 px-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--glass-border)] text-sm outline-none focus:border-puchk-orange/40 input-focus" />
          </div>
          <button className="w-full h-10 bg-puchk-orange text-white rounded-xl text-sm font-bold btn-orange-glow btn-press">Sauvegarder</button>
        </div>

        {/* Carousel Editor */}
        <div className="liquid-glass rounded-2xl p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Carrousel Hero</h2>
          <p className="text-sm text-secondary-puchk mb-4">Réorganise, active ou désactive les slides du carrousel de la page d'accueil.</p>
          <div className="space-y-2">
            {slides.map((slide, i) => (
              <div key={slide.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${slide.enabled ? "border-[var(--glass-border)] bg-white/[0.02]" : "border-white/[0.04] opacity-50"}`}>
                <GripVertical className="w-4 h-4 text-white/20 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold">{slide.title}</div>
                  <div className="text-[10px] text-secondary-puchk">{slide.description}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveSlide(i, -1)} disabled={i === 0} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-20">
                    <ChevronUp className="w-4 h-4 text-white/40" />
                  </button>
                  <button onClick={() => moveSlide(i, 1)} disabled={i === slides.length - 1} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-20">
                    <ChevronDown className="w-4 h-4 text-white/40" />
                  </button>
                  <button onClick={() => toggleSlide(i)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                    {slide.enabled ? <Eye className="w-4 h-4 text-puchk-orange" /> : <EyeOff className="w-4 h-4 text-white/20" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export */}
        <div className="liquid-glass rounded-2xl p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Export de données</h2>
          <div className="space-y-3">
            {["Exporter les utilisateurs (CSV)", "Exporter les ventes (CSV)", "Exporter les commandes (CSV)"].map((label) => (
              <button key={label} className="w-full h-11 liquid-glass rounded-xl text-sm font-medium text-secondary-puchk hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 btn-press">
                <Download className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
