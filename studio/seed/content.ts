// Starting content for the Sanity dataset, taken from the design mockups.
// `seed/import.ts` uploads it to Sanity; the web app also reads it in dev when no
// Sanity project is configured. Keep this file free of Sanity imports so both can use it.

export type SeedImage = {
  /** A file in seed/images */
  file?: string
  /** A remote placeholder, downloaded on import */
  url?: string
  alt: string
  /** Focal point, 0 to 1 from the top left */
  hotspot?: { x: number; y: number }
}

const unsplash = (id: string, width = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

const placeholder = {
  handsAtKeyboard: { url: unsplash('photo-1520523839897-bd0b52f945a0', 1200), alt: 'Placeholder: hands at the keyboard' },
  concertStage: { url: unsplash('photo-1519683109079-d5f539e1542f', 1200), alt: 'Placeholder: concert stage' },
  scoreAtPiano: { url: unsplash('photo-1507838153414-b4b713384a76', 1200), alt: 'Placeholder: score at the piano' },
  operaHouse: { url: unsplash('photo-1506973035872-a4ec16b8e8d9'), alt: 'Placeholder: Sydney Opera House' },
  orchestra: { url: unsplash('photo-1465847899084-d164df4dedc6'), alt: 'Placeholder: orchestral performance' },
  pianoDetail: { url: unsplash('photo-1571330735066-03aaa9429d89'), alt: 'Placeholder: grand piano detail' },
  orchestraInConcert: { url: unsplash('photo-1415201364774-f6f0bb35f28f'), alt: 'Placeholder: orchestra in concert' },
} satisfies Record<string, SeedImage>

const sideShot: SeedImage = { file: 'side-shot-bw.jpg', alt: 'Massimo Russo at a Steinway grand piano', hotspot: { x: 0.47, y: 0.81 } }
const pianoHeadshot: SeedImage = { file: 'piano-headshot-bw.jpg', alt: 'Massimo Russo at the piano' }
const anePrize: SeedImage = {
  file: 'ane-prize.jpg',
  alt: 'Massimo Russo receiving First Prize at the 2026 Australian National Eisteddfod',
  hotspot: { x: 0.5, y: 0.35 },
}

export const siteSettings = {
  name: 'Massimo Russo',
  role: 'Pianist',
  location: 'Sydney, Australia',
  email: 'massimorussopianist@gmail.com',
  contactBlurb: 'For bookings, collaborations, and press inquiries.',
  instagramUrl: 'https://instagram.com/massimozart',
  youtubeUrl: 'https://youtube.com/channel/UCqZtBeOaYnS1mkKosxz4KgQ',
  spotifyUrl: undefined as string | undefined,
}

const bioLead =
  'Australian pianist Massimo Russo is currently pursuing undergraduate studies at the Sydney Conservatorium of Music with Dr Bernadette Harvey. During the 2025/26 season, his engagements include performances in Europe and Australia, including Sydney, ACT, Brisbane, and Victoria.'

export const homePage = {
  heroImage: sideShot,
  aboutLead: bioLead,
  aboutMore:
    'Massimo received First Prize at the 2026 Australian National Eisteddfod in Canberra, and made his orchestral debut performing Elena Kats-Chernin’s Piano Concerto Force Majeure at Verbrugghen Hall, conducted by Benjamin Northey.',
  aboutImage: pianoHeadshot,
  scheduleBackground: placeholder.orchestra,
  contactBackground: placeholder.orchestraInConcert,
}

export const biographyPage = {
  heroImage: placeholder.pianoDetail,
  lead: bioLead,
  paragraphs: [
    'Massimo received First Prize at the 2026 Australian National Eisteddfod in Canberra, sponsored by Dianne Anderson AM. His other distinctions include First Prize at the 2026 Shoalhaven Piano Competition, sponsored by Bendigo Bank; First Prize at the 2025 Marilyn Meier Chopin Award in Brisbane, and the Margaret Chalmers Instrumental Award. Selected as a finalist for the 2026 Australian National Piano Award, Massimo ultimately accepted a concurrent opportunity to make an orchestral debut, performing Elena Kats-Chernin’s Piano Concerto Force Majeure with the Sydney Conservatorium New Music Ensemble Orchestra, conducted by Benjamin Northey, at Verbrugghen Hall.',
    'As a recipient of the 2026 George and Margaret Henderson Travellers Scholarship, Massimo attended the XIII International Summer Piano Academy in Disentis, Switzerland, where he worked with Professor Sergei Edelmann.',
    'Before entering the Sydney Conservatorium, Massimo completed a Bachelor of Actuarial Studies at the University of New South Wales in two years while continuing his piano studies with Dr Christine J. Logan, during which he received a Licentiate Piano Diploma in 2023. He is a recipient of the University of Sydney’s MySydney Scholarship and was previously supported by a UNSW Gateway Scholarship.',
  ],
  portrait: pianoHeadshot,
  secondaryImage: anePrize,
  education: [
    { name: 'The University of Sydney', logo: 'usyd-logo-ink.png' as string | undefined },
    { name: 'UNSW Sydney', logo: 'unsw-logo.png' as string | undefined },
  ],
  milestones: [
    { year: '2023', label: 'Diploma', title: 'Licentiate Piano Diploma', detail: 'November 2023. Awarded during piano studies with Dr Christine J. Logan, alongside a Bachelor of Actuarial Studies at UNSW.' },
    { year: '2025', label: 'First Prize', title: 'Marilyn Meier Chopin Award', detail: 'June 2025.' },
    { year: '2026', label: 'First Prize', title: 'Australian National Eisteddfod', detail: 'August 2026. Canberra. Sponsored by Dianne Anderson AM.' },
    { year: '2026', label: 'First Prize', title: 'Shoalhaven Piano Competition', detail: 'May 2026. New South Wales. Sponsored by Bendigo Bank.' },
    { year: '2026', label: 'Orchestral Debut', title: 'Force Majeure', detail: 'October 2026. Elena Kats-Chernin’s Piano Concerto with the Sydney Conservatorium New Music Ensemble Orchestra, conducted by Benjamin Northey, at Verbrugghen Hall.' },
    { year: '2026', label: 'Scholarship', title: 'International Summer Piano Academy, Disentis', detail: 'July 2026. Worked with Professor Sergei Edelmann in Switzerland, as recipient of the George and Margaret Henderson Travellers Scholarship.' },
  ],
}

export const galleryPage = {
  heroImage: placeholder.operaHouse,
  videos: [
    { title: 'Felix Mendelssohn: Fantasie in F-sharp Minor, Op. 28', url: 'https://youtu.be/66XEvpYVhgA' },
    { title: 'Carl Vine: Piano Sonata No. 4', url: 'https://youtu.be/ClyvK8BC7Kk' },
  ],
  photos: [
    sideShot,
    anePrize,
    placeholder.handsAtKeyboard,
    placeholder.concertStage,
    placeholder.scoreAtPiano,
    placeholder.operaHouse,
    placeholder.orchestra,
    placeholder.pianoDetail,
    pianoHeadshot,
    placeholder.orchestraInConcert,
  ],
}

export const schedulePage = {
  heroImage: placeholder.orchestra,
  seasonLabel: 'Season 2026\u201327',
}

export const contactPage = {
  image: placeholder.handsAtKeyboard,
}

export const events = [
  {
    title: 'Elena Kats-Chernin: Piano Concerto Force Majeure',
    date: undefined as string | undefined,
    dateNote: 'Oct 2026',
    time: 'Time TBA',
    venue: 'Verbrugghen Hall, Sydney Conservatorium',
    program: 'Orchestral debut',
    ticketsUrl: 'https://boxoffice-music.sydney.edu.au/WebPages/EntaWebShow/ShowDatesCombo.aspx',
  },
  {
    title: 'Saint-Saëns: Sydney Town Hall Organ Recitals',
    date: undefined as string | undefined,
    dateNote: undefined as string | undefined,
    time: 'Time TBA',
    venue: 'Sydney Town Hall',
    program: 'Recital',
    ticketsUrl: 'https://whatson.cityofsydney.nsw.gov.au/events/sydney-town-hall-organ-recitals',
  },
]
