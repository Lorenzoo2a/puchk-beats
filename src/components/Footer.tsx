import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer ref={ref} className="bg-puchk-deep border-t border-[var(--glass-border)] mt-auto">
      <div className="section-divider" />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-5 gap-10"
        >
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-puchk-orange flex items-center justify-center shadow-[0_0_12px_rgba(255,107,26,0.3)]">
                <span className="text-white font-extrabold text-sm">P</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight">PUCH<span className="text-puchk-orange">K</span></span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">La marketplace premium de drumkits pour beatmakers et producteurs.</p>
            
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ton@email.com"
                className="flex-1 h-10 px-4 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-puchk-orange/30 transition-colors"
              />
              <button className="px-4 h-10 bg-puchk-orange text-white text-xs font-bold rounded-xl hover:bg-puchk-orange-hover transition-colors btn-press">
                S'inscrire
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Marketplace</h4>
            <ul className="space-y-2.5">
              <li><Link to="/marketplace" className="text-sm text-white/50 hover:text-puchk-orange transition-colors">Explorer</Link></li>
              <li><Link to="/charts" className="text-sm text-white/50 hover:text-puchk-orange transition-colors">Charts</Link></li>
              <li><Link to="/marketplace" className="text-sm text-white/50 hover:text-puchk-orange transition-colors">Nouveautés</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Producteurs</h4>
            <ul className="space-y-2.5">
              <li><Link to="/dashboard/kits/new" className="text-sm text-white/50 hover:text-puchk-orange transition-colors">Vendre</Link></li>
              <li><Link to="/dashboard" className="text-sm text-white/50 hover:text-puchk-orange transition-colors">Dashboard</Link></li>
              <li><Link to="/dashboard/analytics" className="text-sm text-white/50 hover:text-puchk-orange transition-colors">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Légal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/terms" className="text-sm text-white/50 hover:text-puchk-orange transition-colors">CGV</Link></li>
              <li><Link to="/legal" className="text-sm text-white/50 hover:text-puchk-orange transition-colors">Mentions légales</Link></li>
              <li><Link to="/privacy" className="text-sm text-white/50 hover:text-puchk-orange transition-colors">Confidentialité</Link></li>
            </ul>
          </div>
        </motion.div>
      </div>

      <div className="section-divider" />
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/20">© 2026 PUCHK. Tous droits réservés.</p>
        <div className="flex items-center gap-5">
          {["Instagram", "Twitter", "Discord", "YouTube"].map((s) => (
            <a key={s} href="#" className="text-xs text-white/20 hover:text-puchk-orange transition-colors">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
