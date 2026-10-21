import { useEffect, useState } from "react";

const links = ["Home", "About", "Skills", "Projects", "AI", "Experience", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass" : "border-b border-transparent"}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Navigasi utama">
        <a href="#home" className="font-display text-lg font-bold">
          indra<span className="text-primary">.dev</span>
        </a>
        <ul className="hidden gap-7 md:flex">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <button className="md:hidden" aria-label="Buka menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="block h-0.5 w-6 bg-foreground" />
          <span className="mt-1.5 block h-0.5 w-6 bg-foreground" />
        </button>
      </nav>
      {open && (
        <ul className="glass mx-4 mb-4 rounded-xl p-4 md:hidden">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block py-2 text-muted-foreground hover:text-primary">
                {l}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
