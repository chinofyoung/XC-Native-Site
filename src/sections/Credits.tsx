import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { ExternalLink } from '@/components/ExternalLink'
import { GithubIcon } from '@/components/GithubIcon'
import { CREDITS, UPSTREAM } from '@/content/site'
import { cn } from '@/lib/utils'
import { Section } from './Section'

const OTHERS = CREDITS.filter((c) => c.url !== UPSTREAM.main.url && c.url !== UPSTREAM.root.url)

export function Credits() {
  const { main, root } = UPSTREAM
  return (
    <Section id="credits" eyebrow={UPSTREAM.eyebrow} title={UPSTREAM.title} intro={UPSTREAM.intro}>
      <div className="max-w-3xl space-y-4">
        <div className="rounded-xl border border-accent-cyan/30 bg-surface p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl font-semibold">{main.name}</h3>
            <Badge variant="outline">{main.license}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{main.by}</p>
          <p className="mt-4">{main.description}</p>
          <ExternalLink
            href={main.url}
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'mt-6 h-10 px-4')}
          >
            <GithubIcon className="size-4" />
            {main.cta}
            <ArrowUpRight aria-hidden="true" />
          </ExternalLink>
        </div>

        <div className="rounded-xl border border-white/10 bg-surface p-5">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-lg font-semibold">
              <ExternalLink href={root.url} className="text-accent-cyan underline-offset-4 hover:underline">
                {root.name}
              </ExternalLink>
            </h3>
            <Badge variant="outline">{root.license}</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{root.description}</p>
        </div>

        <h3 className="pt-6 text-sm font-semibold text-muted-foreground">{UPSTREAM.othersHeading}</h3>
        <ul className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          {OTHERS.map((c) => (
            <li key={c.name}>
              <ExternalLink href={c.url} className="font-medium text-accent-cyan underline-offset-4 hover:underline">
                {c.name}
              </ExternalLink>
              <span className="text-muted-foreground"> · {c.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
