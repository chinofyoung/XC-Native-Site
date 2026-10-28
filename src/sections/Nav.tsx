import { useEffect, useState } from 'react'
import { ExternalLink, KofiButton } from '@/components/ExternalLink'
import { GithubIcon } from '@/components/GithubIcon'
import { LogoMark } from '@/components/Brand'
import { buttonVariants } from '@/components/ui/button'
import { REPO_URL } from '@/content/site'
import { cn } from '@/lib/utils'

type NavLink = { href: string; label: string; short?: string }

const SECTION_LINKS: NavLink[] = [
  { href: '#guide', label: 'Guide' },
  { href: '#media', label: 'Media' },
  { href: '#status', label: 'Status' },
  { href: '#credits', label: 'Credits' },
]

const linkCls =
  'block px-2 py-2 font-sans text-xs font-medium tracking-[0.12em] text-ice/85 uppercase hover:text-accent-cyan focus-visible:text-accent-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan motion-safe:transition-colors'

/** True once the page has scrolled past the top, so the nav can turn solid. */
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
 * Fixed over the hero: transparent at the top of the page, solid with a blur
 * once scrolled. On the landing page links are plain hashes; on other pages
 * they point back to it.
 */
export function Nav({ page = 'home' }: { page?: 'home' | 'sharing' | 'saves' | 'fixes' | 'mac' | 'iphone' }) {
  const base = import.meta.env.BASE_URL
  const prefix = page === 'home' ? '' : base
  const scrolled = useScrolled()
  const LINKS: NavLink[] = [
    ...SECTION_LINKS.map((l) => ({ ...l, href: `${prefix}${l.href}` })),
    { href: `${base}sharing-shaders/`, label: 'Share shaders', short: 'Shaders' },
    { href: `${base}moving-saves/`, label: 'Move saves', short: 'Saves' },
    { href: `${base}fixes/`, label: 'Fixes' },
  ]
  return (
    <nav
      aria-label="Main"
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b motion-safe:transition-[background-color,border-color] motion-safe:duration-300',
        scrolled ? 'border-border bg-background/90 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-16 xl:px-10">
        <a
          href={page === 'home' ? '#top' : base}
          className="flex shrink-0 items-center gap-2.5 font-display text-xl font-semibold tracking-[0.02em] whitespace-nowrap text-ice sm:text-[22px]"
        >
          <LogoMark />
          <span className="max-sm:sr-only">XC Native</span>
        </a>
        <ul className="hidden items-center gap-0.5 lg:flex xl:gap-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={cn(linkCls, 'whitespace-nowrap lg:px-1.5 xl:px-2')}>
                {/* the short label and tighter spacing until xl, so seven links and the buttons fit at 1024 px */}
                {l.short ? (
                  <>
                    <span className="xl:hidden">{l.short}</span>
                    <span className="hidden xl:inline">{l.label}</span>
                  </>
                ) : (
                  l.label
                )}
              </a>
            </li>
          ))}
        </ul>
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
            href={`${prefix}#guide`}
            className={cn(buttonVariants(), 'h-9 px-3 text-[11px] sm:px-4 sm:text-xs')}
          >
            Start the guide
          </a>
        </div>
      </div>
      <ul className="mx-auto flex max-w-[1240px] items-center justify-between overflow-x-auto px-2 sm:justify-start sm:gap-2 sm:px-4 lg:hidden">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} className={linkCls}>
              {l.short ?? l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
