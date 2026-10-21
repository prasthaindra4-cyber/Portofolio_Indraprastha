import { useEffect, useRef, useState, type ReactNode } from "react";

/** Card with cursor spotlight + subtle 3D tilt */
export function FxCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rx = ((y / r.height) - 0.5) * -6;
    const ry = ((x / r.width) - 0.5) * 6;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "";
  }
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`card-fx ${className}`}>
      {children}
    </div>
  );
}

/** Soft glow that follows the cursor (desktop only) */
export function CursorGlow() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const on = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", on, { passive: true });
    return () => window.removeEventListener("mousemove", on);
  }, []);
  if (!pos) return null;
  return <div aria-hidden className="cursor-glow" style={{ left: pos.x, top: pos.y }} />;
}

/** Scroll progress bar */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div aria-hidden className="fixed left-0 top-0 z-[60] h-0.5 bg-gradient-brand" style={{ width: `${p * 100}%` }} />;
}
