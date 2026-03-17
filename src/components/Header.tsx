import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, ShoppingBag, ChevronDown, Sun, Moon, Wrench, User, DollarSign, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useView, ViewMode } from "@/contexts/ViewContext";
import { useTheme } from "@/contexts/ThemeContext";

const navByView: Record<ViewMode, { label: string; path: string; external?: boolean }[]> = {
  buyer: [
    { label: "Marketplace", path: "/marketplace" },
    { label: "Producteurs", path: "/producers" },
    { label: "Charts", path: "/charts" },
    { label: "Puchk Tool", path: "https://tool.puchk.com", external: true },
    { label: "Mon Compte", path: "/library" },
  ],
  seller: [
    { label: "Marketplace", path: "/marketplace" },
    { label: "Producteurs", path: "/producers" },
    { label: "Charts", path: "/charts" },
    { label: "Puchk Tool", path: "https://tool.puchk.com", external: true },
    { label: "Dashboard", path: "/dashboard" },
  ],
  admin: [
    { label: "Marketplace", path: "/marketplace" },
    { label: "Producteurs", path: "/producers" },
    { label: "Charts", path: "/charts" },
    { label: "Puchk Tool", path: "https://tool.puchk.com", external: true },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Admin", path: "/admin" },
  ],
};

const viewLabels: { key: ViewMode; Icon: typeof User; label: string }[] = [
  { key: "buyer", Icon: User, label: "Acheteur" },
  { key: "seller", Icon: DollarSign, label: "Vendeur" },
  { key: "admin", Icon: Settings, label: "Admin" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeRotating, setThemeRotating] = useState(false);
  const location = useLocation();
  const { view, setView } = useView();
  const { theme, toggleTheme } = useTheme();
  const navLinks = navByView[view];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setScrollProgress(Math.min(y / 200, 1));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/marketplace" && location.pathname === "/") return true;
    return location.pathname.startsWith(path);
  };

  const handleThemeToggle = () => {
    setThemeRotating(true);
    toggleTheme();
    setTimeout(() => setThemeRotating(false), 500);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 transition-all duration-500"
      style={{
        background: scrollProgress > 0
          ? `rgba(13,13,13,${0.4 + scrollProgress * 0.5})`
          : "rgba(255,255,255,0.03)",
        backdropFilter: `blur(${12 + scrollProgress * 28}px)`,
        WebkitBackdropFilter: `blur(${12 + scrollProgress * 28}px)`,
        borderBottom: `1px solid rgba(255,255,255,${0.04 + scrollProgress * 0.04})`,
      }}
    >
      {/* Reflet lumineux */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

      <Link to="/" className="flex items-center gap-2.5 mr-8">
        <div className="w-9 h-9 rounded-lg bg-puchk-orange flex items-center justify-center shadow-[0_0_15px_rgba(255,107,26,0.4)]">
          <span className="text-white font-extrabold text-lg">P</span>
        </div>
        <span className="text-xl font-extrabold tracking-tight text-white">
          PUCH<span className="text-puchk-orange">K</span>
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => 
          link.external ? (
            <a
              key={link.path}
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-puchk-orange hover:text-puchk-orange-hover spring-transition flex items-center gap-1"
            >
              🛠 {link.label}
            </a>
          ) : (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium relative pb-1 spring-transition ${
                isActive(link.path) ? "text-puchk-orange" : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-puchk-orange rounded-full" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
            </Link>
          )
        )}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-xl hover:bg-white/5 spring-transition btn-press"
          title={theme === "dark" ? "Mode clair" : "Mode sombre"}
        >
          <div className={themeRotating ? "animate-theme-rotate" : ""}>
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-white/60" />
            ) : (
              <Moon className="w-5 h-5 text-white/60" />
            )}
          </div>
        </button>

        {/* View Switcher */}
        <div className="hidden md:flex items-center gap-0.5 bg-white/5 rounded-xl p-0.5">
          {viewLabels.map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold spring-transition btn-press ${
                view === v.key
                  ? "bg-puchk-orange text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {v.emoji} {v.label}
            </button>
          ))}
        </div>

        <Link to="/marketplace" className="p-2 rounded-xl hover:bg-white/5 spring-transition">
          <Search className="w-5 h-5 text-white/60" />
        </Link>
        <button className="relative p-2 rounded-xl hover:bg-white/5 spring-transition group">
          <Bell className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <Link to="/cart" className="relative p-2 rounded-xl hover:bg-white/5 spring-transition group">
          <ShoppingBag className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors" />
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-puchk-orange text-[9px] font-bold text-white flex items-center justify-center">2</div>
        </Link>

        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 spring-transition group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-puchk-orange to-puchk-orange-hover flex items-center justify-center group-hover:animate-ring-pulse transition-shadow">
              <span className="text-white text-xs font-bold">KX</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/40" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute right-0 top-12 w-56 liquid-glass rounded-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              >
                <div className="px-3 py-2 border-b border-white/5 mb-1">
                  <p className="text-sm font-bold text-white">KXZMA</p>
                  <p className="text-[11px] text-white/40">kxzma@puchk.io</p>
                </div>
                <Link to="/dashboard" className="block px-3 py-2 text-sm text-white/70 hover:text-puchk-orange hover:bg-white/[0.08] rounded-lg spring-transition" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/library" className="block px-3 py-2 text-sm text-white/70 hover:text-puchk-orange hover:bg-white/[0.08] rounded-lg spring-transition" onClick={() => setMenuOpen(false)}>Mon Compte</Link>
                <Link to="/marketplace" className="block px-3 py-2 text-sm text-white/70 hover:text-puchk-orange hover:bg-white/[0.08] rounded-lg spring-transition" onClick={() => setMenuOpen(false)}>Marketplace</Link>
                {view === "admin" && (
                  <Link to="/admin" className="block px-3 py-2 text-sm text-white/70 hover:text-puchk-orange hover:bg-white/[0.08] rounded-lg spring-transition" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
                )}
                <div className="border-t border-white/5 mt-1 pt-1">
                  <Link to="/auth/login" className="w-full text-left block px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg spring-transition" onClick={() => setMenuOpen(false)}>
                    Déconnexion
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
