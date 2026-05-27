import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function isImageAsset(url: string) {
  return /(\.png|\.jpe?g|\.webp)$/i.test(url);
}


export function toEmbeddableUrl(rawUrl: string) {
  if (!rawUrl) return rawUrl;

  try {
    const url = new URL(rawUrl);
    const hostname = url.hostname.replace(/^www\./, '');

    if (hostname === 'drive.google.com') {
      const fileMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
      if (fileMatch?.[1]) {
        return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
      }
    }

    if (hostname === 'docs.google.com') {
      if (url.pathname.includes('/document/d/')) return rawUrl.replace(/\/edit.*$/, '/preview');
      if (url.pathname.includes('/presentation/d/')) return rawUrl.replace(/\/edit.*$/, '/preview');
      if (url.pathname.includes('/spreadsheets/d/')) return rawUrl.replace(/\/edit.*$/, '/preview');
    }

    return rawUrl;
  } catch {
    return rawUrl;
  }
}

export function openableHostname(rawUrl: string) {
  try {
    return new URL(rawUrl).hostname.replace(/^www\./, '');
  } catch {
    return rawUrl;
  }
}
