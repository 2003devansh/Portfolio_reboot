import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS, PROFICIENCY } from "../data";

gsap.registerPlugin(ScrollTrigger);

// --- Interfaces ---

interface SkillItem {
  name: string;
  level?: "core" | "secondary";
}

interface SkillGroupProps {
  category: string;
  icon: string;
  items: SkillItem[];
}

interface ProfBarProps {
  name: string;
  pct: number;
}

// --- Sub-Components ---

function SkillTag({ name, level }: SkillItem) {
  return (
    <span
      className={`relative font-mono text-[11px] px-3 py-1.5 border overflow-hidden group/tag cursor-none transition-colors duration-200
                ${
                  level === "core"
                    ? "border-[rgba(232,0,61,0.4)] text-[#c0c0d0] bg-[rgba(232,0,61,0.07)]"
                    : "border-[#1a1a2e] text-[#445]"
                }`}
    >
      <span className="absolute inset-0 bg-[#e8003d] origin-bottom scale-y-0 group-hover/tag:scale-y-100 transition-transform duration-220 ease-out z-0" />
      <span className="relative z-10 group-hover/tag:text-white transition-colors duration-200">
        {name}
      </span>
    </span>
  );
}

function SkillGroup({ category, icon, items }: SkillGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        "--mx",
        `${((e.clientX - r.left) / r.width) * 100}%`,
      );
      el.style.setProperty(
        "--my",
        `${((e.clientY - r.top) / r.height) * 100}%`,
      );
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={groupRef}
      className="skill-group p-8 border-r border-b border-[#1a1a2e] relative overflow-hidden"
      style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-400"
        style={{
          background:
            "radial-gradient(circle at var(--mx) var(--my), rgba(232,0,61,0.06), transparent 55%)",
        }}
      />
      <div className="font-mono text-[10px] text-[#e8003d] tracking-[0.3em] uppercase mb-5 flex items-center gap-2">
        <span>{icon}</span> {category}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <SkillTag key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}

function ProfBar({ name, pct }: ProfBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fillRef.current) return;

    ScrollTrigger.create({
      trigger: fillRef.current,
      start: "top 85%",
      once: true,
      onEnter() {
        gsap.to(fillRef.current, {
          width: pct + "%",
          duration: 1.4,
          ease: "power3.out",
          onComplete() {
            dotRef.current?.classList.add("opacity-100");
          },
        });
      },
    });
  }, [pct]);

  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-[11px] text-[#445] tracking-wider">
          {name}
        </span>
        <span className="font-mono text-[11px] text-[#e8003d]">{pct}%</span>
      </div>
      <div className="h-px bg-[#1a1a2e] relative">
        <div
          ref={fillRef}
          className="absolute top-0 left-0 h-px w-0"
          style={{ background: "linear-gradient(90deg,#e8003d,#1a56ff)" }}
        />
        <div
          ref={dotRef}
          className="absolute -top-1.5 w-3 h-3 rounded-full opacity-0 transition-opacity duration-300"
          style={{
            right: `${100 - pct}%`,
            background: "#1a56ff",
            boxShadow: "0 0 12px #1a56ff, 0 0 4px #e8003d",
          }}
        />
      </div>
    </div>
  );
}

// --- Main Section ---

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Staggered tag animation
    const grid = section.querySelector(".skills-grid");
    if (grid) {
      ScrollTrigger.create({
        trigger: grid,
        start: "top 82%",
        once: true,
        onEnter() {
          gsap.fromTo(
            section.querySelectorAll(".skill-group span[class*='font-mono']"),
            { opacity: 0, y: 18, scale: 0.88 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.035,
              duration: 0.4,
              ease: "back.out(1.5)",
            },
          );
        },
      });
    }

    // Section reveal
    section.querySelectorAll(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Title split animation
    const title = section.querySelector(".split-title") as HTMLElement;
    if (title && title.textContent) {
      const originalText = title.textContent;
      title.innerHTML = originalText
        .split("")
        .map((c) =>
          c === " "
            ? " "
            : `<span class="inline-block overflow-hidden"><span class="inline-block" style="transform:translateY(120%);opacity:0">${c}</span></span>`,
        )
        .join("");

      ScrollTrigger.create({
        trigger: title,
        start: "top 82%",
        once: true,
        onEnter() {
          gsap.to(title.querySelectorAll("span > span"), {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.65,
            ease: "expo.out",
          });
        },
      });
    }
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 bg-[#060608] px-8 md:px-16 py-28"
    >
      <div className="reveal flex items-center gap-3 font-mono text-[10px] text-[#e8003d] tracking-[0.35em] uppercase mb-5">
        <span>🕷</span> 02 — Tech Stack
      </div>
      <h2 className="split-title font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.92] tracking-wider mb-16">
        SKILLS & TOOLS
      </h2>

      <div className="skills-grid grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#1a1a2e] reveal">
        {SKILLS.map((s) => (
          <SkillGroup
            key={s.category}
            category={s.category}
            icon={s.icon}
            items={s.items as SkillItem[]}
          />
        ))}
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-12">
        <div className="reveal">
          <div className="font-mono text-[10px] text-[#e8003d] tracking-[0.3em] uppercase mb-8 flex items-center gap-2">
            <span className="w-6 h-px bg-[#e8003d]" /> Proficiency
          </div>
          {PROFICIENCY.slice(0, 3).map((p) => (
            <ProfBar key={p.name} {...p} />
          ))}
        </div>
        <div className="reveal">
          <div className="font-mono text-[10px] text-[#e8003d] tracking-[0.3em] uppercase mb-8 flex items-center gap-2 opacity-0">
            _
          </div>
          {PROFICIENCY.slice(3).map((p) => (
            <ProfBar key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
