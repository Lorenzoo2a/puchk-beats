import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-puchk-deep border-t border-[rgba(255,107,26,0.08)] mt-auto">
    <div className="section-divider" />
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Logo */}
      <div>
        <Link to="/" className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-puchk-orange flex items-center justify-center shadow-[0_0_12px_rgba(255,107,26,0.3)]">
            <span className="text-white font-extrabold text-sm">P</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight">
            PUCH<span className="text-puchk-orange">K</span>
          </span>
        </Link>
        <p className="text-sm text-white/40 leading-relaxed">
          La marketplace premium de drumkits pour beatmakers et producteurs.
        </p>
      </div>

      {/* Marketplace */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Marketplace</h4>
        <ul className="space-y-2">
          {["Explorer", "Charts", "Nouveautés"].map((l) => (
            <li key={l}><Link to="/" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">{l}</Link></li>
          ))}
        </ul>
      </div>

      {/* Producteurs */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Producteurs</h4>
        <ul className="space-y-2">
          {["Vendre", "Dashboard", "Analytics"].map((l) => (
            <li key={l}><Link to="/dashboard" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">{l}</Link></li>
          ))}
        </ul>
      </div>

      {/* Légal */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Légal</h4>
        <ul className="space-y-2">
          {["CGV", "Mentions légales", "Confidentialité"].map((l) => (
            <li key={l}><a href="#" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">{l}</a></li>
          ))}
        </ul>
      </div>
    </div>

    <div className="section-divider" />
    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-white/30">© 2026 PUCHK. Tous droits réservés.</p>
      <div className="flex items-center gap-4">
        {["Instagram", "Twitter", "Discord", "YouTube"].map((s) => (
          <a key={s} href="#" className="text-xs text-white/30 hover:text-puchk-orange spring-transition">{s}</a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
