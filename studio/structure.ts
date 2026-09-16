import type { StructureResolver } from 'sanity/structure'

const singletons = [
  { id: 'siteSettings', title: 'Site settings' },
  { id: 'homePage', title: 'Home page' },
  { id: 'biographyPage', title: 'Biography page' },
  { id: 'galleryPage', title: 'Gallery page' },
  { id: 'contactPage', title: 'Contact page' },
]

// Each singleton opens straight into its one document (id matches the type name)
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website')
    .items([
      ...singletons.map(({ id, title }) =>
        S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id)),
      ),
      S.divider(),
      S.documentTypeListItem('event').title('Schedule'),
    ])
