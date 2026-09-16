import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <section className={styles.notFound}>
      <p className="eyebrow">404</p>
      <h1 className={styles.title}>Page not found</h1>
      <Link to="/" className="btn btn-outline">
        Back home
      </Link>
    </section>
  )
}
