import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SpiderCursor from "./components/SpiderCursor";
import WebBackground from "./components/WebBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    }
  }, []);
  return (
    <div
      className="bg-[#0d0d10] min-h-screen text-[#f0f0f8]"
      style={{ fontFamily: "'DM Sans', sans-serif", cursor: "none" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { cursor: none !important; }
        html { scroll-behavior: smooth; background-color: #0d0d10; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d10; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#e8003d, #1a56ff); border-radius: 10px; }

        /* Subtle scanline overlay - lightened for better readability */
        body::after {
          content: '';
          position: fixed; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 3px);
          pointer-events: none; z-index: 7000; opacity: 0.2;
        }

        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-body { font-family: 'DM Sans', sans-serif; }

        .nav-link { position: relative; overflow: hidden; display: inline-block; }
        .nav-link span { display: block; transition: transform 0.3s ease; }
        .nav-link::before {
          content: attr(data-label);
          position: absolute; top: 100%; left: 0;
          color: #e8003d;
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; letter-spacing: .2em; text-transform: uppercase;
          transition: transform 0.3s ease;
        }
        .nav-link:hover span { transform: translateY(-100%); }
        .nav-link:hover::before { transform: translateY(-100%); }

        /* Improved Glitch Visibility */
        .glitch-el { position: relative; }
        .glitch-el::before, .glitch-el::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: inherit; letter-spacing: inherit; line-height: inherit;
          pointer-events: none; opacity: 0;
        }
        .glitch-el::before { color: #1a56ff; clip-path: polygon(0 25%, 100% 25%, 100% 45%, 0 45%); }
        .glitch-el::after  { color: #ff1a52; clip-path: polygon(0 60%, 100% 60%, 100% 78%, 0 78%); }
        .glitch-active::before { animation: g1 .18s steps(2) forwards; opacity: 0.8; }
        .glitch-active::after  { animation: g2 .18s steps(2) forwards; opacity: 0.8; }
        @keyframes g1 { 0%{transform:translate(-4px,0)} 50%{transform:translate(4px,0)} 100%{transform:translate(-2px,0)} }
        @keyframes g2 { 0%{transform:translate(4px,0)} 50%{transform:translate(-4px,0)} 100%{transform:translate(2px,0)} }
      `}</style>

      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[3px] z-[9000] origin-left scale-x-0"
        style={{
          background: "linear-gradient(90deg, #e8003d, #1a56ff, #e8003d)",
        }}
      />

      <SpiderCursor />
      <WebBackground />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Ticker />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
