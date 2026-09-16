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

/** Splits the date for the big-number layout. Parsed by hand so time zones cannot shift the day. */
export function eventDateParts(event: PerformanceEvent): { day: string; monthYear: string } {
  const match = event.date?.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return { day: 'TBA', monthYear: event.dateNote || 'Date TBA' }
  const [, year, month, day] = match
  return { day: String(Number(day)), monthYear: `${MONTHS[Number(month) - 1]} ${year}` }
}

export function eventDetails(event: PerformanceEvent): string {
  return [event.venue, event.time, event.program].filter(Boolean).join(' · ')
}
