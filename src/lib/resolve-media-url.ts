/** Resolves API media paths (relative or absolute) to a full URL. */
export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;

  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  if (url.startsWith('/')) return `${base}${url}`;
  return `${base}/storage/${url}`;
}
