import type { PerformanceEvent } from '../content/types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function todayIso(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/** Drops past performances; dated ones come first by date, unconfirmed ones after. */
export function upcomingEvents(events: PerformanceEvent[]): PerformanceEvent[] {
  const today = todayIso()
  return events
    .filter((event) => !event.date || event.date >= today)
    .sort((a, b) => {
      if (a.date && b.date) return a.date.localeCompare(b.date)
      if (a.date) return -1
      if (b.date) return 1
      return 0
    })
}

/** Dated performances before today, most recent first. Undated ones are never past. */
export function pastEvents(events: PerformanceEvent[]): PerformanceEvent[] {
  const today = todayIso()
  return events
    .filter((event): event is PerformanceEvent & { date: string } => Boolean(event.date && event.date < today))
    .sort((a, b) => b.date.localeCompare(a.date))
}

// Parsed by hand so time zones cannot shift the day
function parseDate(date: string | null | undefined) {
  const match = date?.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return null
  const [, year, month, day] = match
  return { day: String(Number(day)), monthYear: `${MONTHS[Number(month) - 1]} ${year}` }
}

/** Splits the date for the big-number layout. */
export function eventDateParts(event: PerformanceEvent): { day: string; monthYear: string } {
  return parseDate(event.date) ?? { day: 'TBA', monthYear: event.dateNote || 'Date TBA' }
}

/** "Oct 2026", for the past performances list. */
export function eventMonthYear(event: PerformanceEvent): string {
  return parseDate(event.date)?.monthYear ?? event.dateNote ?? ''
}

export function eventDetails(event: PerformanceEvent): string {
  return [event.venue, event.time, event.program].filter(Boolean).join(' · ')
}
