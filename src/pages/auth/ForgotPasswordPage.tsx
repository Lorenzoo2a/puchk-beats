import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center p-6">
        <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-12 h-12 text-puchk-success mx-auto mb-4" />
          <h1 className="text-xl font-extrabold mb-2">Email envoyé !</h1>
          <p className="text-sm text-white/50 mb-6">Vérifie ta boîte de réception.</p>
          <Link to="/auth/login" className="text-puchk-orange hover:underline text-sm">← Retour à la connexion</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center p-6">
      <div className="glass rounded-2xl p-8 max-w-md w-full space-y-5">
        <div><h1 className="text-2xl font-extrabold uppercase">Mot de passe oublié</h1><p className="text-sm text-white/40">On t'envoie un lien de réinitialisation.</p></div>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full h-12 px-4 bg-puchk-deep rounded-xl border border-[rgba(255,107,26,0.08)] text-sm text-white outline-none focus:border-puchk-orange/40 spring-transition" />
        <button onClick={() => setSent(true)} className="w-full h-12 bg-puchk-orange text-white font-bold text-sm uppercase rounded-xl hover:bg-puchk-orange-hover spring-transition">Envoyer le lien</button>
        <Link to="/auth/login" className="block text-center text-sm text-puchk-orange hover:underline">← Retour à la connexion</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
