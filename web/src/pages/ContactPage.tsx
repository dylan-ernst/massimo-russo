import { ContentStatus } from '../components/ContentStatus'
import { EmailIcon, LocationIcon } from '../components/icons'
import { Reveal } from '../components/Reveal'
import { SocialLinks } from '../components/SocialLinks'
import type { SiteSettings } from '../content/types'
import { useContent } from '../content/useContent'
import { focalStyle, sizedUrl } from '../lib/images'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './ContactPage.module.css'

export function ContactPage({ settings }: { settings: SiteSettings }) {
  useDocumentTitle(`Contact | ${settings.name}`)
  const content = useContent('contact')

  if (content.status !== 'ready') return <ContentStatus {...content} />
  const { image } = content.data

  return (
    <section className={styles.contact}>
      <div className={styles.split}>
        <div>
          <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
            Get in touch
          </Reveal>
          <Reveal as="h1" delay={120} className={styles.title}>
            Contact
          </Reveal>
          <Reveal as="p" className={styles.blurb}>
            {settings.contactBlurb}
          </Reveal>

          <div className={styles.details}>
            <Reveal>
              <a href={`mailto:${settings.email}`} className={styles.email}>
                <EmailIcon />
                <span className={styles.emailText}>{settings.email}</span>
              </a>
            </Reveal>
            <Reveal delay={100} className={styles.location}>
              <LocationIcon />
              <span className={styles.locationText}>{settings.location}</span>
            </Reveal>
          </div>

          <div aria-hidden="true" className={styles.rule} />
          <SocialLinks settings={settings} include={['instagram', 'youtube', 'spotify']} size={21} className={styles.social} />
        </div>

        <Reveal from="right" className={styles.framed}>
          <img src={sizedUrl(image.url, 1200)} alt={image.alt} className={`mono-hover ${styles.image}`} style={focalStyle(image)} />
          <div aria-hidden="true" className={styles.frame} />
        </Reveal>
      </div>
    </section>
  )
}
