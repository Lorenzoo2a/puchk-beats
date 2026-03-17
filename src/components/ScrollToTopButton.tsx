import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full liquid-glass flex items-center justify-center hover:bg-white/10 transition-all btn-press animate-scroll-top-in shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
    >
      <ChevronUp className="w-5 h-5 text-white/70" />
    </button>
  );
};

export default ScrollToTopButton;
