import { Link, useLocation, Outlet } from "react-router-dom";
import { BarChart3, Package, Users, ShoppingBag, Star, DollarSign, Flag, Settings } from "lucide-react";

const links = [
  { icon: BarChart3, label: "Dashboard", path: "/admin" },
  { icon: Package, label: "Modération kits", path: "/admin/products" },
  { icon: Users, label: "Utilisateurs", path: "/admin/users" },
  { icon: ShoppingBag, label: "Commandes", path: "/admin/orders" },
  { icon: Star, label: "Mises en avant", path: "/admin/featured" },
  { icon: DollarSign, label: "Commissions", path: "/admin/commissions" },
  { icon: Flag, label: "Signalements", path: "/admin/reports" },
  { icon: Settings, label: "Paramètres", path: "/admin/settings" },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen pt-16 flex">
      <aside className="hidden lg:flex w-60 flex-shrink-0 bg-puchk-deep border-r border-[rgba(255,107,26,0.08)] flex-col fixed top-16 bottom-0 left-0 z-40">
        <div className="p-4 border-b border-[rgba(255,107,26,0.08)]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-puchk-orange flex items-center justify-center shadow-[0_0_10px_rgba(255,107,26,0.3)]">
              <span className="text-white font-extrabold text-xs">P</span>
            </div>
            <div>
              <span className="text-sm font-bold">PUCHK</span>
              <span className="block text-[9px] text-puchk-orange/60 uppercase tracking-widest">Admin Panel</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm spring-transition relative ${
                  active ? "bg-puchk-orange/10 text-puchk-orange font-bold" : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-puchk-orange rounded-full" />}
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 lg:ml-60 p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
