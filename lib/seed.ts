import type { Profile, Project, SiteContent } from '@/types';

export const fallbackProfile: Profile = {
  id: '00000000-0000-0000-0000-000000000001',
  full_name: 'Hafiz Al Fariz',
  headline: 'Neobrutalist UI/UX Designer & Creative Student',
  school_info: 'DKV Student · Metland School',
  bio: 'I build bold neobrutalist visuals, identity systems, and portfolio-grade digital experiences with strong contrast, tactile hierarchy, and clear UX flow.',
  phone: '+62 812 3456 7890',
  email: 'hafizalfariz.support@gmail.com',
  address: 'Bekasi, Indonesia',
  social_links: {
    ig: 'https://instagram.com/hafizalfariz',
    tiktok: 'https://tiktok.com/@hafizalfariz',
    youtube: 'https://youtube.com/@hafizalfariz',
    behance: 'https://behance.net/hafizalfariz'
  }
};

export const fallbackSiteContent: SiteContent = {
  id: '00000000-0000-0000-0000-000000000002',
  hero_badge: 'Neobrutal Portfolio / UI UX',
  hero_title: 'Hafiz Al Fariz builds bold visual systems with neobrutalist energy and clear UX flow.',
  hero_subtitle:
    'A tactile portfolio experience with thick borders, loud contrast, clear sections, and fast access to protected project assets.',
  about_title: 'About Me',
  about_body:
    'I focus on building UI/UX presentations that feel bold, useful, and easy to scan. Every section uses clear hierarchy, strong contrast, and tactile visual blocks so viewers can understand the work quickly.',
  about_highlights: ['Neobrutal UI/UX', 'Brand Identity', 'Poster & Editorial'],
  focus_title: 'Software I Use',
  focus_items: ['Figma', 'Adobe Photoshop', 'Adobe Lightroom'],
  software_stack: [
    { name: 'Figma', icon_url: 'https://cdn.simpleicons.org/figma/ffffff' },
    { name: 'Adobe Photoshop', icon_url: 'https://cdn.simpleicons.org/adobephotoshop/ffffff' },
    { name: 'Adobe Lightroom', icon_url: 'https://cdn.simpleicons.org/adobelightroomclassic/ffffff' }
  ],
  portfolio_drive_url: 'https://example.com/portfolio-drive',
  contact_title: 'Let’s build something bold, useful, and unmistakable.',
  contact_body:
    'Open for student collaborations, personal branding work, neobrutalist UI experiments, and selected digital design projects.'
};

export const fallbackProjects: Project[] = [];
