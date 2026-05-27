'use client';

import { type FormEvent, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/browser';

export function AdminAuthGate() {
  const supabase = useMemo(() => createClient(), []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('Memverifikasi akun...');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);
      setMessage(error.message);
      return;
    }

    window.location.href = '/admin';
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
      <div className="space-y-2">
        <p className="section-label">Restricted Route</p>
        <h2 className="text-3xl tracking-[-0.05em] text-white">Login Admin Access</h2>
        <p className="text-sm leading-7 text-white/[0.55]">
          Masukkan email dan password admin untuk mengakses dashboard. Pastikan juga kamu adalah <code>ADMIN</code>.
        </p>
      </div>

      <input className="input-shell" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email" type="email" required />
      <input className="input-shell" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />

      <button className="w-full rounded-full border border-white bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-85" type="submit" disabled={loading}>
        {loading ? 'Checking...' : 'Enter Dashboard'}
      </button>

      <p className="text-sm text-white/[0.55]">{message}</p>
    </form>
  );
}
