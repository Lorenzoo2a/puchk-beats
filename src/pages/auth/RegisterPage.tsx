import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Headphones, Music } from "lucide-react";

const RegisterPage = () => {
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen pt-16 flex">
      <div className="hidden lg:flex w-1/2 bg-puchk-deep items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5"><span className="text-[300px] font-black text-puchk-orange">P</span></div>
        <h2 className="text-5xl font-extrabold text-white/80 relative z-10">Rejoins-nous.</h2>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md glass rounded-2xl p-8 space-y-5">
          <div><h1 className="text-2xl font-extrabold uppercase">Inscription</h1><p className="text-sm text-white/40">Rejoins la communauté.</p></div>
          <div className="space-y-3">
            {["Continuer avec Google", "Continuer avec Discord", "Continuer avec Apple"].map((l) => (
              <button key={l} className="w-full h-11 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 spring-transition">{l}</button>
            ))}
          </div>
          <div className="flex items-center gap-3"><div className="flex-1 h-px bg-white/10" /><span className="text-xs text-white/30">ou</span><div className="flex-1 h-px bg-white/10" /></div>
          <input placeholder="Email" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
          <input placeholder="Username" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
          <div className="relative">
            <input type={showPw ? "text" : "password"} placeholder="Mot de passe" className="w-full h-11 px-4 pr-12 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2">{showPw ? <EyeOff className="w-4 h-4 text-white/30" /> : <Eye className="w-4 h-4 text-white/30" />}</button>
          </div>
          <input type="password" placeholder="Confirmer le mot de passe" className="w-full h-11 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setRole("buyer")} className={`p-4 rounded-xl border text-center spring-transition ${role === "buyer" ? "border-puchk-orange bg-puchk-orange/5" : "border-white/10 hover:border-white/20"}`}>
              <Headphones className="w-6 h-6 mx-auto mb-1 text-puchk-orange" /><p className="text-xs font-bold">Acheter des kits</p>
            </button>
            <button onClick={() => setRole("seller")} className={`p-4 rounded-xl border text-center spring-transition ${role === "seller" ? "border-puchk-orange bg-puchk-orange/5" : "border-white/10 hover:border-white/20"}`}>
              <Music className="w-6 h-6 mx-auto mb-1 text-puchk-orange" /><p className="text-xs font-bold">Vendre mes kits</p>
            </button>
          </div>
          <label className="flex items-center gap-2 text-xs text-white/50"><input type="checkbox" className="accent-[#FF6B1A]" /> J'accepte les <Link to="/terms" className="text-puchk-orange underline">CGV</Link> et la <Link to="/privacy" className="text-puchk-orange underline">politique de confidentialité</Link></label>
          <button className="w-full h-12 bg-puchk-orange text-white font-bold text-sm uppercase rounded-xl hover:bg-puchk-orange-hover spring-transition">Créer mon compte</button>
          <p className="text-center text-sm text-white/40">Déjà un compte ? <Link to="/auth/login" className="text-puchk-orange hover:underline">Connecte-toi →</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
