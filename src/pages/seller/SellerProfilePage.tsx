import { useState } from "react";
import { Camera } from "lucide-react";

const SellerProfilePage = () => {
  const [name, setName] = useState("KXZMA");
  const [bio, setBio] = useState("Dark sounds from Paris. Trap & Phonk.");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [soundcloud, setSoundcloud] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Éditer mon profil</h1>
      <div className="space-y-6 max-w-2xl">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Avatar & Bannière</h2>
          <div className="flex items-center gap-6 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-puchk-orange to-puchk-orange-hover flex items-center justify-center text-white text-2xl font-bold">KX</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-puchk-surface border border-[rgba(255,107,26,0.2)] flex items-center justify-center"><Camera className="w-3.5 h-3.5 text-white/60" /></button>
            </div>
            <div className="flex-1 h-20 rounded-xl bg-puchk-deep border border-[rgba(255,107,26,0.08)] flex items-center justify-center text-xs text-white/30">
              <button className="px-3 py-1.5 glass rounded-lg text-xs font-medium hover:bg-white/10 spring-transition">Changer la bannière</button>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-2">Informations</h2>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Nom d'artiste</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Bio</label>
            <div className="relative">
              <textarea value={bio} onChange={(e) => setBio(e.target.value.slice(0, 200))} rows={3} className="w-full px-4 py-3 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition resize-none" />
              <span className="absolute bottom-2 right-3 text-[10px] text-white/20">{bio.length}/200</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-2">Réseaux sociaux</h2>
          {[
            { label: "Instagram", value: instagram, set: setInstagram, icon: "📷" },
            { label: "Twitter/X", value: twitter, set: setTwitter, icon: "🐦" },
            { label: "YouTube", value: youtube, set: setYoutube, icon: "🎥" },
            { label: "SoundCloud", value: soundcloud, set: setSoundcloud, icon: "☁️" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-lg">{s.icon}</span>
              <input value={s.value} onChange={(e) => s.set(e.target.value)} placeholder={`lien ${s.label}`} className="flex-1 h-10 px-3 bg-puchk-deep rounded-lg border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-2">Informations de paiement</h2>
          <p className="text-sm text-white/50 mb-3">Les paiements sont gérés via Stripe Connect</p>
          <button className="px-4 py-2 border border-puchk-orange/30 text-puchk-orange text-sm font-bold rounded-xl hover:bg-puchk-orange/5 spring-transition">
            Configurer Stripe Connect →
          </button>
        </div>

        <button className="w-full h-12 bg-puchk-orange text-white font-bold text-sm uppercase rounded-xl hover:bg-puchk-orange-hover spring-transition">
          Sauvegarder les modifications
        </button>
      </div>
    </div>
  );
};

export default SellerProfilePage;
