import { ArrowRight, TriangleAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { ExternalLink, KofiButton } from '@/components/ExternalLink'
import { HERO_IMAGE, UPSTREAM, UPSTREAM_URL } from '@/content/site'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <header id="top" className="relative isolate overflow-hidden border-b border-white/10 scroll-mt-20">
      <img
        src={asset(HERO_IMAGE)}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/25 via-background/45 to-background" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(34,211,238,0.14),transparent)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_55%,rgba(7,11,20,0.62),transparent)]" />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-36">
        <Badge className="h-7 gap-1.5 border-warning/40 bg-warning/15 px-3 text-sm text-warning">
          <TriangleAlert aria-hidden="true" />
          Early testing · expect bugs
        </Badge>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          Xenoblade Chronicles X, native on <span className="text-accent-cyan">Apple silicon</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
          Your own copy of the game, running on your Mac and your iPhone (experimental). No emulator: the game's own code runs
          directly on the chip.
        </p>
        <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href="#guide"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-11 bg-accent-cyan px-5 text-base font-semibold text-background hover:bg-accent-cyan/85',
            )}
          >
            Start the guide
            <ArrowRight aria-hidden="true" />
          </a>
          <KofiButton size="lg" variant="outline" />
        </div>
        <p className="mt-8 font-display text-sm tracking-wide text-muted-foreground">
          Mac · iPhone · 30 fps · v1.0.1 / v2.0.0
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {UPSTREAM.heroPrefix}{' '}
          <ExternalLink href={UPSTREAM_URL} className="font-medium text-accent-cyan underline-offset-4 hover:underline">
            {UPSTREAM.main.name}
          </ExternalLink>{' '}
          by {UPSTREAM.author}
        </p>
      </div>
    </header>
  )
}
