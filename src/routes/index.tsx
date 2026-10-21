import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Reveal, Section } from "@/components/portfolio/Reveal";
import { Typing } from "@/components/portfolio/Typing";
import { FxCard, CursorGlow, ScrollProgress } from "@/components/portfolio/Effects";
import { AiSummary } from "@/components/portfolio/AiSummary";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { profile, skills, projects } from "@/data/portfolio";
import kedaiImg from "@/assets/project-kedai.jpg";
import ecomImg from "@/assets/project-ecommerce.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Indraprastha — Portofolio IT | Informatika Universitas Gunadarma" },
      { name: "description", content: "Portofolio Indraprastha, mahasiswa S1 Informatika Universitas Gunadarma dan aspiring software developer." },
      { property: "og:title", content: "Indraprastha — Portofolio IT" },
      { property: "og:description", content: "Informatics Student | Aspiring Software Developer di Universitas Gunadarma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const btn = "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition";
const ext = (url: string) => (url.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

function Index() {
  return (
    <div className="relative overflow-x-hidden">
      <ScrollProgress />
      <CursorGlow />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="aurora absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-primary/20 blur-[120px]" />
        <div className="aurora absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-[120px] [animation-delay:-6s]" />
      </div>
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[900px]" />
      <Navbar />

      <main className="relative">
        {/* HERO */}
        <section id="home" className="mx-auto grid min-h-[min(900px,100svh)] max-w-6xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <p className="rise glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
              <span className="pulse-dot h-2 w-2 rounded-full bg-primary" /> Terbuka untuk kolaborasi &amp; magang
            </p>
            <h1 className="rise mt-6 text-[clamp(3.25rem,7vw,5.75rem)] font-bold leading-[0.98] tracking-[-0.055em] [animation-delay:.12s]">
              Halo, saya <br /><span className="text-shine">{profile.name}</span>
            </h1>
            <p className="rise mt-6 font-display text-lg text-muted-foreground [animation-delay:.24s] md:text-xl">
              <Typing text={profile.role} />
            </p>
            <p className="rise mt-5 max-w-lg text-base leading-7 text-muted-foreground [animation-delay:.36s]">{profile.tagline}</p>
            <div className="rise mt-9 flex flex-wrap gap-3 [animation-delay:.48s]">
              <a href="#projects" className={`${btn} group bg-gradient-brand text-primary-foreground hover:-translate-y-0.5 hover:shadow-glow`}>
                Lihat Proyek <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#contact" className={`${btn} glass hover:-translate-y-0.5 hover:border-primary`}>Hubungi Saya</a>
            </div>
          </div>
          <div className="rise mx-auto [animation-delay:.3s]">
            <div className="animate-float relative px-3 py-4">
              <div aria-hidden className="absolute inset-0 rounded-[2rem] border border-primary/20 rotate-[-7deg]" />
              <div className="glass relative flex h-[23rem] w-[min(19rem,78vw)] items-center justify-center overflow-hidden rounded-[1.75rem] md:h-[27rem] md:w-[21rem]">
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_62%)]" />
                <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
                <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-accent/20" />
                <div aria-hidden className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full border border-primary/20" />
                {profile.photo ? (
                  <img src={profile.photo} alt={`Foto ${profile.name}`} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="relative text-center">
                    <p className="text-shine font-display text-8xl font-bold tracking-[-0.08em]">IP</p>
                    <div className="mx-auto mt-5 h-px w-12 bg-gradient-brand" />
                    <p className="mt-4 font-display text-sm font-semibold tracking-[0.2em]">{profile.name.toUpperCase()}</p>
                    <p className="mt-2 text-[10px] tracking-[0.24em] text-muted-foreground">DEVELOPER IN PROGRESS</p>
                  </div>
                )}
                <span className="absolute bottom-5 left-5 rounded-full border border-border bg-background/60 px-3 py-1.5 text-[10px] tracking-[0.18em] text-muted-foreground backdrop-blur">PORTFOLIO · 2026</span>
              </div>
              <code className="glass absolute -bottom-1 -left-5 rounded-lg px-3 py-2 text-xs text-primary md:-left-8">const dev = "indra";</code>
              <code className="glass absolute right-0 top-8 rounded-lg px-3 py-2 text-xs text-accent md:-right-5">{"<React />"}</code>
            </div>
          </div>
        </section>

        {/* TECH MARQUEE */}
        <div className="relative overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="marquee flex w-max gap-12 font-display text-lg text-muted-foreground">
            {[...Array(2)].flatMap((_, k) =>
              ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "SQL", "Git", "REST API", "AI"].map((t) => (
                <span key={`${k}-${t}`} className="flex items-center gap-12">{t}<span className="text-primary">✦</span></span>
              )),
            )}
          </div>
        </div>

        {/* ABOUT */}
        <Section id="about" kicker="about me" title="Tentang Saya">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <p className="leading-relaxed text-muted-foreground">
                Saya mahasiswa S1 Informatika di Universitas Gunadarma yang tertarik pada <span className="text-foreground">web development</span>, teknologi <span className="text-foreground">AI</span>, <span className="text-foreground">database</span>, dan problem solving menggunakan teknologi. Saya senang mempelajari cara membangun aplikasi dari sisi frontend hingga backend, serta menerapkannya untuk kebutuhan nyata — termasuk usaha kuliner yang saya kelola sendiri.
              </p>
            </Reveal>
            <Reveal className="glass rounded-2xl p-6">
              <p className="text-xs text-primary">EDUCATION</p>
              <h3 className="mt-2 text-xl font-semibold">Universitas Gunadarma</h3>
              <p className="text-muted-foreground">S1 Informatika</p>
              <p className="mt-3 text-sm text-accent">2023 – Sekarang</p>
            </Reveal>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" kicker="tech stack" title="Technical Skills">
          <p className="-mt-8 mb-8 text-sm text-muted-foreground">Teknologi yang sedang saya pelajari dan gunakan.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <Reveal key={s.name}><FxCard className="glass group h-full rounded-2xl p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 font-display text-lg text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">{s.icon}</div>
                <h3 className="mt-4 font-semibold">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.note}</p>
              </FxCard></Reveal>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" kicker="featured work" title="Proyek Pilihan">
          <div className="grid gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.title} className={`glass card-fx group flex flex-col overflow-hidden rounded-2xl hover:-translate-y-1 lg:flex-row ${i % 2 ? "lg:flex-row-reverse" : ""}`}>
                {i < 2 ? (
                  <img src={p.image ?? (i === 0 ? kedaiImg : ecomImg)} alt={`Preview ${p.title}`} width={1280} height={800} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:w-1/2" />
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-secondary font-display text-muted-foreground">{"{ preview }"}</div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {p.status && <span className="w-fit rounded-full border border-accent/40 px-3 py-0.5 text-xs text-accent">{p.status}</span>}
                  <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">{t}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-3 pt-6">
                    <a href={p.demo} {...ext(p.demo)} className={`${btn} bg-gradient-brand py-2 text-primary-foreground hover:shadow-glow`}>Live Demo</a>
                    <a href={p.source} {...ext(p.source)} className={`${btn} glass py-2 hover:border-primary`}>Source Code</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* AI SUMMARY */}
        <Section id="ai" kicker="ai lab" title="AI Lab">
          <p className="-mt-8 mb-8 text-sm text-muted-foreground">Buat ringkasan proyek atau tanyakan sesuatu tentang portofolio ini kepada asisten AI.</p>
          <Reveal><AiSummary /></Reveal>
        </Section>

        {/* EXPERIENCE + EDUCATION */}
        <Section id="experience" kicker="journey" title="Experience & Education">
          <ol className="relative ml-3 space-y-10 border-l border-border pl-8">
            <Reveal>
              <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-primary shadow-glow" />
              <p className="text-sm text-primary">2023 – Sekarang · Kewirausahaan</p>
              <h3 className="mt-1 text-xl font-semibold">Pengelola Usaha — Kedai Prasmar</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Melayani pelanggan secara langsung dan menangani pesanan.</li>
                <li>Mengelola transaksi, stok, dan pembelian bahan baku.</li>
                <li>Melakukan pencatatan operasional dan pengelolaan usaha sehari-hari.</li>
              </ul>
              <p className="mt-3 text-sm">Melatih <span className="text-primary">problem solving</span>, <span className="text-primary">komunikasi</span>, dan <span className="text-primary">manajemen operasional</span>.</p>
            </Reveal>
            <Reveal>
              <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-accent" />
              <p className="text-sm text-accent">2023 – Sekarang · Pendidikan</p>
              <h3 className="mt-1 text-xl font-semibold">Universitas Gunadarma</h3>
              <p className="text-sm text-muted-foreground">S1 Informatika</p>
            </Reveal>
          </ol>
        </Section>

        {/* CONTACT */}
        <Section id="contact" kicker="contact" title="Mari Bangun Sesuatu Bersama">
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <p className="text-muted-foreground">Punya ide proyek, peluang kolaborasi, atau sekadar ingin menyapa? Hubungi saya melalui salah satu kanal berikut.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className={`${btn} glass hover:border-primary`}>Email</a>
                <a href={profile.github} {...ext(profile.github)} className={`${btn} glass hover:border-primary`}>GitHub</a>
                <a href={profile.linkedin} {...ext(profile.linkedin)} className={`${btn} glass hover:border-primary`}>LinkedIn</a>
              </div>
            </Reveal>
            <Reveal><ContactForm /></Reveal>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Indraprastha · Built with code &amp; curiosity
      </footer>
    </div>
  );
}
