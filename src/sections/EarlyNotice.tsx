import { FlaskConical } from 'lucide-react'
import { ExternalLink } from '@/components/ExternalLink'
import { EARLY_NOTICE, ISSUES_URL } from '@/content/site'

export function EarlyNotice() {
  return (
    <aside aria-labelledby="early-notice-title" className="relative border-y border-warning/25 bg-deep">
      <div aria-hidden="true" className="hazard-stripes absolute inset-y-0 left-0 w-2 sm:w-3" />
      <div className="mx-auto flex max-w-6xl gap-4 py-6 pr-4 pl-6 sm:px-8">
        <FlaskConical aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-warning" />
        <div>
          <h2
            id="early-notice-title"
            className="font-display text-base font-semibold tracking-[0.04em] text-foreground uppercase sm:text-lg"
          >
            {EARLY_NOTICE.title}
          </h2>
          <p className="mt-1.5 max-w-3xl text-sm text-muted-foreground">{EARLY_NOTICE.body}</p>
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#status" className="text-accent-cyan underline-offset-4 hover:underline">
              {EARLY_NOTICE.links.status}
            </a>
            <ExternalLink href={ISSUES_URL} className="text-accent-cyan underline-offset-4 hover:underline">
              {EARLY_NOTICE.links.issues} ↗
            </ExternalLink>
          </p>
        </div>
      </div>
    </aside>
  )
}
