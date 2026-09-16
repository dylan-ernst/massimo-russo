import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Photo', type: 'imageWithAlt', validation: (rule) => rule.required() }),
  ],
  preview: { prepare: () => ({ title: 'Contact page', subtitle: 'Email, location and links live in Site settings' }) },
})
