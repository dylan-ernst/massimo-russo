import type { SiteImage } from '../content/types'
import { focalStyle, sizedUrl } from '../lib/images'
import styles from './PageHero.module.css'
import { Reveal } from './Reveal'

type Props = { image: SiteImage; title: string; eyebrow?: string }

/** Shorter photo header used by the inner pages. */
export function PageHero({ image, title, eyebrow }: Props) {
  return (
    <section className={styles.hero}>
      <img src={sizedUrl(image.url, 2000)} alt={image.alt} className={styles.image} style={focalStyle(image)} />
      <div aria-hidden="true" className={styles.shade} />
      <div className={styles.text}>
        {eyebrow && (
          <Reveal as="p" className={styles.eyebrow}>
            {eyebrow}
          </Reveal>
        )}
        <Reveal as="h1" delay={120} className={styles.title}>
          {title}
        </Reveal>
      </div>
    </section>
  )
}
