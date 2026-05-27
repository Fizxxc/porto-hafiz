import { NextResponse } from 'next/server';
import { runPortfolioAi } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      kind?: string;
      prompt?: string;
      context?: Record<string, unknown>;
      mode?: 'generate' | 'suggestions';
    };

    if (!body?.kind) {
      return NextResponse.json(
        { error: 'Field "kind" wajib diisi.' },
        { status: 400 }
      );
    }

    const result = await runPortfolioAi({
      kind: body.kind,
      prompt: body.prompt,
      context: body.context,
      mode: body.mode ?? 'generate'
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        text: 'Generate gagal, tapi route tetap merespons aman.',
        provider: 'fallback',
        model: 'fallback',
        error: error instanceof Error ? error.message : 'Unknown route error'
      },
      { status: 200 }
    );
  }
}