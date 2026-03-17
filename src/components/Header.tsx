import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, ShoppingBag, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Marketplace", path: "/" },
  { label: "Producteurs", path: "/#producers" },
  { label: "Charts", path: "/#charts" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#0D0D0D]/90 backdrop-blur-xl border-[rgba(255,107,26,0.12)]"
          : "bg-transparent border-transparent"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 mr-8">
        <div className="w-9 h-9 rounded-lg bg-puchk-orange flex items-center justify-center shadow-[0_0_15px_rgba(255,107,26,0.4)]">
          <span className="text-white font-extrabold text-lg">P</span>
        </div>
        <span className="text-xl font-extrabold tracking-tight text-white">
          PUCH<span className="text-puchk-orange">K</span>
        </span>
      </Link>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium relative pb-1 spring-transition ${
              location.pathname === link.path
                ? "text-puchk-orange"
                : "text-white/60 hover:text-white"
            }`}
          >
            {link.label}
            {location.pathname === link.path && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-puchk-orange rounded-full"
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className="ml-auto flex items-center gap-3">
        <button className="p-2 rounded-xl hover:bg-white/5 spring-transition">
          <Search className="w-5 h-5 text-white/60" />
        </button>
        <button className="relative p-2 rounded-xl hover:bg-white/5 spring-transition">
          <Bell className="w-5 h-5 text-white/60" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <button className="relative p-2 rounded-xl hover:bg-white/5 spring-transition">
          <ShoppingBag className="w-5 h-5 text-white/60" />
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-puchk-orange text-[9px] font-bold text-white flex items-center justify-center">
            2
          </div>
        </button>

        {/* Avatar dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 spring-transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-puchk-orange to-puchk-orange-hover flex items-center justify-center">
              <span className="text-white text-xs font-bold">KX</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/40" />
          </button>

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-12 w-56 glass rounded-xl p-2 shadow-xl"
            >
              <div className="px-3 py-2 border-b border-white/5 mb-1">
                <p className="text-sm font-bold text-white">KXZMA</p>
                <p className="text-[11px] text-white/40">kxzma@puchk.io</p>
              </div>
              <Link to="/dashboard" className="block px-3 py-2 text-sm text-white/70 hover:text-puchk-orange hover:bg-white/5 rounded-lg spring-transition" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/" className="block px-3 py-2 text-sm text-white/70 hover:text-puchk-orange hover:bg-white/5 rounded-lg spring-transition" onClick={() => setMenuOpen(false)}>
                Marketplace
              </Link>
              <div className="border-t border-white/5 mt-1 pt-1">
                <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg spring-transition">
                  Déconnexion
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
