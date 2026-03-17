import { useState } from "react";
import { Camera, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const socialFields = [
  { label: "Instagram", icon: "📷", placeholder: "https://instagram.com/..." },
  { label: "Twitter/X", icon: "🐦", placeholder: "https://x.com/..." },
  { label: "YouTube", icon: "🎥", placeholder: "https://youtube.com/..." },
  { label: "SoundCloud", icon: "☁️", placeholder: "https://soundcloud.com/..." },
  { label: "BeatStars", icon: "🎹", placeholder: "https://beatstars.com/..." },
  { label: "Genius", icon: "📝", placeholder: "https://genius.com/..." },
  { label: "Spotify", icon: "🎵", placeholder: "https://open.spotify.com/..." },
  { label: "TikTok", icon: "🎵", placeholder: "https://tiktok.com/@..." },
];

const SellerProfilePage = () => {
  const [name, setName] = useState("KXZMA");
  const [bio, setBio] = useState("Dark sounds from Paris. Trap & Phonk.");
  const [socials, setSocials] = useState<Record<string, string>>({});

  const updateSocial = (label: string, value: string) => {
    setSocials((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight">Éditer mon profil</h1>
        <Link to="/producer/kxzma" target="_blank" className="px-4 py-2 liquid-glass rounded-xl text-sm font-medium text-puchk-orange hover:bg-white/5 transition-all btn-press inline-flex items-center gap-2">
          Voir ma page publique <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Avatar & Banner */}
        <div className="liquid-glass rounded-2xl p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Avatar & Bannière</h2>
          <div className="flex items-center gap-6 mb-4">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-puchk-orange to-puchk-orange-hover flex items-center justify-center text-white text-2xl font-bold">KX</div>
              <button className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex-1 h-20 rounded-xl bg-[var(--bg-surface)] border border-[var(--glass-border)] border-dashed flex items-center justify-center text-xs text-secondary-puchk cursor-pointer hover:border-puchk-orange/30 transition-colors">
              <button className="px-3 py-1.5 liquid-glass rounded-lg text-xs font-medium hover:bg-white/10 transition-all">
                Glisser une bannière ou cliquer
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="liquid-glass rounded-2xl p-6 space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-2">Informations</h2>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-puchk block mb-1.5">Nom d'artiste</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--glass-border)] text-sm outline-none focus:border-puchk-orange/40 input-focus" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-puchk block mb-1.5">Bio</label>
            <div className="relative">
              <textarea value={bio} onChange={(e) => setBio(e.target.value.slice(0, 200))} rows={3} className="w-full px-4 py-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--glass-border)] text-sm outline-none focus:border-puchk-orange/40 input-focus resize-none" />
              <span className="absolute bottom-2 right-3 text-[10px] text-secondary-puchk">{bio.length}/200</span>
            </div>
          </div>
        </div>

        {/* Social Links (all 8) */}
        <div className="liquid-glass rounded-2xl p-6 space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-2">Réseaux sociaux</h2>
          {socialFields.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-lg w-6 text-center">{s.icon}</span>
              <input
                value={socials[s.label] || ""}
                onChange={(e) => updateSocial(s.label, e.target.value)}
                placeholder={s.placeholder}
                className="flex-1 h-10 px-3 bg-[var(--bg-surface)] rounded-lg border border-[var(--glass-border)] text-sm outline-none focus:border-puchk-orange/40 input-focus"
              />
            </div>
          ))}
        </div>

        {/* Payment */}
        <div className="liquid-glass rounded-2xl p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-2">Informations de paiement</h2>
          <p className="text-sm text-secondary-puchk mb-3">Les paiements sont gérés via Stripe Connect</p>
          <button className="px-4 py-2 border border-puchk-orange/30 text-puchk-orange text-sm font-bold rounded-xl hover:bg-puchk-orange/5 transition-all btn-press">
            Configurer Stripe Connect →
          </button>
        </div>

        <button className="w-full h-12 bg-puchk-orange text-white font-bold text-sm uppercase rounded-xl btn-orange-glow btn-press">
          Sauvegarder les modifications
        </button>
      </div>
    </div>
  );
};

export default SellerProfilePage;
