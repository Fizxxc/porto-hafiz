export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          user_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          headline: string;
          school_info: string;
          bio: string;
          phone: string;
          email: string;
          address: string;
          social_links: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          full_name: string;
          headline: string;
          school_info: string;
          bio: string;
          phone: string;
          email: string;
          address: string;
          social_links?: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          headline?: string;
          school_info?: string;
          bio?: string;
          phone?: string;
          email?: string;
          address?: string;
          social_links?: Json;
        };
      };
      site_content: {
        Row: {
          id: string;
          created_at: string;
          hero_badge: string;
          hero_title: string;
          hero_subtitle: string;
          about_title: string;
          about_body: string;
          about_highlights: Json;
          focus_title: string;
          focus_items: Json;
          software_stack: Json;
          portfolio_drive_url: string;
          contact_title: string;
          contact_body: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          hero_badge: string;
          hero_title: string;
          hero_subtitle: string;
          about_title: string;
          about_body: string;
          about_highlights?: Json;
          focus_title: string;
          focus_items?: Json;
          software_stack?: Json;
          portfolio_drive_url?: string;
          contact_title: string;
          contact_body: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          hero_badge?: string;
          hero_title?: string;
          hero_subtitle?: string;
          about_title?: string;
          about_body?: string;
          about_highlights?: Json;
          focus_title?: string;
          focus_items?: Json;
          software_stack?: Json;
          portfolio_drive_url?: string;
          contact_title?: string;
          contact_body?: string;
        };
      };
      projects: {
        Row: {
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
          cover_label: string;
          asset_label: string;
          gallery: Json;
          featured: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          slug: string;
          summary: string;
          description: string;
          category: string;
          year?: string;
          client_name?: string;
          cover_url: string;
          asset_url: string;
          cover_label?: string;
          asset_label?: string;
          gallery?: Json;
          featured?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          slug?: string;
          summary?: string;
          description?: string;
          category?: string;
          year?: string;
          client_name?: string;
          cover_url?: string;
          asset_url?: string;
          cover_label?: string;
          asset_label?: string;
          gallery?: Json;
          featured?: boolean;
        };
      };
      project_assets: {
        Row: {
          id: string;
          project_id: string | null;
          created_at: string;
          file_url: string;
          image_url: string;
          label: string | null;
          caption: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          project_id?: string | null;
          created_at?: string;
          file_url?: string;
          image_url?: string;
          label?: string | null;
          caption?: string | null;
          sort_order?: number;
        };
        Update: {
          id?: string;
          project_id?: string | null;
          created_at?: string;
          file_url?: string;
          image_url?: string;
          label?: string | null;
          caption?: string | null;
          sort_order?: number;
        };
      };
      security_events: {
        Row: {
          id: string;
          created_at: string;
          event_type: string;
          project_slug: string | null;
          ip_address: string;
          user_agent: string;
          metadata: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          event_type: string;
          project_slug?: string | null;
          ip_address: string;
          user_agent: string;
          metadata?: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          event_type?: string;
          project_slug?: string | null;
          ip_address?: string;
          user_agent?: string;
          metadata?: Json;
        };
      };
    };
  };
}
