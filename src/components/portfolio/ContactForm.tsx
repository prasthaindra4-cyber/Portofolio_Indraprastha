import { useState, type FormEvent } from "react";
import { profile } from "@/data/portfolio";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const message = String(f.get("message") || "").trim();
    const err: Errors = {};
    if (name.length < 2) err.name = "Nama minimal 2 karakter.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = "Format email tidak valid.";
    if (message.length < 10) err.message = "Pesan minimal 10 karakter.";
    setErrors(err);
    if (Object.keys(err).length) return;
    // Membuka aplikasi email pengunjung dengan pesan yang sudah terisi.
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Halo dari " + name)}&body=${body}`;
    setSent(true);
  }

  const field = "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:shadow-glow";
  return (
    <form onSubmit={submit} noValidate className="glass space-y-4 rounded-2xl p-6">
      {(["name", "email"] as const).map((k) => (
        <div key={k}>
          <label htmlFor={k} className="mb-1 block text-sm">{k === "name" ? "Nama" : "Email"}</label>
          <input id={k} name={k} type={k === "email" ? "email" : "text"} className={field} aria-invalid={!!errors[k]} />
          {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="mb-1 block text-sm">Pesan</label>
        <textarea id="message" name="message" rows={4} className={field} aria-invalid={!!errors.message} />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
      </div>
      <button type="submit" className="w-full rounded-lg bg-gradient-brand py-3 font-medium text-primary-foreground transition hover:shadow-glow">
        Kirim Pesan
      </button>
      {sent && <p className="text-center text-sm text-primary">Aplikasi email kamu sedang dibuka…</p>}
    </form>
  );
}
