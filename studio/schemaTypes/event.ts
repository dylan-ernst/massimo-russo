import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Performance',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Leave empty if not confirmed yet. Once the date passes, it moves to Past Performances.',
    }),
    defineField({
      name: 'dateNote',
      title: 'Date note',
      type: 'string',
      description: 'Shown when there is no date, e.g. "Oct 2026". Defaults to "Date TBA".',
      hidden: ({ document }) => Boolean(document?.date),
    }),
    defineField({ name: 'time', title: 'Time', type: 'string', description: 'e.g. 7:30 PM or Time TBA' }),
    defineField({ name: 'venue', title: 'Venue', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'program', title: 'Program', type: 'string', description: 'e.g. Recital, Orchestral debut' }),
    defineField({ name: 'ticketsUrl', title: 'Tickets link', type: 'url', description: 'Leave empty to hide the Tickets button.' }),
  ],
  orderings: [{ title: 'Date', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', date: 'date', dateNote: 'dateNote', venue: 'venue' },
    prepare: ({ title, date, dateNote, venue }) => ({
      title,
      subtitle: [date || dateNote || 'Date TBA', venue].filter(Boolean).join(' · '),
    }),
  },
})
