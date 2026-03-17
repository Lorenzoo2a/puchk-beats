import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-puchk-deep border-t border-[rgba(255,107,26,0.08)] mt-auto">
    <div className="section-divider" />
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <Link to="/" className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-puchk-orange flex items-center justify-center shadow-[0_0_12px_rgba(255,107,26,0.3)]">
            <span className="text-white font-extrabold text-sm">P</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight">PUCH<span className="text-puchk-orange">K</span></span>
        </Link>
        <p className="text-sm text-white/40 leading-relaxed">La marketplace premium de drumkits pour beatmakers et producteurs.</p>
      </div>
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Marketplace</h4>
        <ul className="space-y-2">
          <li><Link to="/marketplace" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">Explorer</Link></li>
          <li><Link to="/charts" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">Charts</Link></li>
          <li><Link to="/marketplace" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">Nouveautés</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Producteurs</h4>
        <ul className="space-y-2">
          <li><Link to="/dashboard/kits/new" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">Vendre</Link></li>
          <li><Link to="/dashboard" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">Dashboard</Link></li>
          <li><Link to="/dashboard/analytics" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">Analytics</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-puchk-orange mb-4">Légal</h4>
        <ul className="space-y-2">
          <li><Link to="/terms" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">CGV</Link></li>
          <li><Link to="/legal" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">Mentions légales</Link></li>
          <li><Link to="/privacy" className="text-sm text-white/50 hover:text-puchk-orange spring-transition">Confidentialité</Link></li>
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
