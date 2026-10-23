import { ExternalLink } from '@/components/ExternalLink'
import { README_URL } from '@/content/site'
import { FileDigit, KeyRound, Package, ShieldAlert } from 'lucide-react'

const NEEDS = [
  {
    icon: FileDigit,
    title: 'Your own game file',
    body: 'Xenoblade Chronicles X: Definitive Edition, as an XCI or NSP that you dumped yourself.',
  },
  {
    icon: KeyRound,
    title: 'Your own prod.keys',
    body: 'Dumped from your own Switch. Nothing here gets you keys.',
  },
  {
    icon: Package,
    title: 'Update 1.0.1 or 2.0.0',
    body: 'An XCI that holds 1.0.1 builds 1.0.1. A base NSP needs the 1.0.1 or 2.0.0 update NSP. Add the 2.0.0 update NSP to build 2.0.0.',
  },
]

export function BringYourOwn() {
  return (
    <section className="scroll-mt-20 pb-4" aria-labelledby="byo-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-accent-cyan/30 bg-surface p-6 shadow-[0_0_60px_-20px_rgba(34,211,238,0.35)] sm:p-10">
          <p className="font-display text-xs font-medium tracking-[0.2em] text-accent-cyan uppercase">
            Before you start
          </p>
          <h2 id="byo-title" className="mt-3 text-3xl font-bold tracking-tight">
            Bring your own game
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            This project ships no game, no keys and no builds. You make the app yourself, on your own machine, from a
            game you own and keys from your own Switch.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {NEEDS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="rounded-xl border border-white/10 bg-background/60 p-5">
                <Icon className="size-6 text-accent-cyan" aria-hidden="true" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3 rounded-xl border border-white/10 bg-background/60 p-5">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-accent-cyan" aria-hidden="true" />
            <div className="space-y-2 text-sm">
              <p>
                You need a <strong>copy you bought</strong>. We do not help you get keys or game files.
              </p>
              <p>
                <ExternalLink href={README_URL} className="text-accent-cyan underline underline-offset-4">
                  NSP builds need a few extra files (see the README).
                </ExternalLink>
              </p>
              <p>
                <strong>Never share the built app</strong> or the work folder. They contain the game.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
