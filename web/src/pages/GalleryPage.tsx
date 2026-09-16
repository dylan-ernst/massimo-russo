import { ContentStatus } from '../components/ContentStatus'
import { PlayIcon } from '../components/icons'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import type { SiteSettings, Video } from '../content/types'
import { useContent } from '../content/useContent'
import { sizedUrl } from '../lib/images'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { youtubeId, youtubeThumbnail } from '../lib/youtube'
import styles from './GalleryPage.module.css'

export function GalleryPage({ settings }: { settings: SiteSettings }) {
  useDocumentTitle(`Gallery | ${settings.name}`)
  const content = useContent('gallery')

  if (content.status !== 'ready') return <ContentStatus {...content} />
  const gallery = content.data
  const photos = gallery.photos ?? []
  const videos = (gallery.videos ?? []).flatMap((video) => {
    const id = youtubeId(video.url)
    if (!id) console.warn(`Skipping video with an unrecognised YouTube link: ${video.url}`)
    return id ? [{ ...video, id }] : []
  })

  return (
    <>
      <PageHero image={gallery.heroImage} eyebrow="In performance" title="Gallery" />

      {videos.length > 0 && (
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.header}>
              <Reveal as="p" className="eyebrow">
                Watch
              </Reveal>
              <Reveal as="h2" className="section-title">
                Featured Videos
              </Reveal>
            </div>
            <div className={styles.videoGrid}>
              {videos.map((video) => (
                <VideoCard key={video._key} video={video} />
              ))}
            </div>
          </div>
        </section>
      )}

      {photos.length > 0 && (
        <section className={`${styles.section} ${styles.bordered}`}>
          <div className={styles.inner}>
            <div className={styles.header}>
              <Reveal as="p" className="eyebrow">
                Photographs
              </Reveal>
              <Reveal as="h2" className="section-title">
                The Gallery
              </Reveal>
            </div>
            <div className={styles.masonry}>
              {photos.map((photo) => (
                <Reveal key={photo._key} className={styles.masonryItem}>
                  <img src={sizedUrl(photo.url, 900)} alt={photo.alt} className={`mono-hover ${styles.photo}`} loading="lazy" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function VideoCard({ video }: { video: Video & { id: string } }) {
  return (
    <Reveal>
      <a href={video.url} target="_blank" rel="noopener noreferrer" className={styles.video}>
        <span className={styles.thumbFrame}>
          <img src={youtubeThumbnail(video.id)} alt={video.title} className={styles.thumb} loading="lazy" />
          <span aria-hidden="true" className={styles.play}>
            <PlayIcon />
          </span>
        </span>
        <span className={styles.videoTitle}>{video.title}</span>
        <span className={styles.videoMeta}>Watch on YouTube</span>
      </a>
    </Reveal>
  )
}
