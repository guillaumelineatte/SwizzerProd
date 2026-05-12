const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
  /(?:youtu\.be\/)([^&\n?#]+)/,
  /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
  /(?:youtube\.com\/shorts\/)([^&\n?#]+)/,
  /(?:youtube\.com\/v\/)([^&\n?#]+)/,
];

export function extractYouTubeVideoId(url: string): string | null {
  const trimmed = url.trim();
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  // Accepte aussi un ID brut (11 caractères)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  return null;
}

export function getThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
