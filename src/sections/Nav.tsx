import { ExternalLink, KofiButton } from '@/components/ExternalLink'
import { GithubIcon } from '@/components/GithubIcon'
import { REPO_URL } from '@/content/site'

const LINKS = [
  { href: '#guide', label: 'Guide' },
  { href: '#media', label: 'Media' },
  { href: '#status', label: 'Status' },
  { href: '#credits', label: 'Credits' },
]

export function Nav() {
  return (
    <nav
      aria-label="Main"
      className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight text-foreground sm:text-base">
          XCX <span className="text-accent-cyan">native</span>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:outline-none motion-safe:transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ExternalLink
            href={REPO_URL}
            aria-label="GitHub repository"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:outline-none"
          >
            <GithubIcon />
          </ExternalLink>
          <KofiButton label="Ko-fi" variant="outline" />
        </div>
      </div>
      <ul className="mx-auto flex max-w-6xl items-center gap-1 border-t border-white/5 px-3 sm:hidden">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:outline-none"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
