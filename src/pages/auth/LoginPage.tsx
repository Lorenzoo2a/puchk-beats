import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen pt-16 flex">
      <div className="hidden lg:flex w-1/2 bg-puchk-deep items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5"><span className="text-[300px] font-black text-puchk-orange">P</span></div>
        <h2 className="text-5xl font-extrabold text-white/80 relative z-10">Bienvenue.</h2>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md glass rounded-2xl p-8 space-y-6">
          <div><h1 className="text-2xl font-extrabold uppercase">Connexion</h1><p className="text-sm text-white/40">Content de te revoir.</p></div>
          <div className="space-y-3">
            {[{ label: "Continuer avec Google", icon: "G" }, { label: "Continuer avec Discord", icon: "D" }, { label: "Continuer avec Apple", icon: "" }].map((o) => (
              <button key={o.label} className="w-full h-12 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 spring-transition flex items-center justify-center gap-2">
                <span className="font-bold">{o.icon}</span> {o.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3"><div className="flex-1 h-px bg-white/10" /><span className="text-xs text-white/30">ou</span><div className="flex-1 h-px bg-white/10" /></div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full h-12 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 focus:shadow-[0_0_15px_rgba(255,107,26,0.1)] spring-transition" />
          <div className="relative">
            <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="w-full h-12 px-4 pr-12 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2">{showPw ? <EyeOff className="w-4 h-4 text-white/30" /> : <Eye className="w-4 h-4 text-white/30" />}</button>
          </div>
          <div className="text-right"><Link to="/auth/forgot-password" className="text-xs text-puchk-orange hover:underline">Mot de passe oublié ?</Link></div>
          <button className="w-full h-12 bg-puchk-orange text-white font-bold text-sm uppercase rounded-xl hover:bg-puchk-orange-hover spring-transition">Se connecter</button>
          <p className="text-center text-sm text-white/40">Pas encore de compte ? <Link to="/auth/register" className="text-puchk-orange hover:underline">Inscris-toi →</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
