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

function StatBox({ value, suffix, label }: StatBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

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
      className="border border-slate-800 p-7 relative overflow-hidden group transition-colors duration-300 hover:border-red-500/30 cursor-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 bg-linear-to-r from-red-500 to-blue-600" />

      <div
        ref={numRef}
        className="font-display text-5xl leading-none text-[#e8003d]"
      >
        {typeof value === "string" ? value : value + suffix}
      </div>

      <div className="font-mono text-[10px] text-slate-500 tracking-[0.25em] uppercase mt-2">
        {label}
      </div>
    </div>
  );
}

export default function About() {
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
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 bg-neutral-950 border-y border-slate-800 px-8 md:px-16 py-28"
    >
      <div className="reveal flex items-center gap-3 font-mono text-[10px] text-red-500 tracking-[0.35em] uppercase mb-5">
        <span>🕸</span> 01 — About Me
      </div>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 md:gap-24 items-start">
        <div>
          <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.92] tracking-wider mb-10 text-slate-100">
            WHO AM I?
          </h2>

          <div className="space-y-4 text-slate-600 leading-loose text-[15px]">
            <p className="reveal">
              I'm a{" "}
              <em className="not-italic text-red-500 font-semibold">
                Fullstack Developer
              </em>{" "}
              focused on building reliable, scalable web applications across the
              frontend and backend. I enjoy turning complex business
              requirements into clean application architecture, well-structured
              APIs, and intuitive user experiences.
            </p>

            <p className="reveal">
              At{" "}
              <em className="not-italic text-red-500 font-semibold">
                TechCouples Pvt Ltd
              </em>
              , I've worked across production systems involving{" "}
              <strong className="text-slate-300">
                backend architecture, REST APIs, business logic, and frontend
                integration
              </strong>
              . My work includes developing payroll infrastructure for an HRMS
              platform, building backend systems for an online gaming platform,
              and contributing to financial technology applications.
            </p>

            <p className="reveal">
              Before that, at{" "}
              <em className="not-italic text-red-500 font-semibold">
                Trieon Technosolution Pvt Ltd
              </em>
              , I worked on production applications using{" "}
              <strong className="text-slate-300">
                React, TypeScript, REST APIs, reusable components, and
                data-driven dashboards
              </strong>
              . Alongside professional work, I've built and shipped full-stack
              applications across different domains, continuously expanding my
              understanding of system design, backend engineering, and modern
              web development.
            </p>
          </div>

          <div
            ref={xpRef}
            className="reveal mt-8 border border-slate-800 p-7 relative overflow-hidden"
          >
            <span className="absolute top-1 left-4 font-mono text-[9px] tracking-[0.25em] text-red-500 bg-neutral-950 px-2 uppercase">
              Experience
            </span>

            <div className="xp-line absolute left-0 top-0 w-0.5 h-0 bg-linear-to-b from-red-500 to-blue-600" />

            <div className="pt-4">
              <div className="font-display text-xl tracking-widest text-slate-100">
                TECH COUPLES PVT LTD
              </div>

              <div className="font-mono text-[10px] text-red-500 tracking-[0.2em] uppercase mt-1">
                FULLSTACK DEVELOPER
              </div>

              <div className="font-mono text-[10px] text-slate-500 tracking-wider mt-2">
                APR 2026 - CURRENTLY | Production Systems
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px w-full bg-linear-to-r from-transparent via-slate-700 to-transparent" />

            {/* Experience 2 */}
            <div>
              <div className="font-display text-xl tracking-widest text-slate-100">
                TRIEON TECHNOSOLUTION PVT LTD
              </div>

              <div className="font-mono text-[10px] text-red-500 tracking-[0.2em] uppercase mt-1">
                SDE TRAINEE
              </div>

              <div className="font-mono text-[10px] text-slate-500 tracking-wider mt-2">
                JUN 2025 - SEPT 2025 | Production Systems
              </div>
            </div>
          </div>

          <div className="reveal mt-4 border border-slate-800 p-7 relative">
            <span className="absolute top-1 left-4 font-mono text-[9px] tracking-[0.25em] text-blue-600 bg-neutral-950 px-2 uppercase">
              Education
            </span>

            <div className="font-display text-xl tracking-widest text-blue-600">
              GLA UNIVERSITY
            </div>

            <div className="font-mono text-[10px] text-blue-600 tracking-[0.2em] uppercase mt-1">
              B.Tech — Computer Science
            </div>

            <div className="font-mono text-[10px] text-slate-500 tracking-wider mt-2">
              Mathura, Uttar Pradesh
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatBox value={5} suffix="+" label="Projects Shipped" />
          <StatBox
            value="Fullstack development"
            suffix=""
            label="Primary Stack"
          />

          <div className="col-span-2 border border-slate-800 p-7 relative overflow-hidden group hover:border-red-500/25 transition-colors duration-300">
            <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 bg-linear-to-r from-red-500 to-blue-600" />

            <div className="font-mono text-[10px] text-slate-500 tracking-[0.25em] uppercase mb-2">
              Current Status
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#22c55e] animate-pulse" />

              <span className="font-display text-xl tracking-widest text-green-400">
                Working
              </span>
            </div>

            <p className="font-mono text-[10px] text-slate-500 mt-2 tracking-wider">
              Open to full-time, internship & freelance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
