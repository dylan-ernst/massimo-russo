// Loads seed/content.ts into the configured Sanity dataset.
// Run from the studio folder: npm run seed
// Safe to re-run: documents use fixed ids and are replaced, and Sanity dedupes identical image uploads.
import { createReadStream } from 'node:fs'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { getCliClient } from 'sanity/cli'
import * as seed from './content'
import type { SeedImage } from './content'

const client = getCliClient({ apiVersion: '2025-01-01' })
const imagesDir = path.join(process.cwd(), 'seed', 'images')
const DOWNLOAD_TIMEOUT_MS = 30_000

const uploaded = new Map<string, string>()

async function uploadAsset(source: string): Promise<string> {
  const cached = uploaded.get(source)
  if (cached) return cached

  let asset
  if (source.startsWith('https://')) {
    const response = await fetch(source, { signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS) })
    if (!response.ok) throw new Error(`Download failed (${response.status}): ${source}`)
    asset = await client.assets.upload('image', Buffer.from(await response.arrayBuffer()))
  } else {
    asset = await client.assets.upload('image', createReadStream(path.join(imagesDir, source)), { filename: source })
  }
  console.log(`  uploaded ${source}`)
  uploaded.set(source, asset._id)
  return asset._id
}

async function image(seedImage: SeedImage) {
  const source = seedImage.file ?? seedImage.url
  if (!source) throw new Error(`Seed image "${seedImage.alt}" has neither file nor url`)
  return {
    _type: 'imageWithAlt',
    asset: { _type: 'reference', _ref: await uploadAsset(source) },
    alt: seedImage.alt,
    ...(seedImage.hotspot && {
      hotspot: { _type: 'sanity.imageHotspot', ...seedImage.hotspot, width: 1, height: 1 },
    }),
  }
}

const withKey = <T extends object>(item: T) => ({ _key: randomUUID().slice(0, 12), ...item })

async function main() {
  const { siteSettings, homePage, biographyPage, galleryPage, contactPage, events } = seed
  console.log(`Seeding ${client.config().projectId}/${client.config().dataset}`)

  const docs = [
    { _id: 'siteSettings', _type: 'siteSettings', ...siteSettings },
    {
      _id: 'homePage',
      _type: 'homePage',
      ...homePage,
      heroImage: await image(homePage.heroImage),
      aboutImage: await image(homePage.aboutImage),
      scheduleBackground: await image(homePage.scheduleBackground),
      contactBackground: await image(homePage.contactBackground),
    },
    {
      _id: 'biographyPage',
      _type: 'biographyPage',
      ...biographyPage,
      heroImage: await image(biographyPage.heroImage),
      portrait: await image(biographyPage.portrait),
      secondaryImage: await image(biographyPage.secondaryImage),
      paragraphs: biographyPage.paragraphs,
      education: await Promise.all(
        biographyPage.education.map(async ({ name, logo }) =>
          withKey({
            _type: 'institution',
            name,
            ...(logo && { logo: { _type: 'image', asset: { _type: 'reference', _ref: await uploadAsset(logo) } } }),
          }),
        ),
      ),
      milestones: biographyPage.milestones.map((m) => withKey({ _type: 'milestone', ...m })),
    },
    {
      _id: 'galleryPage',
      _type: 'galleryPage',
      heroImage: await image(galleryPage.heroImage),
      videos: galleryPage.videos.map((v) => withKey({ _type: 'video', ...v })),
      photos: await Promise.all(galleryPage.photos.map(async (p) => withKey(await image(p)))),
    },
    { _id: 'contactPage', _type: 'contactPage', image: await image(contactPage.image) },
    ...events.map((e, i) => ({ _id: `seed-event-${i + 1}`, _type: 'event', ...e })),
  ]

  const transaction = client.transaction()
  for (const doc of docs) transaction.createOrReplace(JSON.parse(JSON.stringify(doc)))
  await transaction.commit()
  console.log(`Done: ${docs.length} documents written.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
