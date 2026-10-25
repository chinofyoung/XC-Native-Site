// Shared shape of the two install guides (mac.ts, ios.ts) and the homepage cards.
// Inline markup in copy strings: `code` and **bold**.

export type GuideCommand = { label: string; code: string }

export type GuideNote = { kind: 'tip' | 'warning'; title?: string; text: string }

export type GuideLink = { label: string; url: string }

export type GuideStep = {
  /** Anchor id, so the step can be linked. */
  id: string
  title: string
  /** What you are doing and why, one string per paragraph. */
  body: string[]
  /** The actions, in order, when a step has several. */
  substeps?: string[]
  /** A screenshot shown after the substeps (path under public/). */
  image?: { file: string; alt: string; caption?: string }
  commands?: GuideCommand[]
  /** Text after the commands, before "You should see". */
  after?: string[]
  /** What the source says happens, shown as "You should see …". */
  expect?: string
  notes?: GuideNote[]
  link?: GuideLink
  /** A secondary path, shown collapsed under the step. */
  advanced?: { title: string; body: string[]; commands?: GuideCommand[]; after?: string[]; expect?: string }
  /** Renders a page-specific block (for example the controls table). */
  extra?: 'controls'
}

export type TroubleItem = { q: string; a: string[] }

export type RelatedLink = { title: string; body: string; href: string; external?: boolean }

export type GuidePage = {
  eyebrow: string
  title: string
  summary: string
  experimental?: string
  time: string[]
  checklist: { title: string; items: string[] }
  byo: { title: string; items: string[] }
  steps: GuideStep[]
  troubleshooting: { intro: string; items: TroubleItem[] }
  related: RelatedLink[]
}

export const EXPERIMENTAL_NOTE =
  'Tested only on an iPhone 15 Pro Max, in the first area (a smooth 30 fps there). Nothing past it has been tested on iPhone.'

export const BYO_ITEMS = [
  'Your own game dump: Xenoblade Chronicles X: Definitive Edition, from a copy you bought.',
  'Your own `prod.keys`, dumped from your own Switch.',
  '**Never share the built app or the work folder.** They contain the game.',
  'We do not help you get keys or game files.',
]

export type GuideCard = {
  key: 'mac' | 'iphone'
  title: string
  summary: string
  facts: string[]
  cta: string
  path: string
  experimental?: boolean
}

/** Homepage highlight: two cards, neither is the default. */
export const GUIDE_CARDS: GuideCard[] = [
  {
    key: 'mac',
    title: 'Install on Mac',
    summary:
      'Turn your own game file and prod.keys into a double-clickable Mac app, in a small builder window or with one command. A clean build takes about 8 minutes.',
    facts: ['Apple silicon', 'macOS 26 or later', 'About 16 GB free'],
    cta: 'Open the Mac guide',
    path: 'mac/',
  },
  {
    key: 'iphone',
    title: 'Install on iPhone',
    summary:
      'Builds on the Mac setup: your Mac builds the app for the phone, then installs it with a cable and your own Apple ID. Tested only on an iPhone 15 Pro Max, in the first area.',
    facts: ['iOS 27 (iOS 26 is not enough)', 'iPhone 14 or newer', 'A Mac to build from'],
    cta: 'Open the iPhone guide',
    path: 'iphone/',
    experimental: true,
  },
]
