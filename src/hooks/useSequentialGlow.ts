import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Sequential glow effect for card sections.
 * Returns the index of the currently glowing card (-1 = none).
 * Pauses on hover, resumes 2s after hover ends.
 */
export const useSequentialGlow = (count: number) => {
  const [glowIndex, setGlowIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pause = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const resume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 2000);
  }, []);

  useEffect(() => {
    if (paused || count === 0) return;
    const interval = setInterval(() => {
      setGlowIndex((prev) => (prev + 1) % count);
    }, 2700); // 600ms fade-in + 1500ms hold + 600ms fade-out
    return () => clearInterval(interval);
  }, [paused, count]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  return {
    glowIndex: paused ? -1 : glowIndex,
    pause,
    resume,
  };
};
