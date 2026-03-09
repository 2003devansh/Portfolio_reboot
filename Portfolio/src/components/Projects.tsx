/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../data";

gsap.registerPlugin(ScrollTrigger);

// --- Interfaces ---

interface ProjectProps {
  id: string | number;
  title: string;
  tags: string[];
  featured?: boolean;
  desc: string;
  github: string;
}

type DraggableElement = HTMLDivElement & { _tx?: number };

// --- Components ---

function ProjectCard({
  id,
  title,
  tags,
  featured,
  desc,
  github,
}: ProjectProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        transformPerspective: 800,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onLeave = () =>
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.7,
        ease: "elastic.out(1,0.6)",
      });

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`shrink-0 border border-[#1a1a2e] bg-[#0d0d14] p-7 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:border-[rgba(232,0,61,0.3)]
        ${featured ? "w-130 h-120" : "w-95 h-110"}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-[rgba(232,0,61,0.04)] to-[rgba(26,86,255,0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

      <div>
        {featured && (
          <div className="font-mono text-[9px] tracking-[0.3em] text-[#e8003d] uppercase mb-3 flex items-center gap-2">
            <span></span> Featured Project
          </div>
        )}
        <div className="font-display text-5xl text-[rgba(232,0,61,0.06)] leading-none mb-1">
          {id}
        </div>
        <h3 className="font-display text-2xl tracking-wider leading-tight mb-3 group-hover:text-[#e8003d] transition-colors duration-300">
          {title}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((t, i) => (
            <span
              key={i}
              className={`font-mono text-[9px] px-2 py-0.5 border tracking-wider ${i === 0 ? "border-[rgba(232,0,61,0.35)] text-[#e8003d]" : "border-[#1a1a2e] text-[#334]"}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {" "}
        {/* Ensure links are above card decorators */}
        <p className="font-body text-[13px] text-[#445] leading-relaxed mb-6">
          {desc}
        </p>
        <div className="flex gap-4">
          {github !== "#" ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              /* KEY FIX 1: Stop the click/mousedown from reaching the drag logic */
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="font-mono text-[10px] tracking-[0.2em] uppercase flex items-center gap-1.5 text-red-500 hover:text-red-400 no-underline cursor-pointer transition-colors"
            >
              GitHub ↗
            </a>
          ) : (
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#334] italic">
              Private Source
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const trackRef = useRef<DraggableElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    // Entrance Animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 78%",
      once: true,
      onEnter() {
        if (trackRef.current) {
          gsap.fromTo(
            trackRef.current.querySelectorAll(".shrink-0"),
            { opacity: 0, x: 80 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
            },
          );
        }
      },
    });

    const track = trackRef.current;
    const cont = containerRef.current;
    if (!cont) return;

    let drag = false,
      sx = 0,
      sl = 0,
      vel = 0,
      lx = 0,
      anim: number;

    const onDown = (e: any) => {
      /* KEY FIX 2: Only start drag if the user isn't clicking a link */
      if (e.target.closest("a")) return;

      drag = true;
      sx = e.pageX || (e.touches && e.touches[0].pageX);
      lx = sx;
      sl = track._tx || 0;
      vel = 0;
      cancelAnimationFrame(anim);
      gsap.to(track, { scale: 0.985, duration: 0.2 });
      document.body.style.userSelect = "none";
    };

    const onMove = (e: any) => {
      if (!drag) return;
      const px = e.pageX || (e.touches && e.touches[0].pageX);
      vel = px - lx;
      lx = px;
      const maxX = -(track.scrollWidth - cont.clientWidth + 128);
      const nx = Math.max(maxX, Math.min(0, sl + (px - sx)));
      gsap.set(track, { x: nx });
      track._tx = nx;
    };

    const onUp = () => {
      if (!drag) return;
      drag = false;
      document.body.style.userSelect = "";
      gsap.to(track, { scale: 1, duration: 0.4, ease: "elastic.out(1,0.7)" });

      const maxX = -(track.scrollWidth - cont.clientWidth + 128);
      const momentum = () => {
        vel *= 0.92;
        const nx = Math.max(maxX, Math.min(0, (track._tx || 0) + vel));
        gsap.set(track, { x: nx });
        track._tx = nx;
        if (Math.abs(vel) > 0.4) anim = requestAnimationFrame(momentum);
      };
      momentum();
    };

    track.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    track.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      track.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      track.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 bg-[#0d0d14] border-t border-[#1a1a2e] py-28 overflow-hidden"
    >
      <div className="px-8 md:px-16 mb-12">
        <div className="flex items-center gap-3 font-mono text-[10px] text-[#e8003d] tracking-[0.35em] uppercase mb-5">
          <span>🕸</span> 03 — Work
        </div>
        <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.92] tracking-wider text-white">
          SELECTED
          <br />
          PROJECTS
        </h2>
      </div>

      <div ref={containerRef} className="relative h-125">
        <div
          ref={trackRef}
          className="absolute top-0 left-0 flex gap-5 px-8 md:px-16 will-change-transform"
          style={{ cursor: "grab" }}
        >
          {PROJECTS.map((p) => (
            <ProjectCard
              key={p.id}
              id={p.id}
              title={p.title}
              tags={p.tags}
              featured={p.featured}
              desc={p.desc}
              github={p.github}
            />
          ))}
        </div>
      </div>

      <div className="px-8 md:px-16 mt-6 flex items-center gap-3 font-mono text-[10px] text-[#334] tracking-[0.2em]">
        <span>🕸</span> Swing through projects — drag to explore
      </div>
    </section>
  );
}
