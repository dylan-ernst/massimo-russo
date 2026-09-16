import { defineArrayMember, defineField, defineType } from 'sanity'

const YOUTUBE_ID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/

export const galleryPage = defineType({
  name: 'galleryPage',
  title: 'Gallery page',
  type: 'document',
  fields: [
    defineField({ name: 'heroImage', title: 'Header photo', type: 'imageWithAlt', validation: (rule) => rule.required() }),
    defineField({
      name: 'videos',
      title: 'Featured videos',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'video',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'url',
              title: 'YouTube link',
              type: 'url',
              validation: (rule) =>
                rule.required().custom((url) => (!url || YOUTUBE_ID.test(url) ? true : 'Paste a YouTube video link, e.g. https://youtu.be/...')),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      description: 'The first 3 also appear on the home page. Drag to reorder.',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
      options: { layout: 'grid' },
    }),
  ],
  preview: { prepare: () => ({ title: 'Gallery page' }) },
})
