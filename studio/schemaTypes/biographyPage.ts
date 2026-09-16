import { defineArrayMember, defineField, defineType } from 'sanity'

export const biographyPage = defineType({
  name: 'biographyPage',
  title: 'Biography page',
  type: 'document',
  groups: [
    { name: 'bio', title: 'Biography', default: true },
    { name: 'education', title: 'Education' },
    { name: 'milestones', title: 'Milestones' },
  ],
  fields: [
    defineField({ name: 'heroImage', title: 'Header photo', type: 'imageWithAlt', group: 'bio', validation: (rule) => rule.required() }),
    defineField({ name: 'lead', title: 'Opening paragraph', type: 'text', rows: 4, group: 'bio', description: 'Shown larger and bold.', validation: (rule) => rule.required() }),
    defineField({
      name: 'paragraphs',
      title: 'More paragraphs',
      type: 'array',
      group: 'bio',
      of: [defineArrayMember({ type: 'text', rows: 5 })],
    }),
    defineField({ name: 'portrait', title: 'Main photo', type: 'imageWithAlt', group: 'bio', validation: (rule) => rule.required() }),
    defineField({ name: 'secondaryImage', title: 'Second photo', type: 'imageWithAlt', group: 'bio' }),
    defineField({
      name: 'education',
      title: 'Education logos',
      type: 'array',
      group: 'education',
      description: 'Logos are shown white on black. Use a logo on a plain background.',
      of: [
        defineArrayMember({
          name: 'institution',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'logo', title: 'Logo', type: 'image', description: 'If empty, the name is shown instead.' }),
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        }),
      ],
    }),
    defineField({
      name: 'milestones',
      title: 'Milestones',
      type: 'array',
      group: 'milestones',
      description: 'Drag to reorder. Shown left to right in this order.',
      of: [
        defineArrayMember({
          name: 'milestone',
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Year', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. First Prize, Scholarship', validation: (rule) => rule.required() }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'detail', title: 'Detail', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'year' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Biography page' }) },
})
