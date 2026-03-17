import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalPlayer from "@/components/GlobalPlayer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import HomePage from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import MarketplacePage from "./pages/MarketplacePage";
import CartPage from "./pages/CartPage";
import ChartsPage from "./pages/ChartsPage";
import ProducersPage from "./pages/ProducersPage";
import ProducerProfilePage from "./pages/ProducerProfilePage";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { Kit } from "@/data/mockData";
import { AnimatePresence, motion } from "framer-motion";
import { ViewProvider } from "@/contexts/ViewContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Buyer pages
import BuyerLayout from "@/layouts/BuyerLayout";
import LibraryPage from "@/pages/buyer/LibraryPage";
import OrdersPage from "@/pages/buyer/OrdersPage";
import FavoritesPage from "@/pages/buyer/FavoritesPage";
import SettingsPage from "@/pages/buyer/SettingsPage";

// Seller pages
import SellerLayout from "@/layouts/SellerLayout";
import DashboardOverview from "@/pages/seller/DashboardOverview";
import SellerKitsPage from "@/pages/seller/SellerKitsPage";
import PublishKitPage from "@/pages/seller/PublishKitPage";
import SellerSalesPage from "@/pages/seller/SellerSalesPage";
import AnalyticsPage from "@/pages/seller/AnalyticsPage";
import PromosPage from "@/pages/seller/PromosPage";
import SellerProfilePage from "@/pages/seller/SellerProfilePage";
import PromotePage from "@/pages/seller/PromotePage";
import ECardPage from "@/pages/seller/ECardPage";

// Admin pages
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminModeration from "@/pages/admin/AdminModeration";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminUserDetail from "@/pages/admin/AdminUserDetail";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminFeatured from "@/pages/admin/AdminFeatured";
import AdminCommissions from "@/pages/admin/AdminCommissions";
import AdminReports from "@/pages/admin/AdminReports";
import AdminSettings from "@/pages/admin/AdminSettings";

// Auth pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

// Legal pages
import TermsPage from "@/pages/legal/TermsPage";
import LegalPage from "@/pages/legal/LegalPage";
import PrivacyPage from "@/pages/legal/PrivacyPage";

const queryClient = new QueryClient();

/* Scroll to top on page change */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppContent = () => {
  const [playingKit, setPlayingKit] = useState<Kit | null>(null);
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage onPlay={setPlayingKit} />} />
            <Route path="/marketplace" element={<MarketplacePage onPlay={setPlayingKit} />} />
            <Route path="/kit/:id" element={<ProductPage onPlay={setPlayingKit} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/charts" element={<ChartsPage onPlay={setPlayingKit} />} />
            <Route path="/producers" element={<ProducersPage />} />
            <Route path="/producer/:username" element={<ProducerProfilePage onPlay={setPlayingKit} />} />

            {/* Buyer */}
            <Route path="/library" element={<BuyerLayout />}>
              <Route index element={<LibraryPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="favorites" element={<FavoritesPage onPlay={setPlayingKit} />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Seller */}
            <Route path="/dashboard" element={<SellerLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="kits" element={<SellerKitsPage />} />
              <Route path="kits/new" element={<PublishKitPage />} />
              <Route path="sales" element={<SellerSalesPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="promos" element={<PromosPage />} />
              <Route path="promote" element={<PromotePage />} />
              <Route path="ecards" element={<ECardPage />} />
              <Route path="profile" element={<SellerProfilePage />} />
            </Route>

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminModeration />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/:id" element={<AdminUserDetail />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="featured" element={<AdminFeatured />} />
              <Route path="commissions" element={<AdminCommissions />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Auth */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

            {/* Legal */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <ScrollToTopButton />
      <AnimatePresence>
        {playingKit && <GlobalPlayer kit={playingKit} onClose={() => setPlayingKit(null)} />}
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <ThemeProvider>
        <ViewProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ViewProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
