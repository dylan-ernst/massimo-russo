import { createClient, type SanityClient } from '@sanity/client'
import { queries } from './queries'
import type { ContentKey, ContentMap } from './types'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

let client: SanityClient | null = null

function getClient(): SanityClient {
  // Public dataset read through the CDN: no token ships to the browser
  client ??= createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: true })
  return client
}

export async function fetchContent<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  if (!projectId) {
    // Until a Sanity project exists, dev runs on the seed content. The DEV check lets
    // the production build drop this branch, so the seed never ships.
    if (import.meta.env.DEV) {
      const { previewContent } = await import('./previewContent')
      return previewContent[key]
    }
    throw new Error('VITE_SANITY_PROJECT_ID is not set for this build.')
  }

  const result = await getClient().fetch<ContentMap[K] | null>(queries[key])
  if (result == null) throw new Error(`No "${key}" content has been published yet.`)
  return result
}
