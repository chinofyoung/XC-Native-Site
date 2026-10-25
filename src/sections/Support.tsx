import { KofiButton } from '@/components/ExternalLink'
import { DISPLAY_HEADING, OutlinedTitle, Shard } from '@/components/Brand'
import { cn } from '@/lib/utils'

export function Support() {
  return (
    <section id="support" className="scroll-mt-20 max-lg:scroll-mt-28 py-16 sm:py-24" aria-labelledby="support-title">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <div className="cut-panel-2 overflow-hidden px-6 py-12 sm:px-12 sm:py-16">
          <Shard className="absolute -top-8 -left-10 w-48 opacity-[0.08] sm:w-72" />
          <h2 id="support-title" className={cn(DISPLAY_HEADING, 'relative text-[clamp(2rem,6vw,3.5rem)]')}>
            <OutlinedTitle text="If this helped you" accent="helped you" />
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
            This is a hobby project. Tips help me keep testing.
          </p>
          <div className="relative mt-8 flex justify-center">
            {/* the one place Ko-fi is the primary action */}
            <KofiButton size="lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
