import type { CSSProperties } from 'react'
import type { SiteImage } from '../content/types'

/** Asks Sanity's image CDN for a resized copy. Other URLs (placeholders, dev files) pass through. */
export function sizedUrl(url: string, width: number): string {
  if (!url.startsWith('https://cdn.sanity.io/')) return url
  return `${url}?w=${width}&fit=max&auto=format&q=80`
}

/** Keeps the Studio focal point in frame when object-fit: cover crops the photo. */
export function focalStyle(image: SiteImage): CSSProperties | undefined {
  if (!image.hotspot) return undefined
  const { x, y } = image.hotspot
  return { objectPosition: `${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%` }
}
