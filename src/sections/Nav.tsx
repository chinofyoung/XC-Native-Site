import { useEffect, useRef, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { ExternalLink, KofiButton } from '@/components/ExternalLink'
import { GithubIcon } from '@/components/GithubIcon'
import { LogoMark } from '@/components/Brand'
import { buttonVariants } from '@/components/ui/button'
import { REPO_URL } from '@/content/site'
import { cn } from '@/lib/utils'

type Page = 'home' | 'sharing' | 'saves' | 'fixes' | 'mac' | 'iphone'
type PageLink = { page: Page; path: string; label: string }

const PAGE_LINKS: PageLink[] = [
  { page: 'sharing', path: 'sharing-shaders/', label: 'Share shaders' },
  { page: 'saves', path: 'moving-saves/', label: 'Move saves' },
  { page: 'fixes', path: 'fixes/', label: 'Fixes' },
]

/** The home page sections, in the order the section bar lists them. */
const SECTION_LINKS = [
  { id: 'guide', label: 'Guide' },
  { id: 'media', label: 'Media' },
  { id: 'status', label: 'Status' },
  { id: 'credits', label: 'Credits' },
] as const

// a 2px bottom bar that is always there (transparent until current), so marking a link never shifts the layout
const linkCls =
  'block border-b-2 border-transparent px-2 py-2 font-sans text-xs font-medium tracking-[0.12em] whitespace-nowrap text-ice/85 uppercase hover:text-accent-cyan focus-visible:text-accent-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan motion-safe:transition-colors'
const currentCls = 'border-accent-cyan text-accent-cyan'

const solidBar = 'border-border bg-background/90 backdrop-blur-md'

/** True once the page has scrolled past the top, so the main bar can turn solid. */
function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

/**
 * For the home page section bar: whether the hero has scrolled out from under the main bar (the bar shows then),
 * and which listed section is under a line a third of the way down the space left below the bars.
 */
function useSectionTracking(enabled: boolean, mainRef: RefObject<HTMLElement | null>, barsRef: RefObject<HTMLElement | null>) {
  const [state, setState] = useState<{ shown: boolean; active: string | null }>({ shown: false, active: null })
  useEffect(() => {
    if (!enabled) return
    let frame = 0
    const measure = () => {
      frame = 0
      const hero = document.getElementById('top')
      const mainBottom = mainRef.current?.getBoundingClientRect().bottom ?? 0
      const shown = hero ? hero.getBoundingClientRect().bottom <= mainBottom : true
      const barsBottom = barsRef.current?.getBoundingClientRect().bottom ?? mainBottom
      const probe = barsBottom + (window.innerHeight - barsBottom) / 3
      let active: string | null = null
      for (const { id } of SECTION_LINKS) {
        const r = document.getElementById(id)?.getBoundingClientRect()
        if (r && r.height > 0 && r.top <= probe && r.bottom > probe) active = id
      }
      setState((s) => (s.shown === shown && s.active === active ? s : { shown, active }))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [enabled, mainRef, barsRef])
  return state
}

/**
 * Fixed at the top: the main bar (transparent over the hero, solid with a blur once scrolled) links the pages.
 * On the home page a second bar below it links the sections; it appears once the hero has scrolled away and marks
 * the section in view.
 */
export function Nav({ page = 'home' }: { page?: Page }) {
  const base = import.meta.env.BASE_URL
  const home = page === 'home'
  const scrolled = useScrolled()
  const barsRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const { shown, active } = useSectionTracking(home, mainRef, barsRef)

  const pageLinks = PAGE_LINKS.map((l) => {
    const current = l.page === page
    return (
      <li key={l.path}>
        <a
          href={`${base}${l.path}`}
          aria-current={current ? 'page' : undefined}
          className={cn(linkCls, current && currentCls)}
        >
          {l.label}
        </a>
      </li>
    )
  })

  // portalled to <body>: inside the hero's stacking context Chrome blurs only the hero, so content scrolled under
  // the bars showed through sharp
  return createPortal(
    <div ref={barsRef} className="fixed inset-x-0 top-0 z-40">
      <nav
        ref={mainRef}
        aria-label="Main"
        className={cn(
          'border-b motion-safe:transition-[background-color,border-color] motion-safe:duration-300',
          scrolled ? solidBar : 'border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-16 xl:px-10">
          <a
            href={home ? '#top' : base}
            className="flex shrink-0 items-center gap-2.5 font-display text-xl font-semibold tracking-[0.02em] whitespace-nowrap text-ice sm:text-[22px]"
          >
            <LogoMark />
            <span className="max-sm:sr-only">XC Native</span>
          </a>
          <ul className="hidden items-center gap-1 lg:flex xl:gap-3">{pageLinks}</ul>
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <ExternalLink
              href={REPO_URL}
              aria-label="GitHub repository"
              className="flex size-9 items-center justify-center text-ice/80 hover:text-accent-cyan focus-visible:outline-2 focus-visible:outline-accent-cyan"
            >
              <GithubIcon />
            </ExternalLink>
            <KofiButton label="Ko-fi" variant="outline" className="max-sm:px-2.5" labelClassName="max-sm:sr-only" />
            <a
              href={`${home ? '' : base}#guide`}
              className={cn(buttonVariants(), 'h-9 px-3 text-[11px] sm:px-4 sm:text-xs')}
            >
              Start the guide
            </a>
          </div>
        </div>
        <ul className="mx-auto flex max-w-[1240px] items-center overflow-x-auto px-2 sm:gap-2 sm:px-4 lg:hidden">
          {pageLinks}
        </ul>
      </nav>
      {home && (
        <nav
          id="section-nav"
          aria-label="Sections"
          // hidden over the hero: not focusable or announced until it shows
          inert={!shown}
          className={cn(
            'border-b motion-safe:transition-[opacity,translate,visibility] motion-safe:duration-300',
            solidBar,
            shown ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
          )}
        >
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 xl:px-10">
            <ul className="-mx-2 flex h-10 items-center gap-1 overflow-x-auto sm:gap-2">
              {SECTION_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={active === l.id ? 'location' : undefined}
                    className={cn(linkCls, active === l.id && currentCls)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </div>,
    document.body,
  )
}
