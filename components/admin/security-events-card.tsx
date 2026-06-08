import { ShieldAlert } from 'lucide-react';
import type { SecurityEvent } from '@/types';

type Props = {
  events: SecurityEvent[];
};

export function SecurityEventsCard({ events }: Props) {
  return (
    <section className="admin-card p-5 sm:p-6">
      <div className="space-y-2">
        <p className="section-label"><ShieldAlert className="h-3.5 w-3.5" /> Security Log</p>
        <h3 className="text-2xl font-black tracking-[-0.05em] text-[var(--text)]">Preview protection log</h3>
      </div>

      <p className="mt-4 text-sm font-medium leading-7 text-[var(--muted)]">
        Log ini menampilkan aktivitas yang terdeteksi sebagai potensi risiko keamanan, seperti percobaan login mencurigakan, aktivitas tidak biasa, atau pelanggaran keamanan lainnya.
      </p>

      <div className="mt-6 max-h-[420px] space-y-3 overflow-auto pr-1">
        {events.length ? (
          events.map((event) => (
            <div key={event.id} className="rounded-3xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold tracking-[-0.02em] text-[var(--text)]">{event.event_type.replaceAll('_', ' ')}</p>
                  <p className="mt-1 text-xs font-medium text-[var(--muted)]">{new Date(event.created_at).toLocaleString()} · {event.ip_address}</p>
                </div>
                <span className="status-pill min-h-8 px-3 py-1 text-xs">
                  {event.project_slug || 'global'}
                </span>
              </div>
              <p className="mt-3 line-clamp-2 text-xs leading-6 text-[var(--muted)]">{event.user_agent}</p>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-[var(--line-strong)] bg-[var(--surface-2)] p-4 text-sm font-medium text-[var(--muted)]">
            Belum ada security event yang tercatat.
          </div>
        )}
      </div>
    </section>
  );
}
