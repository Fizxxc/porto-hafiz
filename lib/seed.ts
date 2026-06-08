import type { Profile, Project, SiteContent } from '@/types';

export const fallbackProfile: Profile = {
  id: '00000000-0000-0000-0000-000000000001',
  full_name: 'Hafiz Al Fariz',
  headline: 'Contemporary UI/UX Designer & Creative Student',
  school_info: 'DKV Student · Metland School',
  bio: 'I build clean contemporary visuals, identity systems, and portfolio-grade digital experiences with strong contrast, bento hierarchy, and clear UX flow.',
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
  hero_badge: 'Contemporary Portfolio / UI UX',
  hero_title: 'Hafiz Al Fariz builds clean visual systems with contemporary bento layouts and clear UX flow.',
  hero_subtitle:
    'A modern portfolio experience with minimalist sections, expressive typography, bento grids, dark mode support, and fast access to protected project assets.',
  about_title: 'About Me',
  about_body:
    'I focus on building UI/UX presentations that feel clean, useful, and easy to scan. Every section uses clear hierarchy, modern bento blocks, expressive typography, and responsive flows so viewers can understand the work quickly.',
  about_highlights: ['Contemporary UI/UX', 'Brand Identity', 'Poster & Editorial'],
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
    'Open for student collaborations, personal branding work, contemporary UI experiments, and selected digital design projects.'
};

export const fallbackProjects: Project[] = [];
