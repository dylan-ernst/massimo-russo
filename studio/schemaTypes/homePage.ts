import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({ name: 'heroImage', title: 'Hero photo', type: 'imageWithAlt', validation: (rule) => rule.required() }),
    defineField({ name: 'aboutLead', title: 'About: first paragraph', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'aboutMore', title: 'About: second paragraph', type: 'text', rows: 4 }),
    defineField({ name: 'aboutImage', title: 'About photo', type: 'imageWithAlt', validation: (rule) => rule.required() }),
    defineField({
      name: 'scheduleBackground',
      title: 'Schedule background photo',
      type: 'imageWithAlt',
      description: 'Sits behind the upcoming performances, darkened.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactBackground',
      title: 'Contact background photo',
      type: 'imageWithAlt',
      description: 'Sits behind "Get in touch", darkened.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: 'Home page', subtitle: 'The gallery preview uses the first 3 gallery photos' }) },
})
