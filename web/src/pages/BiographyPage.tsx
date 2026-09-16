import { useRef } from 'react'
import { ContentStatus } from '../components/ContentStatus'
import { ArrowIcon } from '../components/icons'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import type { Institution, Milestone, SiteSettings } from '../content/types'
import { useContent } from '../content/useContent'
import { focalStyle, sizedUrl } from '../lib/images'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './BiographyPage.module.css'

export function BiographyPage({ settings }: { settings: SiteSettings }) {
  useDocumentTitle(`Biography | ${settings.name}`)
  const content = useContent('biography')

  if (content.status !== 'ready') return <ContentStatus {...content} />
  const bio = content.data

  return (
    <>
      <PageHero image={bio.heroImage} title="Biography" />

      <section className={styles.bio}>
        <div className={styles.split}>
          <div>
            <Reveal as="p" className={styles.lead}>
              {bio.lead}
            </Reveal>
            {bio.paragraphs?.map((paragraph, index) => (
              <Reveal as="p" key={index} className={styles.paragraph}>
                {paragraph}
              </Reveal>
            ))}
          </div>
          <div className={styles.photos}>
            <img src={sizedUrl(bio.portrait.url, 1200)} alt={bio.portrait.alt} className={`mono-hover ${styles.portrait}`} style={focalStyle(bio.portrait)} />
            {bio.secondaryImage && (
              <Reveal className={styles.secondaryWrap}>
                <img
                  src={sizedUrl(bio.secondaryImage.url, 1000)}
                  alt={bio.secondaryImage.alt}
                  className={`mono-hover ${styles.secondary}`}
                  style={focalStyle(bio.secondaryImage)}
                  loading="lazy"
                />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {bio.education && bio.education.length > 0 && <Education institutions={bio.education} />}
      {bio.milestones && bio.milestones.length > 0 && <Milestones milestones={bio.milestones} />}
    </>
  )
}

function Education({ institutions }: { institutions: Institution[] }) {
  return (
    <section className={styles.education}>
      <div className={styles.educationInner}>
        <Reveal as="p" className={styles.educationLabel}>
          Education
        </Reveal>
        <div className={styles.logos}>
          {institutions.map((institution, index) => (
            <Reveal key={institution._key} delay={index === 0 ? 0 : 120}>
              {institution.logoUrl ? (
                <img src={sizedUrl(institution.logoUrl, 500)} alt={institution.name} className={styles.logo} loading="lazy" />
              ) : (
                <span className={styles.logoName}>{institution.name}</span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Milestones({ milestones }: { milestones: Milestone[] }) {
  const scroller = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: -1 | 1) => {
    const track = scroller.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-card]')
    // Two cards per click, or most of the visible width if there is no card to measure
    const step = card ? (card.offsetWidth + 20) * 2 : track.clientWidth * 0.8
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <section className={styles.milestones}>
      <div className={styles.milestonesHeaderWrap}>
        <div className={styles.milestonesHeader}>
          <Reveal as="p" className="eyebrow">
            Milestones
          </Reveal>
          <Reveal as="h2" className="section-title">
            Selected Highlights
          </Reveal>
          <div className={styles.arrows}>
            <button type="button" aria-label="Scroll highlights left" className={styles.arrow} onClick={() => scrollBy(-1)}>
              <ArrowIcon direction="left" />
            </button>
            <button type="button" aria-label="Scroll highlights right" className={styles.arrow} onClick={() => scrollBy(1)}>
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
      <div ref={scroller} className={styles.track}>
        <div className={styles.cards}>
          {milestones.map((milestone) => (
            <Reveal key={milestone._key}>
              <article data-card className={styles.card}>
                <div className={styles.year}>{milestone.year}</div>
                <div>
                  <div className={styles.label}>{milestone.label}</div>
                  <h3 className={styles.cardTitle}>{milestone.title}</h3>
                </div>
                {milestone.detail && <p className={styles.detail}>{milestone.detail}</p>}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
