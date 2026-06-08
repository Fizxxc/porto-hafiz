type GeneratePayload = {
  kind: string;
  prompt?: string;
  context?: Record<string, unknown>;
  mode?: 'generate' | 'suggestions';
};

const DEFAULT_MODEL =
  process.env.HUGGINGFACE_MODEL || 'openai/gpt-oss-120b:novita';

const FALLBACK_SUGGESTIONS: Record<string, string[]> = {
  about: [
    'Tulis about premium yang menonjolkan taste visual, karakter desain, dan pendekatan kerja yang rapi.',
    'Buat about singkat dengan tone modern, elegan, dan cocok untuk portfolio contemporary.',
    'Tulis about yang menunjukkan Hafiz Al Fariz sebagai siswa DKV dengan arah visual kuat dan eksekusi refined.',
    'Buat paragraf about yang personal, profesional, dan siap tampil di homepage portfolio.'
  ],
  project_description: [
    'Tulis deskripsi project yang menjelaskan konsep, proses visual, dan hasil akhir secara premium.',
    'Buat deskripsi karya yang profesional, mudah dipahami client, dan tetap terasa editorial.',
    'Tulis deskripsi project dengan fokus pada hierarchy, direction visual, dan impresi akhir.',
    'Buat deskripsi project yang singkat tapi tetap menunjukkan kualitas berpikir desain.'
  ],
  project_summary: [
    'Buat ringkasan project satu kalimat yang tajam dan cocok untuk card portfolio.',
    'Tulis summary pendek yang terasa premium dan mudah dipreview pengunjung.',
    'Buat summary yang menonjolkan nilai visual utama dan karakter project ini.',
    'Buat ringkasan singkat, modern, dan profesional untuk halaman project.'
  ],
  default: [
    'Buat versi premium dan lebih rapi.',
    'Tulis versi yang lebih singkat dan elegan.',
    'Buat versi modern dengan tone portfolio.',
    'Tulis versi yang lebih profesional dan siap tampil.'
  ]
};

function extractText(content: unknown): string {
  if (typeof content === 'string') return content;

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object' && 'text' in item) {
          return String((item as { text?: unknown }).text ?? '');
        }
        return '';
      })
      .join('\n')
      .trim();
  }

  return '';
}

function fallbackSuggestions(kind: string) {
  return FALLBACK_SUGGESTIONS[kind] ?? FALLBACK_SUGGESTIONS.default;
}

function stringifyContext(context?: Record<string, unknown>) {
  if (!context) return '';
  return Object.entries(context)
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : String(value ?? '')}`)
    .join('\n');
}

function buildSystemPrompt(kind: string, mode: 'generate' | 'suggestions') {
  if (mode === 'suggestions') {
    return [
      'You are a premium portfolio copywriting assistant.',
      'Generate exactly 4 prompt suggestions.',
      'Each suggestion must be concise, elegant, and usable as a real prompt.',
      'Return plain text only.',
      'Separate each suggestion with ###.'
    ].join(' ');
  }

  return [
    'You are a senior premium portfolio copywriter.',
    'Write polished, modern, bold, tactile, high-contrast text for a contemporary personal portfolio.',
    'Use clean language, strong rhythm, and concise high-end phrasing.',
    'Return only the final text without bullets unless explicitly requested.'
  ].join(' ');
}

function buildUserPrompt(payload: GeneratePayload) {
  const prompt = payload.prompt?.trim() || 'Create the best possible output.';
  const context = stringifyContext(payload.context);

  return `
Task type: ${payload.kind}
User prompt:
${prompt}

Context:
${context || 'No extra context'}
`.trim();
}

function fallbackGeneratedText(
  kind: string,
  prompt?: string,
  context?: Record<string, unknown>
) {
  const title = String(context?.title ?? 'This project');
  const summary = String(context?.summary ?? '');
  const fullName = String(context?.full_name ?? 'Hafiz Al Fariz');

  switch (kind) {
    case 'about':
      return `${fullName} adalah kreator visual yang berfokus pada penyusunan karya dengan pendekatan yang bersih, terarah, dan berkarakter. Melalui sensitivitas terhadap ritme visual, detail, dan presentasi, setiap karya dibangun agar terasa rapi, kuat, dan relevan untuk kebutuhan komunikasi modern.`;

    case 'project_summary':
      return `${title} adalah karya visual yang disusun dengan pendekatan bersih, terarah, dan premium untuk menghasilkan impresi yang kuat dalam sekali lihat.`;

    case 'project_description':
      return `${title} dikembangkan sebagai karya yang menyeimbangkan konsep, struktur visual, dan hasil akhir yang refined. Prosesnya menitikberatkan pada arah visual yang jelas, hierarchy yang rapi, serta penyajian yang mampu membangun impresi profesional dan mudah dipahami. ${summary}`.trim();

    case 'hero_title':
      return 'Selected visual works shaped with quiet confidence and modern clarity.';

    case 'hero_subtitle':
      return 'A contemporary portfolio crafted to present bold visual thinking, clear UX flow, and a curated creative identity.';

    case 'contact_body':
      return 'Open for selected creative collaborations, visual direction, and portfolio-driven design work with a refined and modern approach.';

    default:
      return prompt?.trim()
        ? `Versi premium dari permintaanmu: ${prompt.trim()}`
        : 'Generated premium portfolio copy.';
  }
}

export async function runPortfolioAi(payload: GeneratePayload) {
  const mode = payload.mode ?? 'generate';
  const token =
    process.env.HUGGINGFACE_API_KEY ||
    process.env.HF_TOKEN ||
    '';

  if (!token) {
    return {
      text:
        mode === 'suggestions'
          ? fallbackSuggestions(payload.kind).join('###')
          : fallbackGeneratedText(payload.kind, payload.prompt, payload.context),
      provider: 'fallback',
      model: 'fallback'
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);

  try {
    const response = await fetch(
      'https://router.huggingface.co/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          temperature: mode === 'suggestions' ? 0.95 : 0.72,
          max_tokens: mode === 'suggestions' ? 320 : 520,
          messages: [
            {
              role: 'system',
              content: buildSystemPrompt(payload.kind, mode)
            },
            {
              role: 'user',
              content: buildUserPrompt(payload)
            }
          ]
        }),
        signal: controller.signal,
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return {
        text:
          mode === 'suggestions'
            ? fallbackSuggestions(payload.kind).join('###')
            : fallbackGeneratedText(payload.kind, payload.prompt, payload.context),
        provider: 'fallback',
        model: 'fallback',
        error: errorText
      };
    }

    const data = await response.json();
    const text = extractText(data?.choices?.[0]?.message?.content);

    if (!text) {
      return {
        text:
          mode === 'suggestions'
            ? fallbackSuggestions(payload.kind).join('###')
            : fallbackGeneratedText(payload.kind, payload.prompt, payload.context),
        provider: 'fallback',
        model: 'fallback',
        error: 'AI returned empty content.'
      };
    }

    return {
      text,
      provider: 'huggingface',
      model: DEFAULT_MODEL
    };
  } catch (error) {
    return {
      text:
        mode === 'suggestions'
          ? fallbackSuggestions(payload.kind).join('###')
          : fallbackGeneratedText(payload.kind, payload.prompt, payload.context),
      provider: 'fallback',
      model: 'fallback',
      error: error instanceof Error ? error.message : 'Unknown AI error'
    };
  } finally {
    clearTimeout(timeout);
  }
}