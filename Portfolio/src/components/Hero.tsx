import { useEffect, useRef, type ReactNode } from "react";
import { useMagneticButton } from "../hooks/useGsap";
import { PERSONAL } from "../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Interfaces ---

interface MagBtnProps {
  href: string;
  primary?: boolean;
  children: ReactNode;
}

// --- Components ---

const MagBtn = ({ href, primary, children }: MagBtnProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useMagneticButton(ref, 0.3);

  return (
    <div ref={ref} className="inline-block">
      <a
        href={href}
        className={`relative font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-3.5 inline-block overflow-hidden transition-colors duration-300 no-underline group
                    ${
                      primary
                        ? "bg-red-600 text-white hover:text-white"
                        : "border border-red-200 text-gray-500 hover:text-white hover:border-red-600"
                    }`}
        style={
          primary
            ? {
                clipPath:
                  "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
              }
            : {}
        }
      >
        <span className="absolute inset-0 bg-blue-600 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-380 ease-[cubic-bezier(0.77,0,0.175,1)]" />
        <span className="relative z-10">{children}</span>
      </a>
    </div>
  );
};

const Hero = () => {
  const nameRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.querySelectorAll(".hero-corner-line").forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: "100%", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.1 + i * 0.12,
          ease: "power3.out",
        },
      );
    });

    const tl = gsap.timeline();
    tl.to(
      eyebrowRef.current,
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      0.15,
    )
      .to("#hero-w1", { y: 0, duration: 0.9, ease: "expo.out" }, 0.3)
      .to("#hero-w2", { y: 0, duration: 0.9, ease: "expo.out" }, 0.45)
      .to(
        descRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.7,
      )
      .to(
        actionsRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.85,
      )
      .to(lineRef.current, { scaleX: 1, duration: 1.4, ease: "expo.out" }, 0.6)
      .to(bgRef.current, { opacity: 1, duration: 1.5 }, 0.5);

    const glitchInterval = setInterval(() => {
      const el = glitchRef.current;
      if (el) {
        el.classList.add("glitch-active");
        setTimeout(() => {
          el.classList.remove("glitch-active");
        }, 220);
      }
    }, 3500);

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }

    if (nameRef.current) {
      gsap.to(nameRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    return () => {
      clearInterval(glitchInterval);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end px-8 md:px-16 pb-20 overflow-hidden z-10"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-0"
        style={{
          backgroundImage: `
                        repeating-linear-gradient(0deg,rgba(200,216,255,0.025) 0,rgba(200,216,255,0.025) 1px,transparent 1px,transparent 50px),
                        repeating-linear-gradient(60deg,rgba(200,216,255,0.025) 0,rgba(200,216,255,0.025) 1px,transparent 1px,transparent 50px),
                        repeating-linear-gradient(120deg,rgba(200,216,255,0.025) 0,rgba(200,216,255,0.025) 1px,transparent 1px,transparent 50px)
                    `,
        }}
      />

      <div className="relative z-20">
        <div
          ref={eyebrowRef}
          className="font-mono text-[11px] tracking-[0.4em] text-red-600 uppercase mb-5 flex items-center gap-3 opacity-0"
        >
          <span>🕷</span>
          YOUR FRIENDLY NEIGHBOURHOOD WEB DEVELOPER
        </div>

        <div ref={nameRef} className="relative z-10">
          <h1 className="font-display leading-[0.88] tracking-wider">
            <span className="block overflow-hidden">
              <span
                id="hero-w1"
                className="block text-[clamp(4.5rem,13vw,11rem)] text-slate-100"
                style={{ transform: "translateY(110%)" }}
              >
                {PERSONAL.firstName}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                id="hero-w2"
                ref={glitchRef}
                data-text={PERSONAL.lastName}
                className="block text-[clamp(4.5rem,13vw,11rem)] text-red-600 glitch-el"
                style={{ transform: "translateY(110%)" }}
              >
                {PERSONAL.lastName}
              </span>
            </span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-10 gap-6">
          <p
            ref={descRef}
            className="font-mono text-[12px] text-gray-400 leading-loose max-w-sm opacity-0"
          >
            <strong className="text-gray-300">
              Fresher fullstack developer
            </strong>{" "}
            with
            <br />
            internship experience at{" "}
            <em className="not-italic text-red-600 font-semibold">
              Trieon Technosolution Pvt Ltd
            </em>
            .<br />
            B.Tech @ GLA University.
            <br />
            <span className="text-gray-500">
              Building the web — one thread at a time. 🕸️
            </span>
          </p>

          <div ref={actionsRef} className="flex gap-3 opacity-0">
            <MagBtn href="#projects" primary>
              See Projects
            </MagBtn>
            <MagBtn href="#contact" primary>
              Hire Me
            </MagBtn>
          </div>
        </div>
      </div>

      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, #e8003d, #1a56ff, transparent)",
          transform: "scaleX(0)",
        }}
      />

      <div className="absolute bottom-16 right-8 md:right-16 font-display text-[8rem] text-red-600/5 leading-none pointer-events-none select-none z-0">
        01
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="w-px h-10 bg-linear-to-b from-red-600 to-transparent animate-pulse" />
        <span className="font-mono text-[9px] text-gray-500 tracking-[0.3em]">
          SCROLL
        </span>
      </div>
    </section>
  );
};

export default Hero;
