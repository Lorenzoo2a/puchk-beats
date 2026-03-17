import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalPlayer from "@/components/GlobalPlayer";
import HomePage from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { Kit } from "@/data/mockData";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const AppContent = () => {
  const [playingKit, setPlayingKit] = useState<Kit | null>(null);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage onPlay={setPlayingKit} />} />
        <Route path="/kit/:id" element={<ProductPage onPlay={setPlayingKit} />} />
        <Route path="/dashboard" element={<Dashboard onPlay={setPlayingKit} />} />
        <Route path="/dashboard/*" element={<Dashboard onPlay={setPlayingKit} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
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
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
