import { defineField, defineType } from 'sanity'

export const schedulePage = defineType({
  name: 'schedulePage',
  title: 'Schedule page',
  type: 'document',
  fields: [
    defineField({ name: 'heroImage', title: 'Header photo', type: 'imageWithAlt', validation: (rule) => rule.required() }),
    defineField({
      name: 'seasonLabel',
      title: 'Season label',
      type: 'string',
      description: 'Small blue label above "Upcoming Dates", e.g. Season 2026\u201327. Leave empty to hide.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Schedule page', subtitle: 'Performances are added under Schedule. Past dates move to the archive on their own.' }),
  },
})
