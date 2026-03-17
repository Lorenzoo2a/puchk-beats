import { useState } from "react";
import { Camera } from "lucide-react";

const SettingsPage = () => {
  const [name, setName] = useState("KXZMA");
  const [username, setUsername] = useState("kxzma");
  const [email, setEmail] = useState("kxzma@puchk.io");
  const [sellerMode, setSellerMode] = useState(true);

  return (
    <div>
      <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-8">Paramètres du compte</h1>
      <div className="space-y-6 max-w-2xl">
        {/* Profile */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Profil</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-puchk-orange to-puchk-orange-hover flex items-center justify-center text-white text-lg font-bold">KX</div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-puchk-surface border border-[rgba(255,107,26,0.2)] flex items-center justify-center">
                <Camera className="w-3 h-3 text-white/60" />
              </button>
            </div>
            <div className="text-sm text-white/40">Change ta photo de profil</div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Nom</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 focus:shadow-[0_0_15px_rgba(255,107,26,0.1)] spring-transition" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1.5">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Mot de passe</h2>
          <div className="space-y-4">
            <input type="password" placeholder="Ancien mot de passe" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white placeholder:text-white/30 outline-none focus:border-puchk-orange/40 spring-transition" />
            <input type="password" placeholder="Nouveau mot de passe" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white placeholder:text-white/30 outline-none focus:border-puchk-orange/40 spring-transition" />
            <input type="password" placeholder="Confirmer le mot de passe" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white placeholder:text-white/30 outline-none focus:border-puchk-orange/40 spring-transition" />
          </div>
        </div>

        {/* Seller mode */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Passer vendeur</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Activer le mode vendeur</p>
              <p className="text-xs text-white/40">Publie et vends tes drumkits sur PUCHK</p>
            </div>
            <button onClick={() => setSellerMode(!sellerMode)} className={`w-12 h-6 rounded-full spring-transition relative ${sellerMode ? "bg-puchk-orange" : "bg-white/10"}`}>
              <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 spring-transition ${sellerMode ? "left-6" : "left-0.5"}`} />
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="glass rounded-2xl p-6 border border-red-500/10">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-4">Zone danger</h2>
          <button className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/10 spring-transition">
            Supprimer mon compte
          </button>
        </div>

        <button className="w-full h-12 bg-puchk-orange text-white font-bold text-sm uppercase rounded-xl hover:bg-puchk-orange-hover spring-transition">
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
