import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askPortfolio, summarizeProject, type PortfolioChatTurn } from "@/lib/summary.functions";

export function AiSummary() {
  const run = useServerFn(summarizeProject);
  const ask = useServerFn(askPortfolio);
  const [mode, setMode] = useState<"summarize" | "chat">("summarize");
  const [text, setText] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<PortfolioChatTurn[]>([]);
  const [question, setQuestion] = useState("");
  const [chatError, setChatError] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

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

  async function sendQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentQuestion = question.trim();
    if (!currentQuestion || chatLoading) return;

    setChatError("");
    setQuestion("");
    setChatLoading(true);
    setMessages((previous) => [...previous, { role: "user", text: currentQuestion }]);
    try {
      const history = messages.slice(-10);
      const result = await ask({
        data: { question: currentQuestion, history },
      });
      if ("error" in result && result.error) {
        setChatError(result.error);
        setMessages((previous) => previous.slice(0, -1));
      } else if ("answer" in result && result.answer) {
        setMessages((previous) => [...previous, { role: "model", text: result.answer }]);
      }
    } catch (error) {
      setChatError(
        error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim pertanyaan.",
      );
      setMessages((previous) => previous.slice(0, -1));
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" aria-label="Pilih fitur AI">
        <button
          type="button"
          onClick={() => setMode("summarize")}
          aria-pressed={mode === "summarize"}
          className={`rounded-lg px-4 py-2 text-sm transition ${mode === "summarize" ? "bg-gradient-brand font-medium text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}
        >
          Ringkas Proyek
        </button>
        <button
          type="button"
          onClick={() => setMode("chat")}
          aria-pressed={mode === "chat"}
          className={`rounded-lg px-4 py-2 text-sm transition ${mode === "chat" ? "bg-gradient-brand font-medium text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}
        >
          Tanya AI
        </button>
      </div>

      {mode === "summarize" ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <label htmlFor="desc" className="mb-2 block text-sm">
              Deskripsi proyek kamu
            </label>
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
              <p className="mt-3 text-sm text-muted-foreground">
                {loading
                  ? "AI sedang menulis ringkasan…"
                  : "Ringkasan portofolio akan muncul di sini."}
              </p>
            )}
            {out && (
              <button
                onClick={() => navigator.clipboard.writeText(out)}
                className="mt-4 rounded-lg border border-border px-4 py-2 text-xs hover:border-primary"
              >
                Salin
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="glass rounded-2xl p-5 md:p-6">
          <div className="mb-4">
            <p className="font-display text-lg font-semibold">Tanya tentang portofolio ini</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Asisten AI siap menjawab tentang profil, keahlian, dan proyek Indraprastha.
            </p>
          </div>
          <div
            className="mb-4 flex min-h-64 max-h-[28rem] flex-col gap-3 overflow-y-auto rounded-xl border border-border bg-background/40 p-4"
            aria-live="polite"
          >
            {messages.length === 0 && (
              <p className="m-auto max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
                Coba tanyakan, “Apa saja proyek yang pernah dibuat?” atau “Teknologi apa yang
                digunakan di Kedai Prasmar?”
              </p>
            )}
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "self-end rounded-br-sm bg-primary text-primary-foreground"
                    : "self-start rounded-bl-sm border border-border bg-secondary/70"
                }`}
              >
                {message.text}
              </div>
            ))}
            {chatLoading && (
              <p className="self-start text-sm text-muted-foreground">AI sedang mengetik…</p>
            )}
          </div>
          {chatError && (
            <p className="mb-3 text-sm text-destructive" role="alert">
              {chatError}
            </p>
          )}
          <form onSubmit={sendQuestion} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="portfolio-question" className="sr-only">
              Tulis pertanyaan
            </label>
            <input
              id="portfolio-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              maxLength={1000}
              placeholder="Tulis pertanyaan kamu…"
              className="min-w-0 flex-1 rounded-lg border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:shadow-glow"
            />
            <button
              type="submit"
              disabled={chatLoading || !question.trim()}
              className="rounded-lg bg-gradient-brand px-6 py-3 text-sm font-medium text-primary-foreground transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
            >
              {chatLoading ? "Mengirim…" : "Kirim"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
