import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { observeReveal, prefersReducedMotion } from '../lib/reveal'
import styles from './Reveal.module.css'

type Props = {
  children: ReactNode
  as?: ElementType
  from?: 'up' | 'right' | 'left' | 'fade'
  /** Milliseconds */
  delay?: 0 | 100 | 120 | 150
  className?: string
}

/** Fades its content in when scrolled into view, and out again when it leaves, so it replays. */
export function Reveal({ children, as: Tag = 'div', from = 'up', delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [animated] = useState(() => !prefersReducedMotion())

  useEffect(() => {
    if (!animated || !ref.current) return
    return observeReveal(ref.current, setVisible)
  }, [animated])

  const classes = [
    className,
    animated && styles.reveal,
    animated && styles[from],
    animated && delay > 0 && styles[`delay${delay}`],
    animated && visible && styles.visible,
  ]
  return (
    <Tag ref={ref} className={classes.filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}
