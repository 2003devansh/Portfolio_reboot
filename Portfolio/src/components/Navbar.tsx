import gsap from "gsap";
import { useEffect, useRef } from "react";

const SpiderLogo = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="9" fill="#e8003d" />
    <ellipse cx="20" cy="20" rx="4.5" ry="9" fill="#003bbf" opacity="0.8" />
    <ellipse
      cx="16.5"
      cy="17"
      rx="3.5"
      ry="2.5"
      fill="white"
      transform="rotate(-12 16.5 17)"
    />
    <ellipse
      cx="23.5"
      cy="17"
      rx="3.5"
      ry="2.5"
      fill="white"
      transform="rotate(12 23.5 17)"
    />
    <ellipse
      cx="16.5"
      cy="17"
      rx="1.8"
      ry="1.4"
      fill="#1a56ff"
      transform="rotate(-12 16.5 17)"
    />
    <ellipse
      cx="23.5"
      cy="17"
      rx="1.8"
      ry="1.4"
      fill="#1a56ff"
      transform="rotate(12 23.5 17)"
    />
    {[
      [20, 11, 20, 2],
      [8, 15, 2, 8],
      [32, 15, 38, 8],
      [5, 21, 0, 20],
      [35, 21, 40, 20],
      [9, 30, 3, 36],
      [31, 30, 37, 36],
      [20, 29, 20, 38],
    ].map(([x1, y1, x2, y2], i) => (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="rgba(200,216,255,0.55)"
        strokeWidth="1.2"
      />
    ))}
  </svg>
);

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const Navbar = () => {
  const navRef = useRef(null);
  const lastY = useRef(0);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 },
    );

    const onScroll = () => {
      const y = window.scrollY;
      gsap.to(navRef.current, {
        y: y > lastY.current && y > 80 ? -80 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-500 flex items-center justify-between px-8 md:px-16 py-4 bg-[rgba(6,6,8,0.9)] backdrop-blur-xl border-b border-[#1a1a2e]">
      <a href="#" className="flex items-center gap-2 group no-underline">
        <div className="group-hover:rotate-180 tracking-widest text-red-500">
          <SpiderLogo />
        </div>
        <span className="font-displat text-2xl tracking-widest text-red-500">
          DEV
        </span>
      </a>

      <div className="hidden md:flex gap-8">
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            data-label={label}
            className="nav-link font-mono text=[11px] text-[#556] hover:text-transparent -tracking-tight uppercase transition-colors duration-300"
          >
            <span>{label}</span>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2 font-mono text-[10px] text-red-500 tracking-[0.2em] uppercase px-3 py-1.5 border border-[rgba(232,0,61,0.3)] bg-[rgba(232,0,61,0.05)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] shadow-[0_0_8px_#00e676] animate-pulse" />
        🕷 Open to Work
      </div>
    </nav>
  );
};

export default Navbar;
