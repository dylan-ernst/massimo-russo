import { useEffect, type RefObject } from 'react'
import { prefersReducedMotion } from './reveal'

const DRIFT = 0.18

/** Slides each background image against the scroll direction while its section is on screen. */
export function useParallax(images: RefObject<HTMLElement | null>[], enabled = true) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return

    let frame = 0
    const update = () => {
      frame = 0
      const viewport = window.innerHeight
      for (const ref of images) {
        const image = ref.current
        const section = image?.parentElement
        if (!image || !section) continue
        const box = section.getBoundingClientRect()
        if (box.bottom < 0 || box.top > viewport) continue
        const progress = (box.top + box.height / 2 - viewport / 2) / (viewport / 2 + box.height / 2)
        image.style.transform = `translateY(${(-progress * box.height * DRIFT).toFixed(1)}px)`
      }
    }
    const schedule = () => {
      frame ||= requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
    // Refs are stable objects, so the list only matters on the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])
}
