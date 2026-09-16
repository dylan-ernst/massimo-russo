import styles from './ContentStatus.module.css'

type Props = { status: 'loading' } | { status: 'error'; message: string }

/** Placeholder while a page's content loads, and a visible message if it fails. */
export function ContentStatus(props: Props) {
  if (props.status === 'loading') {
    return <div className={styles.box} role="status" aria-label="Loading" />
  }
  return (
    <div className={styles.box} role="alert">
      <p className={styles.title}>This page could not load.</p>
      <p className={styles.detail}>Please refresh to try again.</p>
      <p className={styles.technical}>{props.message}</p>
    </div>
  )
}
