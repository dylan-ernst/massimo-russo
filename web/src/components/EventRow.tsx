import type { PerformanceEvent } from '../content/types'
import { eventDateParts, eventDetails } from '../lib/events'
import styles from './EventRow.module.css'
import { Reveal } from './Reveal'

type Props = {
  event: PerformanceEvent
  /** compact: home page preview. full: schedule page, slightly larger with separated details */
  variant: 'compact' | 'full'
}

export function EventRow({ event, variant }: Props) {
  const { day, monthYear } = eventDateParts(event)
  const details = [event.venue, event.time, event.program].filter(Boolean)

  return (
    <Reveal className={`${styles.row} ${styles[variant]}`}>
      <div className={styles.date}>
        <div className={styles.day}>{day}</div>
        <div className={styles.month}>{monthYear}</div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{event.title}</h3>
        {variant === 'compact' ? (
          <p className={styles.details}>{eventDetails(event)}</p>
        ) : (
          <div className={styles.detailList}>
            {details.map((detail) => (
              <span key={detail} className={styles.detail}>
                {detail}
              </span>
            ))}
          </div>
        )}
      </div>
      {event.ticketsUrl ? (
        <a href={event.ticketsUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-small ${styles.tickets}`}>
          Tickets
        </a>
      ) : (
        <span />
      )}
    </Reveal>
  )
}
