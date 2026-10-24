import { KofiButton } from '@/components/ExternalLink'

export function Support() {
  return (
    <section id="support" className="scroll-mt-20 py-16 sm:py-24" aria-labelledby="support-title">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <div className="rounded-2xl border border-white/10 bg-surface px-6 py-12 sm:px-12">
          <h2 id="support-title" className="text-3xl font-bold tracking-tight">
            If this helped you
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            This is a hobby project. Tips help me keep testing.
          </p>
          <div className="mt-8 flex justify-center">
            <KofiButton size="lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
