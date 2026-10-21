import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { summarizeProject } from "@/lib/summary.functions";

export function AiSummary() {
  const run = useServerFn(summarizeProject);
  const [text, setText] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function go() {
    setErr("");
    setOut("");
    if (text.trim().length < 20) return setErr("Deskripsi minimal 20 karakter.");
    setLoading(true);
    try {
      const r = await run({ data: { description: text } });
      if ("error" in r && r.error) setErr(r.error);
      else if ("summary" in r && r.summary) setOut(r.summary);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="glass rounded-2xl p-6">
        <label htmlFor="desc" className="mb-2 block text-sm">Deskripsi proyek kamu</label>
        <textarea
          id="desc"
          rows={8}
          maxLength={3000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Contoh: Aplikasi to-do list dengan React dan Firebase, ada login, kategori tugas, dan pengingat..."
          className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:shadow-glow"
        />
        <button
          onClick={go}
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-gradient-brand py-3 font-medium text-primary-foreground transition hover:shadow-glow disabled:opacity-60"
        >
          {loading ? "Sedang meringkas…" : "✦ Buat Ringkasan AI"}
        </button>
        {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
      </div>
      <div className="glass min-h-64 rounded-2xl p-6" aria-live="polite">
        <p className="text-xs text-primary">AI OUTPUT</p>
        {out ? (
          <div className="mt-3 whitespace-pre-line text-sm leading-relaxed">{out}</div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">{loading ? "AI sedang menulis ringkasan…" : "Ringkasan portofolio akan muncul di sini."}</p>
        )}
        {out && (
          <button onClick={() => navigator.clipboard.writeText(out)} className="mt-4 rounded-lg border border-border px-4 py-2 text-xs hover:border-primary">
            Salin
          </button>
        )}
      </div>
    </div>
  );
}
