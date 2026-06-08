import { createClient } from '@/lib/supabase/server';

const BUILT_IN_ADMIN_EMAILS = ['kographh@gmail.com'];

function getAllowedAdminEmails() {
  const fromEnv = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return new Set([...BUILT_IN_ADMIN_EMAILS, ...fromEnv]);
}

export function isAllowedAdminEmail(email?: string | null) {
  if (!email) return false;
  return getAllowedAdminEmails().has(email.trim().toLowerCase());
}

export async function getAdminSession() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, isAdmin: false };
  }

  const isEmailAdmin = isAllowedAdminEmail(user.email);

  const { data } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  return { user, isAdmin: isEmailAdmin || Boolean(data) };
}
