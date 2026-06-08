'use client';

import { type FormEvent, useMemo, useState } from 'react';
import { Save, UserRound } from 'lucide-react';
import { createClient } from '@/lib/supabase/browser';
import type { Profile } from '@/types';

export function ProfileForm({ profile }: { profile: Profile }) {
  const supabase = useMemo(() => createClient(), []);
  const [form, setForm] = useState(profile);
  const [status, setStatus] = useState('Idle');

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('Saving profile...');

    const { error } = await (supabase.from('profiles') as any).upsert({
      id: form.id,
      full_name: form.full_name,
      headline: form.headline,
      school_info: form.school_info,
      bio: form.bio,
      phone: form.phone,
      email: form.email,
      address: form.address,
      social_links: form.social_links
    });

    if (error) return setStatus(error.message);
    setStatus('Profile updated.');
  };

  return (
    <form onSubmit={save} className="admin-card space-y-5 p-5 sm:p-6">
      <div className="space-y-2">
        <p className="section-label"><UserRound className="h-3.5 w-3.5" /> Identity & Contact</p>
        <h3 className="text-2xl font-black tracking-[-0.05em] text-[var(--text)]">Manual Personal Profile</h3>
        <p className="text-sm font-medium leading-7 text-[var(--muted)]">Update data profil, kontak, dan link sosial yang tampil di website.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 sm:col-span-2">
          <span className="field-label">Full name</span>
          <input className="input-shell" value={form.full_name} onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))} placeholder="Full name" />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="field-label">Headline</span>
          <input className="input-shell" value={form.headline} onChange={(e) => setForm((p) => ({ ...p, headline: e.target.value }))} placeholder="Headline" />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="field-label">School info</span>
          <input className="input-shell" value={form.school_info} onChange={(e) => setForm((p) => ({ ...p, school_info: e.target.value }))} placeholder="School info" />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="field-label">Bio</span>
          <textarea className="input-shell min-h-[140px]" value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} placeholder="Bio" />
        </label>
        <label className="block space-y-2">
          <span className="field-label">Phone</span>
          <input className="input-shell" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone" />
        </label>
        <label className="block space-y-2">
          <span className="field-label">Email</span>
          <input className="input-shell" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email" />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="field-label">Address</span>
          <input className="input-shell" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} placeholder="Address" />
        </label>
      </div>

      <div className="form-subpanel space-y-4">
        <div>
          <p className="section-label">Social Links</p>
          <p className="mt-2 text-sm font-medium text-[var(--muted)]">Masukkan URL sosial media. Field kosong tidak akan ditampilkan.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="input-shell" value={form.social_links?.ig ?? ''} onChange={(e) => setForm((p) => ({ ...p, social_links: { ...p.social_links, ig: e.target.value } }))} placeholder="Instagram URL" />
          <input className="input-shell" value={form.social_links?.tiktok ?? ''} onChange={(e) => setForm((p) => ({ ...p, social_links: { ...p.social_links, tiktok: e.target.value } }))} placeholder="TikTok URL" />
          <input className="input-shell" value={form.social_links?.youtube ?? ''} onChange={(e) => setForm((p) => ({ ...p, social_links: { ...p.social_links, youtube: e.target.value } }))} placeholder="YouTube URL" />
          <input className="input-shell" value={form.social_links?.behance ?? ''} onChange={(e) => setForm((p) => ({ ...p, social_links: { ...p.social_links, behance: e.target.value } }))} placeholder="Behance URL" />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary px-5 py-3 text-sm">
          <Save className="h-4 w-4" /> Save Profile
        </button>
        <p className="status-pill">{status}</p>
      </div>
    </form>
  );
}
