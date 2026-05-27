import type { SecurityEvent } from '@/types';

type Props = {
  events: SecurityEvent[];
};

export function SecurityEventsCard({ events }: Props) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
      <div className="space-y-1">
        <p className="section-label">Security Event Log</p>
        <h3 className="text-2xl tracking-tighter text-white">Best-effort preview protection log</h3>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/[0.55]">
        Log ini menampilkan aktivitas yang terdeteksi sebagai potensi risiko keamanan, seperti percobaan login yang mencurigakan, aktivitas tidak biasa, atau pelanggaran keamanan lainnya. Meskipun tidak semua aktivitas berbahaya dapat dideteksi, log ini memberikan gambaran tentang upaya perlindungan yang sedang berlangsung untuk menjaga keamanan sistem.
      </p>

      <div className="mt-6 space-y-3">
        {events.length ? (
          events.map((event) => (
            <div key={event.id} className="rounded-[1.4rem] border border-white/10 bg-black/25 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm tracking-[-0.02em] text-white">{event.event_type.replaceAll('_', ' ')}</p>
                  <p className="mt-1 text-xs text-white/45">{new Date(event.created_at).toLocaleString()} · {event.ip_address}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/55">
                  {event.project_slug || 'global'}
                </span>
              </div>
              <p className="mt-3 line-clamp-2 text-xs leading-6 text-white/45">{event.user_agent}</p>
            </div>
          ))
        ) : (
          <div className="rounded-[1.4rem] border border-dashed border-white/10 bg-black/20 p-4 text-sm text-white/45">
            Belum ada security event yang tercatat.
          </div>
        )}
      </div>
    </section>
  );
}
