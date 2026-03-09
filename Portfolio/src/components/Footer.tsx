import { PERSONAL } from "../data";

export default function Footer() {
    return (
        <footer className="relative z-10 bg-gray-950 border-t border-gray-800 px-8 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <span className="font-mono text-[10px] text-gray-600 tracking-[0.2em]">
                © 2025 <span className="text-red-600">—</span> {PERSONAL.name}{" "}
                <span className="text-red-600">✦</span> Portfolio
            </span>
            <span className="font-mono text-[10px] text-gray-600 tracking-[0.2em] text-center">
                🕷️ YOUR FRIENDLY NEIGHBOURHOOD{" "}
                <span className="text-red-600">WEB</span> DEVELOPER
            </span>
            <span className="font-mono text-[10px] text-gray-600 tracking-[0.2em]">
                GLA UNIVERSITY <span className="text-red-600">|</span>Fullstack
                development
            </span>
        </footer>
    );
}
