'use client';

import { type FormEvent, useMemo, useState } from 'react';
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
    <form onSubmit={save} className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
      <div className="space-y-1">
        <p className="section-label">Identity & Contact</p>
        <h3 className="text-2xl tracking-tighter text-white">Manual Personal Profile</h3>
      </div>

      <input className="input-shell" value={form.full_name} onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))} placeholder="Full name" />
      <input className="input-shell" value={form.headline} onChange={(e) => setForm((p) => ({ ...p, headline: e.target.value }))} placeholder="Headline" />
      <input className="input-shell" value={form.school_info} onChange={(e) => setForm((p) => ({ ...p, school_info: e.target.value }))} placeholder="School info" />
      <textarea className="input-shell min-h-[140px]" value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} placeholder="Bio" />

      <div className="grid gap-4 md:grid-cols-2">
        <input className="input-shell" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone" />
        <input className="input-shell" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email" />
      </div>

      <input className="input-shell" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} placeholder="Address" />

      <div className="grid gap-4 md:grid-cols-2">
        <input className="input-shell" value={form.social_links?.ig ?? ''} onChange={(e) => setForm((p) => ({ ...p, social_links: { ...p.social_links, ig: e.target.value } }))} placeholder="Instagram URL" />
        <input className="input-shell" value={form.social_links?.tiktok ?? ''} onChange={(e) => setForm((p) => ({ ...p, social_links: { ...p.social_links, tiktok: e.target.value } }))} placeholder="TikTok URL" />
        <input className="input-shell" value={form.social_links?.youtube ?? ''} onChange={(e) => setForm((p) => ({ ...p, social_links: { ...p.social_links, youtube: e.target.value } }))} placeholder="YouTube URL" />
        <input className="input-shell" value={form.social_links?.behance ?? ''} onChange={(e) => setForm((p) => ({ ...p, social_links: { ...p.social_links, behance: e.target.value } }))} placeholder="Behance URL" />
      </div>

      <button type="submit" className="rounded-full border border-white bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-85">
        Save Profile
      </button>

      <p className="text-sm text-white/[0.55]">{status}</p>
    </form>
  );
}
