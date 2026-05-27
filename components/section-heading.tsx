export function SectionHeading({ label, title, body }: { label: string; title: string; body?: string }) {
  return (
    <div className="space-y-3">
      <p className="section-label">{label}</p>
      <h2 className="max-w-3xl text-4xl leading-tight tracking-[-0.065em] md:text-5xl">{title}</h2>
      {body ? <p className="max-w-2xl text-sm leading-7 text-white/[0.58] md:text-base">{body}</p> : null}
    </div>
  );
}
