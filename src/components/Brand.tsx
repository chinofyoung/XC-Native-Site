import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Thin wide Michroma label above a heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('font-label text-[11px] tracking-[0.3em] text-accent-cyan uppercase sm:text-xs', className)}>
      {children}
    </p>
  )
}

/**
 * A heading string with its accent part drawn in outline. `accent` must be the
 * tail of `text`; when it is left out, the last word (or the last two words of
 * a longer title) is outlined, and a one-word title is left plain. The accessible name is still the full text.
 */
export function OutlinedTitle({ text, accent }: { text: string; accent?: string }) {
  let tail = accent
  if (!tail || !text.endsWith(tail)) {
    const words = text.split(' ')
    if (words.length < 2) return <>{text}</>
    tail = words.slice(words.length >= 4 ? -2 : -1).join(' ')
  }
  const head = text.slice(0, text.length - tail.length)
  return (
    <>
      {head}
      <span className="text-outline">{tail}</span>
    </>
  )
}

/** Heavy italic uppercase display heading class, used by section h2s and page h1s. */
export const DISPLAY_HEADING =
  'font-display font-black italic uppercase leading-[0.95] tracking-[-0.01em] [overflow-wrap:anywhere] [--stroke:1.5px] sm:[--stroke:2px]'

/**
 * Angular shard decoration: slanted slabs, not the concept's cross shape
 * (the crosses were dropped from the design). Purely decorative.
 */
export function Shard({ className, withTip = true }: { className?: string; withTip?: boolean }) {
  return (
    <svg viewBox="0 0 300 260" aria-hidden="true" focusable="false" className={cn('pointer-events-none fill-ice', className)}>
      <path d="M150 0 L210 0 L120 260 L60 260 Z" />
      <path d="M232 0 L252 0 L162 260 L142 260 Z" opacity=".7" />
      {withTip && <path d="M60 150 L120 150 L102 200 L20 200 Z" opacity=".5" />}
    </svg>
  )
}

/** The X mark used next to the "XC Native" name. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={cn('size-7 sm:size-8', className)}>
      <path d="M3 3h10l7 11 7-11h10L25 20l12 17H27l-7-11-7 11H3l12-17z" fill="currentColor" />
    </svg>
  )
}
