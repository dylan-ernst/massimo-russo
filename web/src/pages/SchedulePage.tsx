import { ContentStatus } from '../components/ContentStatus'
import { EventRow } from '../components/EventRow'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import type { SiteSettings } from '../content/types'
import { useContent } from '../content/useContent'
import { eventMonthYear, pastEvents, upcomingEvents } from '../lib/events'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './SchedulePage.module.css'

export function SchedulePage({ settings }: { settings: SiteSettings }) {
  useDocumentTitle(`Schedule | ${settings.name}`)
  const content = useContent('schedule')

  if (content.status !== 'ready') return <ContentStatus {...content} />
  const schedule = content.data
  const upcoming = upcomingEvents(schedule.events)
  const past = pastEvents(schedule.events)

  return (
    <>
      <PageHero image={schedule.heroImage} eyebrow="Performances" title="Schedule" />

      <section className={styles.upcoming}>
        <div className={styles.inner}>
          <div className={styles.upcomingHeader}>
            {schedule.seasonLabel && (
              <Reveal as="p" className="eyebrow">
                {schedule.seasonLabel}
              </Reveal>
            )}
            <Reveal as="h2" className="section-title">
              Upcoming Dates
            </Reveal>
          </div>
          {upcoming.length > 0 ? (
            upcoming.map((event) => <EventRow key={event._id} event={event} variant="full" />)
          ) : (
            <p className={styles.empty}>New performances will be announced soon.</p>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className={styles.past}>
          <div className={styles.inner}>
            <div className={styles.pastHeader}>
              <Reveal as="p" className="eyebrow">
                Archive
              </Reveal>
              <Reveal as="h2" className={styles.pastTitle}>
                Past Performances
              </Reveal>
            </div>
            {past.map((event) => (
              <Reveal key={event._id} className={styles.pastRow}>
                <span className={styles.pastDate}>{eventMonthYear(event)}</span>
                <span className={styles.pastName}>{event.title}</span>
                <span className={styles.pastVenue}>{event.venue}</span>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
