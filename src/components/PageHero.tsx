import type { ReactNode } from 'react'
import { DISPLAY_HEADING, Eyebrow, OutlinedTitle, Shard } from '@/components/Brand'
import { cn } from '@/lib/utils'

type Props = { eyebrow: string; title: string; accent?: string; children?: ReactNode }

/** The shorter hero band used by the Mac, iPhone and Sharing pages. The fixed Nav sits over its top. */
export function PageHero({ eyebrow, title, accent, children }: Props) {
  return (
    <header id="top" className="bg-slate-band relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_80%_20%,rgba(63,227,210,.14),transparent_70%),linear-gradient(0deg,rgba(8,16,19,.85)_0%,transparent_45%)]"
      />
      <Shard className="absolute top-16 -right-16 -z-10 w-72 -scale-x-100 opacity-[0.09] sm:right-[4%] sm:w-[420px]" />
      <div className="mx-auto max-w-6xl px-4 pt-32 pb-12 sm:px-6 sm:pt-32 lg:pt-36 lg:pb-16">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className={cn(DISPLAY_HEADING, 'mt-3 text-[clamp(2.5rem,8vw,5rem)]')}>
          <OutlinedTitle text={title} accent={accent} />
        </h1>
        {children}
      </div>
    </header>
  )
}

/** "On this page" list, as a cut-corner panel. */
export function OnThisPage({ label, items }: { label: string; items: { href: string; title: string }[] }) {
  return (
    <nav aria-label={label} className="cut-panel mt-8 max-w-3xl p-5 sm:p-6">
      <p className="font-label text-[11px] tracking-[0.3em] text-accent-cyan uppercase">On this page</p>
      <ol className="mt-4 gap-x-8 text-sm sm:columns-2">
        {items.map((s, i) => (
          <li key={s.href} className="mb-2 flex break-inside-avoid gap-3">
            <span aria-hidden="true" className="w-5 shrink-0 font-display font-black text-accent-cyan/70 italic">
              {String(i + 1).padStart(2, '0')}
            </span>
            <a href={s.href} className="text-ice/90 underline-offset-4 hover:text-accent-cyan hover:underline">
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
