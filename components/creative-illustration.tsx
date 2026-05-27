export function CreativeIllustration() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="relative space-y-4">
        <p className="font-ui text-xs uppercase tracking-[0.28em] text-white/[0.45]">unDraw Placeholder</p>
        <div className="illustration-bw flex min-h-[320px] items-center justify-center rounded-[1.5rem] border border-dashed border-white/10 bg-black/40 text-center text-white/40">
          Drop your unDraw SVG here:
          <br />
          <span className="mt-2 block text-white/[0.65]">/public/illustrations/creative-process.svg</span>
        </div>
        <div className="space-y-2 text-sm leading-7 text-white/[0.55]">
          <p>
            Untuk ubah warna SVG unDraw menjadi hitam-putih, kamu bisa:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Ganti fill utama SVG ke <code>#ffffff</code> dan aksen ke <code>#000000</code>.</li>
            <li>Atau pakai class <code>.illustration-bw</code> dengan CSS filter untuk desaturate penuh.</li>
            <li>Untuk SVG React component, expose props lalu map warna ke token neobrutalism.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
