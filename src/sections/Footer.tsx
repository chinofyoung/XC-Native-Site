import { ExternalLink } from '@/components/ExternalLink'
import { GithubIcon } from '@/components/GithubIcon'
import { CREDITS, REPO_URL } from '@/content/site'

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold">Credits</h2>
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
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl space-y-2">
            <p>Released under the MIT license.</p>
            <p>
              Not affiliated with, endorsed by, or sponsored by Nintendo or Monolith Soft. Nintendo, Nintendo Switch
              and Xenoblade Chronicles are trademarks of Nintendo.
            </p>
          </div>
          <ExternalLink
            href={REPO_URL}
            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent-cyan"
          >
            <GithubIcon className="size-4" />
            GitHub
          </ExternalLink>
        </div>
      </div>
    </footer>
  )
}
