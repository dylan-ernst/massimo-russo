import { biographyPage } from './biographyPage'
import { contactPage } from './contactPage'
import { event } from './event'
import { galleryPage } from './galleryPage'
import { homePage } from './homePage'
import { imageWithAlt } from './imageWithAlt'
import { schedulePage } from './schedulePage'
import { siteSettings } from './siteSettings'

export const schemaTypes = [imageWithAlt, siteSettings, homePage, biographyPage, galleryPage, schedulePage, contactPage, event]

export const singletonTypes = new Set(['siteSettings', 'homePage', 'biographyPage', 'galleryPage', 'schedulePage', 'contactPage'])
