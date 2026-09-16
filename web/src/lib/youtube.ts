const VIDEO_ID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/

export function youtubeId(url: string): string | null {
  return url.match(VIDEO_ID)?.[1] ?? null
}

export function youtubeThumbnail(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}
