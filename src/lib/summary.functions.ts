import { createServerFn } from "@tanstack/react-start";

export const summarizeProject = createServerFn({ method: "POST" })
  .inputValidator((input: { description: string }) => {
    const d = String(input?.description ?? "").trim();
    if (d.length < 20) throw new Error("Deskripsi minimal 20 karakter.");
    if (d.length > 3000) throw new Error("Deskripsi maksimal 3000 karakter.");
    return { description: d };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env['LOVABLE_API_KEY'];
    if (!apiKey) return { error: "Layanan AI belum dikonfigurasi." };
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        system:
          "Kamu penulis portofolio software engineer. Ubah deskripsi proyek menjadi ringkasan portofolio yang menarik dalam bahasa Indonesia natural dengan istilah IT bahasa Inggris bila wajar. Format: satu judul singkat, satu paragraf ringkasan (2-3 kalimat), lalu 3 poin highlight diawali '- '. Jangan mengarang fitur, angka, atau pencapaian yang tidak disebutkan. Tanpa markdown tebal.",
        messages: [{ role: "user", content: data.description }],
        maxRetries: 0,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      const text = await result.text;
      if (!text.trim()) return { error: "AI tidak menghasilkan ringkasan." };
      return { summary: text.trim() };
    } catch (e) {
      const status = (e as { statusCode?: number })?.statusCode;
      console.error("summarize failed", status, e);
      if (status === 429) return { error: "Terlalu banyak permintaan, coba lagi sebentar lagi." };
      if (status === 402 || status === 403) return { error: "Kuota AI sedang tidak tersedia." };
      return { error: "Gagal membuat ringkasan. Coba lagi nanti." };
    }
  });
