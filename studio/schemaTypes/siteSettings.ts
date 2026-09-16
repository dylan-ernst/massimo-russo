import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', description: 'Shown above your name on the home page.', validation: (rule) => rule.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (rule) => rule.required().email() }),
    defineField({
      name: 'contactBlurb',
      title: 'Contact line',
      type: 'string',
      description: 'Short line under "Get in touch" on the home and contact pages.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'instagramUrl', title: 'Instagram link', type: 'url' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube link', type: 'url' }),
    defineField({ name: 'spotifyUrl', title: 'Spotify link', type: 'url', description: 'Leave empty to hide the Spotify icon.' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
