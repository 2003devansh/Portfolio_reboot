import { PERSONAL } from "../data";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#0d0d14] border-t border-[#1a1a2e] px-8 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
      <span className="font-mono text-[10px] text-[#334] tracking-[0.2em]">
        © 2025 <span className="text-[#e8003d]">—</span> {PERSONAL.name}{" "}
        <span className="text-[#e8003d]">✦</span> Portfolio
      </span>
      <span className="font-mono text-[10px] text-[#334] tracking-[0.2em] text-center">
        🕷️ YOUR FRIENDLY NEIGHBOURHOOD{" "}
        <span className="text-[#e8003d]">WEB</span> DEVELOPER
      </span>
      <span className="font-mono text-[10px] text-[#334] tracking-[0.2em]">
        GLA UNIVERSITY <span className="text-[#e8003d]">|</span> MERN STACK
      </span>
    </footer>
  );
}
