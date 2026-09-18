export type SiteImage = {
  url: string
  alt: string
  /** Focal point set in Studio, 0 to 1 from the top left */
  hotspot?: { x: number; y: number } | null
}

export type SiteSettings = {
  name: string
  role: string
  location: string
  email: string
  contactBlurb: string
  instagramUrl?: string | null
  youtubeUrl?: string | null
  spotifyUrl?: string | null
}

export type PerformanceEvent = {
  _id: string
  title: string
  /** YYYY-MM-DD, or empty when the date is not confirmed */
  date?: string | null
  dateNote?: string | null
  time?: string | null
  venue: string
  program?: string | null
  ticketsUrl?: string | null
}

export type HomeContent = {
  heroImage: SiteImage
  aboutLead: string
  aboutMore?: string | null
  aboutImage: SiteImage
  scheduleBackground: SiteImage
  contactBackground: SiteImage
  galleryPreview: (SiteImage & { _key: string })[]
  events: PerformanceEvent[]
}

export type Institution = { _key: string; name: string; logoUrl?: string | null }

export type Milestone = { _key: string; year: string; label: string; title: string; detail?: string | null }

export type BiographyContent = {
  heroImage: SiteImage
  lead: string
  paragraphs?: string[] | null
  portrait: SiteImage
  secondaryImage?: SiteImage | null
  education?: Institution[] | null
  milestones?: Milestone[] | null
}

export type Video = { _key: string; title: string; url: string }

export type GalleryContent = {
  heroImage: SiteImage
  videos?: Video[] | null
  photos?: (SiteImage & { _key: string })[] | null
}

export type ScheduleContent = {
  heroImage: SiteImage
  seasonLabel?: string | null
  events: PerformanceEvent[]
}

export type ContactContent = { image: SiteImage }

export type ContentMap = {
  settings: SiteSettings
  home: HomeContent
  biography: BiographyContent
  gallery: GalleryContent
  schedule: ScheduleContent
  contact: ContactContent
}

export type ContentKey = keyof ContentMap
