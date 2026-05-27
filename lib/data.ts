import { fallbackProfile, fallbackProjects, fallbackSiteContent } from '@/lib/seed';
import { createClient } from '@/lib/supabase/server';
import type { GalleryItem, Profile, Project, SecurityEvent, SiteContent, SoftwareItem } from '@/types';

const hasEnv = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function asStringArray(value: unknown, fallback: string[] = []): string[] {
  if (!Array.isArray(value)) return fallback;
  return value.map((item) => String(item ?? '').trim()).filter(Boolean);
}

function asSoftwareArray(value: unknown, fallback: SoftwareItem[] = []): SoftwareItem[] {
  if (!Array.isArray(value)) return fallback;
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const row = item as { name?: unknown; icon_url?: unknown };
      const name = String(row.name ?? '').trim();
      if (!name) return null;
      return {
        name,
        icon_url: row.icon_url ? String(row.icon_url) : ''
      };
    })
    .filter(Boolean) as SoftwareItem[];
}

function asGalleryArray(value: unknown, fallback: GalleryItem[] = []): GalleryItem[] {
  if (!Array.isArray(value)) return fallback;
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const row = item as { url?: unknown; label?: unknown };
      const url = String(row.url ?? '').trim();
      if (!url) return null;
      return {
        url,
        label: String(row.label ?? '').trim() || 'Portfolio asset'
      };
    })
    .filter(Boolean) as GalleryItem[];
}

function toProfile(row: unknown): Profile {
  const safe = row && typeof row === 'object' ? (row as Record<string, unknown>) : {};

  return {
    id: String(safe.id ?? fallbackProfile.id),
    created_at: String(safe.created_at ?? fallbackProfile.created_at ?? new Date().toISOString()),
    full_name: String(safe.full_name ?? fallbackProfile.full_name),
    headline: String(safe.headline ?? fallbackProfile.headline),
    school_info: String(safe.school_info ?? fallbackProfile.school_info),
    bio: String(safe.bio ?? fallbackProfile.bio),
    phone: String(safe.phone ?? fallbackProfile.phone),
    email: String(safe.email ?? fallbackProfile.email),
    address: String(safe.address ?? fallbackProfile.address),
    social_links:
      safe.social_links && typeof safe.social_links === 'object'
        ? (safe.social_links as Profile['social_links'])
        : fallbackProfile.social_links
  };
}

function toSiteContent(row: unknown): SiteContent {
  const safe = row && typeof row === 'object' ? (row as Record<string, unknown>) : {};

  return {
    id: String(safe.id ?? fallbackSiteContent.id),
    created_at: String(safe.created_at ?? fallbackSiteContent.created_at ?? new Date().toISOString()),
    hero_badge: String(safe.hero_badge ?? fallbackSiteContent.hero_badge),
    hero_title: String(safe.hero_title ?? fallbackSiteContent.hero_title),
    hero_subtitle: String(safe.hero_subtitle ?? fallbackSiteContent.hero_subtitle),
    about_title: String(safe.about_title ?? fallbackSiteContent.about_title),
    about_body: String(safe.about_body ?? fallbackSiteContent.about_body),
    about_highlights: asStringArray(safe.about_highlights, fallbackSiteContent.about_highlights),
    focus_title: String(safe.focus_title ?? fallbackSiteContent.focus_title),
    focus_items: asStringArray(safe.focus_items, fallbackSiteContent.focus_items),
    software_stack: asSoftwareArray(safe.software_stack, fallbackSiteContent.software_stack),
    portfolio_drive_url: String(safe.portfolio_drive_url ?? fallbackSiteContent.portfolio_drive_url),
    contact_title: String(safe.contact_title ?? fallbackSiteContent.contact_title),
    contact_body: String(safe.contact_body ?? fallbackSiteContent.contact_body)
  };
}

function toProject(row: unknown): Project {
  const safe = row && typeof row === 'object' ? (row as Record<string, unknown>) : {};
  const coverUrl = String(safe.cover_url ?? safe.image_url ?? '/textures/noir-01.jpg');
  const assetUrl = String(safe.asset_url ?? safe.download_link ?? coverUrl);
  const baseGallery = asGalleryArray(safe.gallery, []);
  const gallery = baseGallery.length
    ? baseGallery
    : [
        {
          url: coverUrl,
          label: String(safe.cover_label ?? 'Image 1 · Cover preview')
        },
        {
          url: assetUrl,
          label: String(safe.asset_label ?? 'Image 2 · Downloadable asset')
        }
      ].filter((item, index, self) => item.url && self.findIndex((next) => next.url === item.url) === index);

  return {
    id: String(safe.id ?? crypto.randomUUID()),
    created_at: String(safe.created_at ?? new Date().toISOString()),
    title: String(safe.title ?? 'Untitled Project'),
    slug: String(safe.slug ?? 'untitled-project'),
    category: String(safe.category ?? 'Visual Design'),
    year: String(safe.year ?? new Date().getFullYear().toString()),
    client_name: String(safe.client_name ?? 'Personal Project'),
    summary: String(safe.summary ?? ''),
    description: String(safe.description ?? ''),
    cover_url: coverUrl,
    asset_url: assetUrl,
    cover_label: String(safe.cover_label ?? gallery[0]?.label ?? 'Image 1 · Cover preview'),
    asset_label: String(safe.asset_label ?? gallery[1]?.label ?? 'Image 2 · Downloadable asset'),
    gallery,
    featured: Boolean(safe.featured)
  };
}

function toSecurityEvent(row: unknown): SecurityEvent {
  const safe = row && typeof row === 'object' ? (row as Record<string, unknown>) : {};

  return {
    id: String(safe.id ?? crypto.randomUUID()),
    created_at: String(safe.created_at ?? new Date().toISOString()),
    event_type: String(safe.event_type ?? 'unknown'),
    ip_address: String(safe.ip_address ?? '-'),
    user_agent: String(safe.user_agent ?? '-'),
    project_slug: safe.project_slug ? String(safe.project_slug) : null,
    metadata: safe.metadata && typeof safe.metadata === 'object' ? (safe.metadata as Record<string, unknown>) : {}
  };
}

export async function getProfile(): Promise<Profile> {
  try {
    if (!hasEnv) return fallbackProfile;

    const supabase = createClient();
    const { data, error } = await supabase.from('profiles').select('*').limit(1).single();
    if (error || !data) return fallbackProfile;

    return toProfile(data);
  } catch {
    return fallbackProfile;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    if (!hasEnv) return fallbackSiteContent;

    const supabase = createClient();
    const { data, error } = await supabase.from('site_content').select('*').limit(1).single();
    if (error || !data) return fallbackSiteContent;

    return toSiteContent(data);
  } catch {
    return fallbackSiteContent;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    if (!hasEnv) return [];

    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error || !Array.isArray(data)) return [];
    return data.map(toProject);
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    if (!hasEnv) return null;

    const supabase = createClient();
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();

    if (error || !data) return null;
    return toProject(data);
  } catch {
    return null;
  }
}

export async function getSecurityEvents(limit = 20): Promise<SecurityEvent[]> {
  try {
    if (!hasEnv) return [];

    const supabase = createClient();
    const { data, error } = await supabase
      .from('security_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !Array.isArray(data)) return [];
    return data.map(toSecurityEvent);
  } catch {
    return [];
  }
}
