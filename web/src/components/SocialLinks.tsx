import type { SiteSettings } from '../content/types'
import { EmailIcon, InstagramIcon, SpotifyIcon, YouTubeIcon } from './icons'
import styles from './SocialLinks.module.css'

type Props = {
  settings: SiteSettings
  include: ('email' | 'instagram' | 'youtube' | 'spotify')[]
  size?: number
  className?: string
}

/** Icon links; any service without a link in Site settings is left out. */
export function SocialLinks({ settings, include, size = 20, className = '' }: Props) {
  const links = {
    email: settings.email && { href: `mailto:${settings.email}`, label: 'Email', Icon: EmailIcon },
    instagram: settings.instagramUrl && { href: settings.instagramUrl, label: 'Instagram', Icon: InstagramIcon },
    youtube: settings.youtubeUrl && { href: settings.youtubeUrl, label: 'YouTube', Icon: YouTubeIcon },
    spotify: settings.spotifyUrl && { href: settings.spotifyUrl, label: 'Spotify', Icon: SpotifyIcon },
  }

  return (
    <div className={`${styles.links} ${className}`}>
      {include.map((name) => {
        const link = links[name]
        if (!link) return null
        const external = name !== 'email'
        return (
          <a
            key={name}
            href={link.href}
            aria-label={link.label}
            className={styles.link}
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
          >
            <link.Icon size={size} />
          </a>
        )
      })}
    </div>
  )
}
