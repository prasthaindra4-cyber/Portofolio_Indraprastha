import { useEffect, useState } from "react";

export function Typing({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(text.length);
    const t = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(t), v) : v + 1)), 45);
    return () => clearInterval(t);
  }, [text]);
  return (
    <span aria-label={text}>
      <span aria-hidden>{text.slice(0, n)}</span>
      <span aria-hidden className="caret text-primary">|</span>
    </span>
  );
}
