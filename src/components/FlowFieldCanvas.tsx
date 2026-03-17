import { useRef, useEffect } from "react";

/**
 * Simplex-like noise (2D/3D) — lightweight implementation.
 * Based on improved Perlin noise with gradient table.
 */
const createNoise = () => {
  const perm = new Uint8Array(512);
  const grad3 = [
    [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
  ];
  // Seed permutation
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const dot3 = (g: number[], x: number, y: number, z: number) => g[0]*x + g[1]*y + g[2]*z;
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + t * (b - a);

  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x), v = fade(y), w = fade(z);
    const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A+1] + Z;
    const B = perm[X+1] + Y, BA = perm[B] + Z, BB = perm[B+1] + Z;
    return lerp(
      lerp(
        lerp(dot3(grad3[perm[AA]%12], x, y, z), dot3(grad3[perm[BA]%12], x-1, y, z), u),
        lerp(dot3(grad3[perm[AB]%12], x, y-1, z), dot3(grad3[perm[BB]%12], x-1, y-1, z), u),
        v
      ),
      lerp(
        lerp(dot3(grad3[perm[AA+1]%12], x, y, z-1), dot3(grad3[perm[BA+1]%12], x-1, y, z-1), u),
        lerp(dot3(grad3[perm[AB+1]%12], x, y-1, z-1), dot3(grad3[perm[BB+1]%12], x-1, y-1, z-1), u),
        v
      ),
      w
    );
  };
};

interface FlowFieldCanvasProps {
  mousePos: { x: number; y: number } | null;
}

const FlowFieldCanvas = ({ mousePos }: FlowFieldCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef(mousePos);
  const mouseStrengthRef = useRef(0); // decays when mouse leaves
  const prevMouseRef = useRef<{ x: number; y: number } | null>(null);
  const mouseSpeedRef = useRef(0);
  const animFrameRef = useRef(0);

  mousePosRef.current = mousePos;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise = createNoise();
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 100 : 250;
    const NOISE_SCALE = 0.003;
    const NOISE_SPEED = 0.0008;
    const MOUSE_RADIUS = 150;

    let cw = 0, ch = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      cw = rect.width;
      ch = rect.height;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * (cw || 800),
      y: Math.random() * (ch || 600),
      speed: 0.5 + Math.random() * 1,
      opacity: 0.15 + Math.random() * 0.15,
    }));

    // Autonomous halo movement
    const halo = { x: cw * 0.5, y: ch * 0.5, targetX: cw * 0.5, targetY: ch * 0.5 };

    let zOff = 0;
    let frame = 0;

    const animate = () => {
      frame++;
      zOff += NOISE_SPEED;
      const w = cw || 1;
      const h = ch || 1;

      // Fade trail — dark overlay each frame
      ctx.fillStyle = "rgba(13,10,4,0.04)";
      ctx.fillRect(0, 0, w, h);

      // Mouse handling
      const mp = mousePosRef.current;
      if (mp) {
        mouseStrengthRef.current = Math.min(1, mouseStrengthRef.current + 0.05);
        const px = mp.x * w;
        const py = mp.y * h;
        if (prevMouseRef.current) {
          const dx = px - prevMouseRef.current.x;
          const dy = py - prevMouseRef.current.y;
          mouseSpeedRef.current = Math.min(30, Math.sqrt(dx * dx + dy * dy));
        }
        prevMouseRef.current = { x: px, y: py };
      } else {
        mouseStrengthRef.current = Math.max(0, mouseStrengthRef.current - 0.008);
        mouseSpeedRef.current *= 0.95;
      }

      // Halo position: follow mouse or autonomous sinusoidal path
      if (mp && mouseStrengthRef.current > 0.3) {
        const tx = mp.x * w;
        const ty = mp.y * h;
        halo.x += (tx - halo.x) * 0.08;
        halo.y += (ty - halo.y) * 0.08;
      } else {
        // Autonomous flowing movement — Lissajous-like
        const t = frame * 0.0008;
        const ax = w * 0.5 + Math.sin(t * 1.1) * w * 0.3 + Math.sin(t * 0.7 + 2) * w * 0.1;
        const ay = h * 0.5 + Math.cos(t * 0.9) * h * 0.25 + Math.cos(t * 1.3 + 1) * h * 0.1;
        halo.x += (ax - halo.x) * 0.015;
        halo.y += (ay - halo.y) * 0.015;
      }

      // Draw halo — softer intensity
      const haloGrad = ctx.createRadialGradient(halo.x, halo.y, 0, halo.x, halo.y, 250);
      const haloAlpha = mp ? 0.05 : 0.03;
      haloGrad.addColorStop(0, `rgba(255,107,26,${haloAlpha})`);
      haloGrad.addColorStop(0.5, `rgba(255,107,26,${haloAlpha * 0.4})`);
      haloGrad.addColorStop(1, "transparent");
      ctx.fillStyle = haloGrad;
      ctx.fillRect(0, 0, w, h);

      // Mouse perturbation position
      const mx = mp ? mp.x * w : (prevMouseRef.current?.x ?? -9999);
      const my = mp ? mp.y * h : (prevMouseRef.current?.y ?? -9999);
      const mStr = mouseStrengthRef.current;
      const mSpeed = mouseSpeedRef.current;

      // Update & draw particles following the flow field
      for (const p of particles) {
        // Sample noise field to get flow direction
        const angle = noise(p.x * NOISE_SCALE, p.y * NOISE_SCALE, zOff) * Math.PI * 4;
        let vx = Math.cos(angle) * p.speed;
        let vy = Math.sin(angle) * p.speed;

        // Mouse perturbation — push radially away from cursor
        if (mStr > 0) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * mStr * (2 + mSpeed * 0.3);
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }
        }

        p.x += vx;
        p.y += vy;

        // Wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Brightness near cursor
        let drawOpacity = p.opacity;
        if (mStr > 0) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            drawOpacity = Math.min(0.4, p.opacity + (1 - dist / MOUSE_RADIUS) * 0.2 * mStr);
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + Math.random() * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,26,${drawOpacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[0]" />;
};

export default FlowFieldCanvas;
