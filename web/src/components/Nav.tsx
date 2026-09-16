import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Nav.module.css'
import { navLinks } from './navLinks'

const linkClass = ({ isActive }: { isActive: boolean }) => `${styles.link} ${isActive ? styles.active : ''}`

export function Nav({ name }: { name: string }) {
  // Phones cannot fit four links beside the name, so they get a menu instead
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && closeMenu()
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <nav aria-label="Main" className={styles.nav}>
      <Link to="/" className={styles.brand} onClick={closeMenu}>
        {name}
      </Link>
      <div className={styles.links}>
        {navLinks.map(({ to, label }) => (
          <NavLink key={to} to={to} className={linkClass}>
            {label}
          </NavLink>
        ))}
      </div>
      <button
        type="button"
        className={styles.menuButton}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>
      {menuOpen && (
        <div id="mobile-menu" className={styles.mobileMenu}>
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={closeMenu}>
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
