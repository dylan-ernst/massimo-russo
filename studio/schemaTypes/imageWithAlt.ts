import { defineField, defineType } from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  // Hotspot lets the focal point be dragged so crops keep the subject in frame
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Description',
      type: 'string',
      description: 'Describe the photo for screen readers and search engines, e.g. "Massimo at the piano".',
      validation: (rule) => rule.required(),
    }),
  ],
})
