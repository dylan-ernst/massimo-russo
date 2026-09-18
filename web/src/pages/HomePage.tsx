import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ContentStatus } from '../components/ContentStatus'
import { EventRow } from '../components/EventRow'
import { Reveal } from '../components/Reveal'
import type { SiteSettings } from '../content/types'
import { useContent } from '../content/useContent'
import { upcomingEvents } from '../lib/events'
import { focalStyle, sizedUrl } from '../lib/images'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { useParallax } from '../lib/useParallax'
import styles from './HomePage.module.css'

const HOME_EVENT_LIMIT = 3

export function HomePage({ settings }: { settings: SiteSettings }) {
  useDocumentTitle(`${settings.name} | ${settings.role}`)
  const content = useContent('home')
  const scheduleImage = useRef<HTMLImageElement>(null)
  const contactImage = useRef<HTMLImageElement>(null)
  useParallax([scheduleImage, contactImage], content.status === 'ready')

  if (content.status !== 'ready') return <ContentStatus {...content} />
  const home = content.data
  const events = upcomingEvents(home.events).slice(0, HOME_EVENT_LIMIT)

  return (
    <>
      <section className={styles.hero}>
        <img src={sizedUrl(home.heroImage.url, 2400)} alt={home.heroImage.alt} className={styles.heroImage} style={focalStyle(home.heroImage)} />
        <div aria-hidden="true" className={styles.heroShade} />
        <div className={styles.heroText}>
          <Reveal as="p" className={styles.heroRole}>
            {settings.role}
          </Reveal>
          <Reveal as="h1" delay={120} className={styles.heroName}>
            {splitName(settings.name)}
          </Reveal>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.split}>
          <div>
            <Reveal as="p" className={`eyebrow ${styles.aboutEyebrow}`}>
              About
            </Reveal>
            <Reveal as="p" className={styles.aboutLead}>
              {home.aboutLead}
            </Reveal>
            {home.aboutMore && (
              <Reveal as="p" delay={100} className={styles.aboutMore}>
                {home.aboutMore}
              </Reveal>
            )}
            <Reveal delay={150}>
              <Link to="/biography" className="btn btn-outline">
                Read More
              </Link>
            </Reveal>
          </div>
          <Reveal from="right" className={styles.framed}>
            <img src={sizedUrl(home.aboutImage.url, 1200)} alt={home.aboutImage.alt} className={`mono-hover ${styles.aboutImage}`} style={focalStyle(home.aboutImage)} loading="lazy" />
            <div aria-hidden="true" className={styles.frame} />
          </Reveal>
        </div>
      </section>

      <section className={styles.schedule}>
        <img ref={scheduleImage} src={sizedUrl(home.scheduleBackground.url, 2000)} alt="" className={styles.parallaxImage} style={focalStyle(home.scheduleBackground)} loading="lazy" />
        <div aria-hidden="true" className={styles.scheduleShade} />
        <div className={styles.scheduleInner}>
          <div className={styles.scheduleHeader}>
            <Reveal as="p" className="eyebrow">
              Schedule
            </Reveal>
            <Reveal as="h2" className="section-title">
              Upcoming
            </Reveal>
            <Link to="/schedule" className={`text-link ${styles.pushRight}`}>
              View all &rarr;
            </Link>
          </div>
          {events.length > 0 ? (
            events.map((event) => <EventRow key={event._id} event={event} variant="compact" />)
          ) : (
            <p className={styles.noEvents}>New performances will be announced soon.</p>
          )}
        </div>
      </section>

      {home.galleryPreview.length > 0 && (
        <section className={styles.gallery}>
          <div className={styles.contentWidth}>
            <div className={styles.sectionHeader}>
              <Reveal as="p" className="eyebrow">
                Gallery
              </Reveal>
              <Reveal as="h2" className="section-title">
                In Performance
              </Reveal>
              <Link to="/gallery" className={`text-link ${styles.pushRight}`}>
                View gallery &rarr;
              </Link>
            </div>
            <div className={styles.previewGrid}>
              {home.galleryPreview.map((photo) => (
                <Reveal key={photo._key}>
                  <Link to="/gallery" className={styles.previewTile}>
                    <img src={sizedUrl(photo.url, 900)} alt={photo.alt} className={styles.previewImage} style={focalStyle(photo)} loading="lazy" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.contact}>
        <img ref={contactImage} src={sizedUrl(home.contactBackground.url, 2000)} alt="" className={styles.parallaxImage} style={focalStyle(home.contactBackground)} loading="lazy" />
        <div aria-hidden="true" className={styles.contactShade} />
        <div className={styles.contactInner}>
          <Reveal as="p" className={`eyebrow ${styles.contactEyebrow}`}>
            Contact
          </Reveal>
          <Reveal as="h2" className={styles.contactTitle}>
            Get in Touch
          </Reveal>
          <Reveal as="p" className={styles.contactBlurb}>
            {settings.contactBlurb}
          </Reveal>
          <Reveal delay={150}>
            <Link to="/contact" className="btn btn-solid">
              Contact
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/** "Massimo Russo" stacks onto two lines like the design; single names stay on one. */
function splitName(name: string) {
  const [first, ...rest] = name.split(' ')
  if (rest.length === 0) return first
  return (
    <>
      {first}
      <br />
      {rest.join(' ')}
    </>
  )
}
