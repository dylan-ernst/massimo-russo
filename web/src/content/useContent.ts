import { useEffect, useState } from 'react'
import { fetchContent } from './fetchContent'
import type { ContentKey, ContentMap } from './types'

export type ContentState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: T }

// One request per key for the whole visit, so going back to a page shows it instantly
const cache = new Map<ContentKey, Promise<unknown>>()

function load<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  let pending = cache.get(key) as Promise<ContentMap[K]> | undefined
  if (!pending) {
    pending = fetchContent(key)
    // A failed request must not stick, or a refresh-free retry could never succeed
    pending.catch(() => cache.delete(key))
    cache.set(key, pending)
  }
  return pending
}

export function useContent<K extends ContentKey>(key: K): ContentState<ContentMap[K]> {
  const [state, setState] = useState<ContentState<ContentMap[K]>>({ status: 'loading' })

  useEffect(() => {
    let active = true
    load(key).then(
      (data) => active && setState({ status: 'ready', data }),
      (error: unknown) => {
        console.error(`Failed to load ${key} content`, error)
        if (active) setState({ status: 'error', message: error instanceof Error ? error.message : String(error) })
      },
    )
    return () => {
      active = false
    }
  }, [key])

  return state
}
