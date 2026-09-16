type Callback = (visible: boolean) => void

const callbacks = new Map<Element, Callback>()
let observer: IntersectionObserver | null = null

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function getObserver(): IntersectionObserver {
  // One shared observer for every revealed element on the page
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) callbacks.get(entry.target)?.(entry.isIntersecting)
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )
  return observer
}

/** Reports when `element` scrolls in and out of view. Returns the cleanup. */
export function observeReveal(element: Element, callback: Callback): () => void {
  callbacks.set(element, callback)
  getObserver().observe(element)
  return () => {
    callbacks.delete(element)
    observer?.unobserve(element)
  }
}
