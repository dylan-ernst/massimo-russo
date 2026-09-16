// Dev-only: shapes studio/seed/content.ts like the Sanity query results, so the site
// can be built and checked before a Sanity project exists. Never imported in production.
import * as seed from '../../../studio/seed/content'
import type { SeedImage } from '../../../studio/seed/content'
import type { ContentMap, SiteImage } from './types'

const seedFiles = import.meta.glob<string>('../../../studio/seed/images/*', { eager: true, query: '?url', import: 'default' })

function fileUrl(file: string): string {
  const url = seedFiles[`../../../studio/seed/images/${file}`]
  if (!url) throw new Error(`Seed image missing: studio/seed/images/${file}`)
  return url
}

function toImage({ file, url, alt, hotspot }: SeedImage): SiteImage {
  const src = file ? fileUrl(file) : url
  if (!src) throw new Error(`Seed image "${alt}" has neither file nor url`)
  return { url: src, alt, hotspot }
}

const keyed = <T extends object>(item: T, index: number) => ({ _key: `seed-${index}`, ...item })

export const previewContent: ContentMap = {
  settings: seed.siteSettings,
  home: {
    ...seed.homePage,
    heroImage: toImage(seed.homePage.heroImage),
    aboutImage: toImage(seed.homePage.aboutImage),
    scheduleBackground: toImage(seed.homePage.scheduleBackground),
    contactBackground: toImage(seed.homePage.contactBackground),
    galleryPreview: seed.galleryPage.photos.slice(0, 3).map((p, i) => keyed(toImage(p), i)),
    events: seed.events.map((e, i) => ({ _id: `seed-event-${i + 1}`, ...e })),
  },
  biography: {
    ...seed.biographyPage,
    heroImage: toImage(seed.biographyPage.heroImage),
    portrait: toImage(seed.biographyPage.portrait),
    secondaryImage: toImage(seed.biographyPage.secondaryImage),
    education: seed.biographyPage.education.map(({ name, logo }, i) => keyed({ name, logoUrl: logo && fileUrl(logo) }, i)),
    milestones: seed.biographyPage.milestones.map(keyed),
  },
  gallery: {
    heroImage: toImage(seed.galleryPage.heroImage),
    videos: seed.galleryPage.videos.map(keyed),
    photos: seed.galleryPage.photos.map((p, i) => keyed(toImage(p), i)),
  },
  contact: { image: toImage(seed.contactPage.image) },
}
