import { useRef, useEffect } from "react";

/**
 * Simplex-like 3D noise — lightweight implementation.
 */
const createNoise = () => {
  const perm = new Uint8Array(512);
  const grad3 = [
    [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
  ];
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
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
    const u = fade(x), v = fade(y), w = fade(z);
    const A = perm[X]+Y, AA = perm[A]+Z, AB = perm[A+1]+Z;
    const B = perm[X+1]+Y, BA = perm[B]+Z, BB = perm[B+1]+Z;
    return lerp(
      lerp(lerp(dot3(grad3[perm[AA]%12],x,y,z), dot3(grad3[perm[BA]%12],x-1,y,z), u),
           lerp(dot3(grad3[perm[AB]%12],x,y-1,z), dot3(grad3[perm[BB]%12],x-1,y-1,z), u), v),
      lerp(lerp(dot3(grad3[perm[AA+1]%12],x,y,z-1), dot3(grad3[perm[BA+1]%12],x-1,y,z-1), u),
           lerp(dot3(grad3[perm[AB+1]%12],x,y-1,z-1), dot3(grad3[perm[BB+1]%12],x-1,y-1,z-1), u), v),
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
  const animFrameRef = useRef(0);

  mousePosRef.current = mousePos;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise = createNoise();
    const isMobile = window.innerWidth < 768;
    const SPACING = isMobile ? 40 : 25;
    const LINE_LEN = isMobile ? 8 : 10;
    const NOISE_SCALE = 0.008;
    const BASE_MOUSE_RADIUS = 200;
    const dpr = Math.min(window.devicePixelRatio, 2);

    let cw = 0, ch = 0;

    // Smooth mouse state
    const mouse = { x: -9999, y: -9999, active: false, speed: 0 };
    const halo = { x: 0, y: 0 };
    let prevMx = -9999, prevMy = -9999;
    // Store current angles for smooth lerp
    let currentAngles: Float32Array | null = null;

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
      halo.x = cw * 0.5;
      halo.y = ch * 0.5;
      // Reset angle cache on resize
      const cols = Math.ceil(cw / SPACING) + 1;
      const rows = Math.ceil(ch / SPACING) + 1;
      currentAngles = new Float32Array(cols * rows);
    };
    resize();
    window.addEventListener("resize", resize);

    let zOff = 0;
    let frame = 0;

    const animate = () => {
      frame++;
      zOff += 0.003;
      const w = cw || 1;
      const h = ch || 1;

      // Full clear — no trails
      ctx.clearRect(0, 0, w, h);

      // Update mouse
      const mp = mousePosRef.current;
      if (mp) {
        const tx = mp.x * w;
        const ty = mp.y * h;
        // Smooth mouse position
        mouse.x += (tx - mouse.x) * 0.15;
        mouse.y += (ty - mouse.y) * 0.15;
        mouse.active = true;
        const dx = tx - prevMx;
        const dy = ty - prevMy;
        const spd = Math.sqrt(dx * dx + dy * dy);
        mouse.speed += (spd - mouse.speed) * 0.2;
        prevMx = tx;
        prevMy = ty;
      } else {
        mouse.active = false;
        mouse.speed *= 0.92;
      }

      // Halo position
      if (mouse.active) {
        halo.x += (mouse.x - halo.x) * 0.06;
        halo.y += (mouse.y - halo.y) * 0.06;
      } else {
        const t = frame * 0.0006;
        const ax = w * 0.5 + Math.sin(t * 1.1) * w * 0.3;
        const ay = h * 0.5 + Math.cos(t * 0.9) * h * 0.25;
        halo.x += (ax - halo.x) * 0.01;
        halo.y += (ay - halo.y) * 0.01;
      }

      // Draw subtle halo
      const haloGrad = ctx.createRadialGradient(halo.x, halo.y, 0, halo.x, halo.y, 250);
      haloGrad.addColorStop(0, `rgba(255,107,26,${mouse.active ? 0.05 : 0.03})`);
      haloGrad.addColorStop(0.6, `rgba(255,107,26,${mouse.active ? 0.015 : 0.008})`);
      haloGrad.addColorStop(1, "transparent");
      ctx.fillStyle = haloGrad;
      ctx.fillRect(0, 0, w, h);

      // Draw flow field arrows
      const cols = Math.ceil(w / SPACING) + 1;
      const mouseRadius = BASE_MOUSE_RADIUS + Math.min(mouse.speed * 3, 100);
      const mouseRadiusSq = mouseRadius * mouseRadius;

      let idx = 0;
      for (let gy = 0; gy < h; gy += SPACING) {
        for (let gx = 0; gx < w; gx += SPACING) {
          // Target angle from noise
          let targetAngle = noise(gx * NOISE_SCALE, gy * NOISE_SCALE, zOff) * Math.PI * 2;

          let brightness = 0.12;
          let scale = 1;

          // Mouse perturbation
          if (mouse.active) {
            const dx = gx - mouse.x;
            const dy = gy - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < mouseRadiusSq) {
              const dist = Math.sqrt(distSq);
              const influence = 1 - dist / mouseRadius;
              const influenceSq = influence * influence; // quadratic falloff
              // Point away from cursor
              const repelAngle = Math.atan2(dy, dx);
              targetAngle = targetAngle + (repelAngle - targetAngle) * influenceSq;
              brightness = 0.12 + influenceSq * 0.25;
              scale = 1 + influenceSq * 0.4 + Math.min(mouse.speed * 0.01, 0.3) * influenceSq;
            }
          }

          // Smooth lerp current angle toward target
          if (currentAngles) {
            const prev = currentAngles[idx];
            // Handle angle wrapping
            let diff = targetAngle - prev;
            while (diff > Math.PI) diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;
            currentAngles[idx] = prev + diff * 0.12;
            targetAngle = currentAngles[idx];
          }
          idx++;

          const len = LINE_LEN * scale;
          const cos = Math.cos(targetAngle);
          const sin = Math.sin(targetAngle);
          const x1 = gx - cos * len * 0.5;
          const y1 = gy - sin * len * 0.5;
          const x2 = gx + cos * len * 0.5;
          const y2 = gy + sin * len * 0.5;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(255,107,26,${brightness})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
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
