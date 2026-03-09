import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SpiderCursor() {
  const curRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLCanvasElement | null>(null);
  const senseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cur = curRef.current;
    const ring = ringRef.current;
    const canvas = trailRef.current;
    const sense = senseRef.current;

    if (!cur || !ring || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const lines: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      t: number;
    }[] = [];
    let mx = 0,
      my = 0,
      px = 0,
      py = 0;

    const onMove = (e: MouseEvent) => {
      px = mx;
      py = my;
      mx = e.clientX;
      my = e.clientY;

      gsap.to(cur, { x: mx, y: my, duration: 0.08 });
      gsap.to(ring, { x: mx, y: my, duration: 0.2 });

      if (Math.hypot(mx - px, my - py) > 5) {
        lines.push({ x1: px, y1: py, x2: mx, y2: my, t: 0 });
        if (lines.length > 35) lines.shift();
      }
    };

    document.addEventListener("mousemove", onMove);

    const interactables = document.querySelectorAll("a, button, [data-cursor]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cur, { scale: 3, duration: 0.2 });
        gsap.to(ring, {
          scale: 1.8,
          borderColor: "rgba(26,86,255,0.6)",
          duration: 0.2,
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cur, { scale: 1, duration: 0.2 });
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(232,0,61,0.4)",
          duration: 0.2,
        });
      });
    });

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach((l) => {
        l.t += 0.045;
        const alpha = Math.max(0, 1 - l.t * 2.2);
        const w = (1 - l.t) * 2;

        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(l.x2, l.y2);
        ctx.strokeStyle = `rgba(200,216,255,${alpha * 0.55})`;
        ctx.lineWidth = w * 0.7;
        ctx.stroke();
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();

    const onClick = (e: MouseEvent) => {
      const div = document.createElement("div");
      div.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; pointer-events:none; z-index:9995; transform:translate(-50%,-50%)`;

      const spokes = Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return `<line x1="40" y1="40" x2="${40 + Math.cos(a) * 38}" y2="${40 + Math.sin(a) * 38}" stroke="rgba(232,0,61,0.7)" stroke-width="1"/>`;
      }).join("");

      div.innerHTML = `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">${spokes}<circle cx="40" cy="40" r="4" fill="rgba(232,0,61,0.8)"/></svg>`;
      document.body.appendChild(div);

      gsap.fromTo(
        div,
        { scale: 0, opacity: 1 },
        {
          scale: 2,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          onComplete: () => {
            div.remove();
          }, // Fix applied here
        },
      );
    };

    document.addEventListener("click", onClick);

    let senseTimer: ReturnType<typeof setTimeout>;
    const flashSense = () => {
      if (!sense) return;
      const x = Math.random() * 100,
        y = Math.random() * 100;
      sense.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,50,80,0.1), transparent 60%)`;

      gsap.fromTo(
        sense,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.07,
          yoyo: true,
          repeat: 3,
          onComplete: () => {
            gsap.set(sense, { opacity: 0 });
          }, // Fix applied here
        },
      );
      senseTimer = setTimeout(flashSense, 5000 + Math.random() * 9000);
    };
    senseTimer = setTimeout(flashSense, 4000);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      clearTimeout(senseTimer);
    };
  }, []);

  return (
    <>
      <div
        ref={senseRef}
        className="fixed inset-0 pointer-events-none z-8500 opacity-0"
      />
      <canvas
        ref={trailRef}
        className="fixed inset-0 pointer-events-none z-9990"
      />
      <div
        ref={curRef}
        className="fixed top-0 left-0 pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="14" height="14" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="4" fill="#e8003d" />
        </svg>
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-11 h-11 rounded-full pointer-events-none z-9998 -translate-x-1/2 -translate-y-1/2 border border-[rgba(232,0,61,0.4)]"
      />
    </>
  );
}
