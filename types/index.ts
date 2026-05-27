export type SocialLinks = {
  ig?: string;
  tiktok?: string;
  youtube?: string;
  github?: string;
  behance?: string;
};

export type SoftwareItem = {
  name: string;
  icon_url?: string;
};

export type GalleryItem = {
  url: string;
  label: string;
};

export type Project = {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  year: string;
  client_name: string;
  cover_url: string;
  asset_url: string;
  cover_label?: string;
  asset_label?: string;
  gallery: GalleryItem[];
  featured: boolean;
};

export type Profile = {
  id: string;
  created_at?: string;
  full_name: string;
  headline: string;
  school_info: string;
  bio: string;
  phone: string;
  email: string;
  address: string;
  social_links: SocialLinks;
};

export type SiteContent = {
  id: string;
  created_at?: string;
  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  about_title: string;
  about_body: string;
  about_highlights: string[];
  focus_title: string;
  focus_items: string[];
  software_stack: SoftwareItem[];
  portfolio_drive_url: string;
  contact_title: string;
  contact_body: string;
};

export type SecurityEvent = {
  id: string;
  created_at: string;
  event_type: string;
  ip_address: string;
  user_agent: string;
  project_slug: string | null;
  metadata: Record<string, unknown>;
};

export type ProjectAsset = {
  id: string;
  project_id: string;
  created_at?: string;
  file_url: string;
  label?: string | null;
  caption?: string | null;
  sort_order?: number | null;
};