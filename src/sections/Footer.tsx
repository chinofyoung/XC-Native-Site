import { ExternalLink } from '@/components/ExternalLink'
import { GithubIcon } from '@/components/GithubIcon'
import { LogoMark } from '@/components/Brand'
import { CREDITS, REPO_URL } from '@/content/site'

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[#060d10] py-12">
      <div aria-hidden="true" className="absolute -top-px left-0 h-0.5 w-24 bg-accent-cyan sm:w-40" />
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-[0.06em] uppercase">Credits</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            {CREDITS.map((c) => (
              <li key={c.name}>
                <ExternalLink href={c.url} className="font-medium text-accent-cyan underline-offset-4 hover:underline">
                  {c.name}
                </ExternalLink>
                <span className="text-muted-foreground"> · {c.note}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="flex items-center gap-2 font-display text-base font-semibold text-ice">
              <LogoMark className="size-5 sm:size-5" />
              XC Native
            </p>
            <p>Released under the MIT license.</p>
            <p>
              Not affiliated with, endorsed by, or sponsored by Nintendo or Monolith Soft. Nintendo, Nintendo Switch
              and Xenoblade Chronicles are trademarks of Nintendo.
            </p>
          </div>
          <ExternalLink
            href={REPO_URL}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-foreground uppercase hover:text-accent-cyan"
          >
            <GithubIcon className="size-4" />
            GitHub
          </ExternalLink>
        </div>
      </div>
    </footer>
  )
}
