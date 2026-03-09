import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatBoxProps {
  value: number | string;
  suffix: string;
  label: string;
  color?: string;
}

function StatBox({ value, suffix, label, color = "#e8003d" }: StatBoxProps) {
  // 1. Added explicit HTML types to refs
  const boxRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return; // 2. Guard clause to handle 'possibly null'

    // 3. Added MouseEvent type to 'e'
    const onMove = (e: MouseEvent) => {
      const r = box.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(box, {
        rotateY: x * 16,
        rotateX: -y * 16,
        transformPerspective: 700,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () =>
      gsap.to(box, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.7,
        ease: "elastic.out(1,0.6)",
      });

    box.addEventListener("mousemove", onMove);
    box.addEventListener("mouseleave", onLeave);

    // Counter Logic
    if (typeof value === "number") {
      const el = numRef.current;
      if (el) {
        el.textContent = "0" + suffix;
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter() {
            gsap.fromTo(
              { v: 0 },
              { v: value },
              {
                duration: 1.6,
                ease: "power2.out",
                onUpdate: function () {
                  // Use a function declaration to access 'this' correctly in GSAP
                  const target = this.targets()[0] as { v: number };
                  el.textContent = Math.round(target.v) + suffix;
                },
              },
            );
          },
        });
      }
    }

    return () => {
      box.removeEventListener("mousemove", onMove);
      box.removeEventListener("mouseleave", onLeave);
    };
  }, [value, suffix]);

  return (
    <div
      ref={boxRef}
      className="border border-[#1a1a2e] p-7 relative overflow-hidden group transition-colors duration-300 hover:border-[rgba(232,0,61,0.3)] cursor-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-[rgba(232,0,61,0.04)] to-[rgba(26,86,255,0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: "linear-gradient(90deg,#e8003d,#1a56ff)" }}
      />
      <div
        ref={numRef}
        className="font-display text-5xl leading-none"
        style={{ color }}
      >
        {typeof value === "string" ? value : value + suffix}
      </div>
      <div className="font-mono text-[10px] text-[#334] tracking-[0.25em] uppercase mt-2">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  // 4. Added explicit types to main refs
  const sectionRef = useRef<HTMLElement>(null);
  const xpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll(".reveal");
    els.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
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

    // XP block line draw
    if (xpRef.current) {
      const line = xpRef.current.querySelector(".xp-line");
      ScrollTrigger.create({
        trigger: xpRef.current,
        start: "top 82%",
        once: true,
        onEnter() {
          if (line) {
            gsap.to(line, {
              height: "100%",
              duration: 1,
              ease: "power3.out",
            });
          }
        },
      });
    }

    // Section title split
    const title = sectionRef.current.querySelector(".split-title");
    if (title && title.textContent) {
      const text = title.textContent;
      title.innerHTML = text
        .split("")
        .map((c) =>
          c === "\n"
            ? "<br/>"
            : `<span class="split-char inline-block overflow-hidden"><span class="split-inner inline-block" style="transform:translateY(120%);opacity:0">${c === " " ? "&nbsp;" : c}</span></span>`,
        )
        .join("");

      ScrollTrigger.create({
        trigger: title,
        start: "top 82%",
        once: true,
        onEnter() {
          gsap.to(title.querySelectorAll(".split-inner"), {
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
      id="about"
      ref={sectionRef}
      className="relative z-10 bg-[#0d0d14] border-y border-[#1a1a2e] px-8 md:px-16 py-28"
    >
      <div className="reveal flex items-center gap-3 font-mono text-[10px] text-[#e8003d] tracking-[0.35em] uppercase mb-5">
        <span>🕸</span> 01 — About Me
      </div>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 md:gap-24 items-start">
        <div>
          <h2 className="split-title font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.92] tracking-wider mb-10">
            WHO AM I?
          </h2>

          <div className="space-y-4 font-body text-[#556] leading-loose text-[15px]">
            <p className="reveal">
              I'm a{" "}
              <em className="not-italic text-[#e8003d] font-semibold">
                fresher fullstack developer
              </em>{" "}
              who graduated from{" "}
              <strong className="text-[#c0c0d0]">GLA University</strong>,
              passionate about building real-world web apps that are fast,
              scalable, and beautiful.
            </p>
            <p className="reveal">
              During my internship at{" "}
              <em className="not-italic text-[#e8003d] font-semibold">
                Trieon Technosolution Pvt Ltd
              </em>
              , I worked on live production projects — handling React UIs to
              Express APIs and MongoDB schemas.
            </p>
          </div>

          <div className="reveal mt-8 pl-6 py-5 pr-5 border-l-2 border-[#e8003d] bg-[rgba(232,0,61,0.04)] relative">
            <div className="absolute top-0 left-3 font-display text-6xl text-[rgba(232,0,61,0.1)] leading-none select-none">
              "
            </div>
            <p className="font-mono text-[12px] text-[#c8d8ff] leading-loose italic relative z-10">
              "With great power comes great responsibility."
              <br />
              And with great code comes great products.
            </p>
            <cite className="font-mono text-[10px] text-[#334] not-italic tracking-widest block mt-2">
              — Uncle Ben (& every senior dev ever)
            </cite>
          </div>

          <div
            ref={xpRef}
            className="reveal mt-8 border border-[#1a1a2e] p-7 relative overflow-hidden"
          >
            <span className="absolute -top-2 left-4 font-mono text-[9px] tracking-[0.25em] text-[#e8003d] bg-[#0d0d14] px-2 uppercase">
              Experience
            </span>
            <div className="xp-line absolute left-0 top-0 w-0.5 h-0 bg-linear-to-b from-[#e8003d] to-[#1a56ff]" />

            <div>
              <div className="font-display text-xl tracking-widest text-[#f0f0f8]">
                TRIEON TECHNOSOLUTION PVT LTD
              </div>
              <div className="font-mono text-[10px] text-[#e8003d] tracking-[0.2em] uppercase mt-1">
                Fullstack Developer Intern
              </div>
              <div className="font-mono text-[10px] text-[#334] tracking-wider mt-2">
                2024 — 2025 &nbsp;|&nbsp; MERN Stack &nbsp;|&nbsp; Production
                Projects
              </div>
            </div>
          </div>

          <div className="reveal mt-4 border border-[#1a1a2e] p-7 relative">
            <span className="absolute -top-2 left-4 font-mono text-[9px] tracking-[0.25em] text-[#1a56ff] bg-[#0d0d14] px-2 uppercase">
              Education
            </span>
            <div className="font-display text-xl tracking-widest text-[#1a56ff]">
              GLA UNIVERSITY
            </div>
            <div className="font-mono text-[10px] text-[#1a56ff] tracking-[0.2em] uppercase mt-1">
              B.Tech — Computer Science
            </div>
            <div className="font-mono text-[10px] text-[#334] tracking-wider mt-2">
              Mathura, Uttar Pradesh
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatBox value={1} suffix="+" label="Year Experience" />
          <StatBox value={5} suffix="+" label="Projects Shipped" />
          <StatBox
            value="MERN"
            suffix=""
            label="Primary Stack"
            color="#e8003d"
          />
          <StatBox value="GLA" suffix="" label="University" color="#1a56ff" />
          <div className="col-span-2 border border-[#1a1a2e] p-7 relative overflow-hidden group hover:border-[rgba(232,0,61,0.25)] transition-colors duration-300">
            <div
              className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
              style={{ background: "linear-gradient(90deg,#e8003d,#1a56ff)" }}
            />
            <div className="font-mono text-[10px] text-[#334] tracking-[0.25em] uppercase mb-2">
              Current Status
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00e676] shadow-[0_0_10px_#00e676] animate-pulse" />
              <span className="font-display text-xl tracking-widest text-[#00e676]">
                AVAILABLE FOR HIRE
              </span>
            </div>
            <p className="font-mono text-[10px] text-[#334] mt-2 tracking-wider">
              Open to full-time, internship & freelance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
