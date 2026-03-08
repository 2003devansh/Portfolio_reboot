import { useEffect, useRef } from "react";

export default function WebBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const W = (c.width = window.innerWidth);
      const H = (c.height = window.innerHeight);
      ctx.clearRect(0, 0, W, H);

      const corners = [
        { x: 0, y: 0, base: Math.PI * 0.25 },
        { x: W, y: 0, base: Math.PI * 0.75 },
        { x: W, y: H, base: Math.PI * 1.25 },
        { x: 0, y: H, base: Math.PI * 1.75 },
      ];

      corners.forEach(({ x, y, base }) => {
        const spokes = 9;
        const arc = Math.PI / 2.2;
        const maxR = Math.sqrt(W * W + H * H) * 0.5;

        for (let s = 0; s < spokes; s++) {
          const a = base + (s / (spokes - 1) - 0.5) * arc;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(a) * maxR, y + Math.sin(a) * maxR);
          ctx.strokeStyle = "rgba(200,216,255,0.045)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        for (let r = 70; r < maxR; r += 70) {
          const aS = base - arc / 2;
          const aE = base + arc / 2;

          ctx.beginPath();
          ctx.arc(x, y, r, aS, aE);
          ctx.strokeStyle = "rgba(200,216,255,0.03)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      const cx = W / 2;
      const cy = H * 0.42;
      const cSpokes = 16;
      const cRings = 8;

      for (let s = 0; s < cSpokes; s++) {
        const a = (s / cSpokes) * Math.PI * 2;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * 300, cy + Math.sin(a) * 300);
        ctx.strokeStyle = "rgba(232,0,61,0.05)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (let r = 1; r <= cRings; r++) {
        ctx.beginPath();
        ctx.arc(cx, cy, r * 38, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232,0,61,${0.02 + r * 0.004})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
