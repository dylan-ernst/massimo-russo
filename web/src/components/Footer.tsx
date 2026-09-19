import { Link } from 'react-router-dom'
import type { SiteSettings } from '../content/types'
import styles from './Footer.module.css'
import { navLinks } from './navLinks'
import { SocialLinks } from './SocialLinks'

type Props = { settings: SiteSettings; showSocial?: boolean }

export function Footer({ settings, showSocial = true }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <div className={styles.name}>{settings.name}</div>
          <p className={styles.tagline}>
            {settings.role} &middot; {settings.location}
          </p>
        </div>

        <nav aria-label="Footer" className={styles.nav}>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={styles.navLink}>
              {label}
            </Link>
          ))}
        </nav>

        {showSocial && <SocialLinks settings={settings} include={['email', 'instagram', 'youtube', 'spotify']} />}

        <div className={styles.legal}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {settings.name}. All rights reserved.
          </p>
          <a href="https://dylanernst.dev" target="_blank" rel="noopener noreferrer" className={styles.credit}>
            Designed by Dylan Ernst
          </a>
        </div>
      </div>
    </footer>
  )
}
