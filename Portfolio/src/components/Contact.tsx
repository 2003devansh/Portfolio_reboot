import { useEffect, useRef, type JSX } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    if (titleEl) {
      const red = titleEl.querySelector(".title-red");
      const blue = titleEl.querySelector(".title-blue");
      const white = titleEl.querySelector(".title-white");

      ScrollTrigger.create({
        trigger: titleEl,
        start: "top 72%",
        once: true,
        onEnter() {
          if (red)
            gsap.fromTo(
              red,
              { x: -100, opacity: 0 },
              { x: 0, opacity: 1, duration: 1, ease: "expo.out" },
            );
          if (blue)
            gsap.fromTo(
              blue,
              { x: 100, opacity: 0 },
              { x: 0, opacity: 1, duration: 1, delay: 0.15, ease: "expo.out" },
            );
          if (white)
            gsap.fromTo(
              white,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.out",
              },
            );
        },
      });
    }

    if (sectionRef.current) {
      const reveals = sectionRef.current.querySelectorAll(".reveal");
      reveals.forEach((el) => {
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
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const socials = [
    { label: "GitHub", href: PERSONAL.socials.github },
    { label: "LinkedIn", href: PERSONAL.socials.linkedin },
    { label: "Resume", href: PERSONAL.socials.resume },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 bg-black border-t border-slate-900 px-8 md:px-16 py-28 text-center overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[22vw] text-[rgba(232,0,61,0.018)] tracking-[-0.05em] whitespace-nowrap">
          SWING
        </span>
      </div>

      <div className="reveal flex items-center justify-center gap-3 font-mono text-[10px] text-red-600 tracking-[0.35em] uppercase mb-8">
        <span>🕸</span> 04 — Contact
      </div>

      <div ref={titleRef} className="mb-8">
        <h2 className="font-display leading-[0.9] tracking-wider text-[clamp(3rem,8vw,7rem)]">
          <span className="title-red block text-red-600 opacity-0">LET'S</span>
          <span className="title-blue block text-blue-600 opacity-0">
            BUILD
          </span>
          <span className="title-white block text-white opacity-0">
            TOGETHER
          </span>
        </h2>
      </div>

      <p className="reveal font-mono text-[11px] text-gray-500 tracking-[0.2em] leading-loose max-w-md mx-auto mb-10">
        Open to full-time roles, internships &amp; freelance work.
        <br />
        Based in India — available remotely worldwide. 🕷️
      </p>

      <a
        href={`mailto:${PERSONAL.email}`}
        className="reveal font-display text-[clamp(1.2rem,3vw,2rem)] text-red-600 tracking-widest pb-1 border-b border-red-600/30 hover:tracking-[0.25em] hover:text-blue-600 transition-all duration-400 no-underline inline-block"
      >
        {PERSONAL.email}
      </a>

      <div className="reveal flex items-center justify-center gap-6 mt-10">
        {socials
          .map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-gray-500 hover:text-red-600 tracking-[0.2em] uppercase no-underline transition-colors duration-300"
            >
              {s.label}
            </a>
          ))
          .reduce(
            (acc: JSX.Element[], el, i) =>
              i === 0
                ? [el]
                : [
                    ...acc,
                    <div key={`sep-${i}`} className="w-px h-3 bg-slate-900" />,
                    el,
                  ],
            [],
          )}
      </div>

      {/* Spider SVG Sign-off */}
      <div className="reveal mt-16 flex flex-col items-center gap-4">
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
          fill="none"
          className="opacity-20"
        >
          <circle cx="50" cy="50" r="20" fill="red" />
          <ellipse cx="50" cy="50" rx="10" ry="18" fill="blue" />
          <ellipse
            cx="43"
            cy="44"
            rx="5"
            ry="4"
            fill="white"
            transform="rotate(-15 43 44)"
          />
          <ellipse
            cx="57"
            cy="44"
            rx="5"
            ry="4"
            fill="white"
            transform="rotate(15 57 44)"
          />
          {[
            [50, 30, 50, 5],
            [50, 70, 50, 95],
            [20, 38, 3, 28],
            [80, 38, 97, 28],
            [15, 55, 0, 52],
            [85, 55, 100, 52],
            [25, 72, 8, 88],
            [75, 72, 92, 88],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="lightblue"
              strokeWidth="1.5"
            />
          ))}
        </svg>
        <p className="font-mono text-[9px] text-gray-700 tracking-[0.3em]">
          "NOT EVERYONE CAN DO WHAT YOU DO. BUT YOU CAN." 🕷️
        </p>
      </div>
    </section>
  );
}
