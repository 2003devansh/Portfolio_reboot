import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TICKER_ITEMS } from "../data";

export default function Ticker() {
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.to(trackRef.current, {
      x: "-50%",
      duration: 22,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="border-y border-[#1a1a2e] bg-[#0d0d14] overflow-hidden py-3 relative z-10">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-8 font-display text-base tracking-[0.35em] text-[#334] shrink-0 hover:text-[#e8003d] transition-colors duration-300 cursor-none"
          >
            {item}
            <span className="text-[#e8003d] font-mono text-[10px] font-normal tracking-widest">
              ///
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
