// Edit seluruh konten portofolio di file ini.
export const profile = {
  name: "Indraprastha",
  role: "Informatics Student | Aspiring Software Developer",
  tagline: "Building digital experiences through code, creativity, and technology.",
  photo: "", // isi dengan URL foto kamu, mis. "/images/foto.jpg"
  email: "email-kamu@example.com", // GANTI
  github: "https://github.com/prasthaindra4-cyber",
  linkedin: "https://linkedin.com/in/username", // GANTI
};

export const skills = [
  { icon: "</>", name: "HTML, CSS, JavaScript", note: "Fondasi web" },
  { icon: "⚛", name: "React & TypeScript", note: "Frontend modern" },
  { icon: "⬢", name: "Node.js & Express.js", note: "Backend & API" },
  { icon: "◈", name: "MongoDB & SQL", note: "Database" },
  { icon: "⎇", name: "Git & GitHub", note: "Version control" },
  { icon: "✦", name: "REST API & Integrasi AI", note: "Koneksi layanan" },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  demo: string;
  source: string;
  status?: string;
};

export const projects: Project[] = [
  {
    title: "Kedai Prasmar – Online Ordering Website",
    description:
      "Website pemesanan makanan untuk usaha kuliner dengan katalog menu, keranjang belanja, checkout, dan konsep integrasi AI chatbot untuk membantu pelanggan mendapatkan informasi menu.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "AI API"],
    demo: "#", // GANTI dengan link demo
    source: "https://github.com/prasthaindra4-cyber",
    status: "Portfolio project",
  },
  {
    title: "E-Commerce Website",
    description:
      "Website e-commerce dengan katalog produk, keranjang belanja, dan alur checkout untuk pengalaman belanja online.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    demo: "#", // GANTI dengan link demo
    source: "https://github.com/prasthaindra4-cyber",
    status: "Portfolio project",
  },
];
