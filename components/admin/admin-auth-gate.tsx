'use client';

import { type FormEvent, useMemo, useState } from 'react';
import { ArrowRight, LoaderCircle, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase/browser';

export function AdminAuthGate() {
  const supabase = useMemo(() => createClient(), []);
  const [email, setEmail] = useState('kographh@gmail.com');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Masukkan password admin untuk membuka dashboard.');
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
    <form onSubmit={handleSubmit} className="admin-card mx-auto w-full max-w-lg space-y-5 p-5 sm:p-7 md:p-8">
      <div className="space-y-3">
        <p className="section-label"><Shield className="h-3.5 w-3.5" /> Restricted Route</p>
        <h2 className="text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--text)] md:text-4xl">Login Admin Control</h2>
        <p className="text-sm font-medium leading-7 text-[var(--muted)]">
          Email admin utama: <code className="rounded-lg bg-[var(--surface-2)] px-2 py-1">kographh@gmail.com</code>.
        </p>
      </div>

      <label className="block space-y-2">
        <span className="field-label">Email</span>
        <input className="input-shell" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kographh@gmail.com" type="email" required />
      </label>

      <label className="block space-y-2">
        <span className="field-label">Password</span>
        <input className="input-shell" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
      </label>

      <button className="btn-primary w-full px-5 py-3 text-sm" type="submit" disabled={loading}>
        {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        {loading ? 'Checking Access...' : 'Open Dashboard'}
      </button>

      <p className="status-pill w-full justify-center text-center">{message}</p>
    </form>
  );
}
