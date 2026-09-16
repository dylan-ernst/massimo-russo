import type { ContentKey } from './types'

const image = '{ "url": asset->url, alt, hotspot{ x, y } }'

export const queries: Record<ContentKey, string> = {
  settings: `*[_id == "siteSettings"][0]{
    name, role, location, email, contactBlurb, instagramUrl, youtubeUrl, spotifyUrl
  }`,

  home: `*[_id == "homePage"][0]{
    heroImage${image},
    aboutLead,
    aboutMore,
    aboutImage${image},
    scheduleBackground${image},
    contactBackground${image},
    "galleryPreview": *[_id == "galleryPage"][0].photos[0...3]{ _key, "url": asset->url, alt, hotspot{ x, y } },
    "events": *[_type == "event"]{ _id, title, date, dateNote, time, venue, program, ticketsUrl }
  }`,

  biography: `*[_id == "biographyPage"][0]{
    heroImage${image},
    lead,
    paragraphs,
    portrait${image},
    secondaryImage${image},
    education[]{ _key, name, "logoUrl": logo.asset->url },
    milestones[]{ _key, year, label, title, detail }
  }`,

  gallery: `*[_id == "galleryPage"][0]{
    heroImage${image},
    videos[]{ _key, title, url },
    photos[]{ _key, "url": asset->url, alt, hotspot{ x, y } }
  }`,

  contact: `*[_id == "contactPage"][0]{ image${image} }`,
}
