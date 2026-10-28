// The "Fixes" page: problems that have been fixed, newest first.
// Source: the shipped fix notes in tool-updates/ (one entry per fix). Features, renames and requirements are not
// listed here, and neither is anything not yet committed.
// To add a fix: add one object to FIXES (anywhere; the page sorts by date, newest first, and keeps the order of
// entries with the same date). Say only what the note says about testing.
// Inline markup: `code` and **bold**.

import { REPO_URL } from './site'

export type FixPlatform = 'Mac' | 'iPhone' | 'Mac and iPhone'

export type Fix = {
  /** The day the fix was committed, YYYY-MM-DD. */
  date: string
  /** Short sha of the XC-Native commit. */
  commit: string
  title: string
  platform: FixPlatform
  /** What was wrong, as a player saw it. */
  wrong: string
  /** What changed. */
  changed: string
  /** Game updates the fix covers, when the note says. */
  versions?: string
  /** Whether and where it was play-tested, exactly as the note says. */
  tested: string
  /** What is still a problem after a partial fix (it also stays in the known issues). */
  remaining?: string
}

export const FIXES_PAGE = {
  title: 'Fixes',
  eyebrow: 'Mac · iPhone',
  lead: 'Problems that have been fixed, newest first. Build the app again to get a fix.',
  openIssues: 'Problems that are still open are under Known issues on the home page.',
}

export const FIXES: Fix[] = [
  {
    date: '2026-10-28',
    commit: 'd5ff82c',
    title: 'The game closed after choosing a division',
    platform: 'Mac and iPhone',
    wrong:
      "After choosing a division and tracking Vandham's quest, the game closed. The division's periodic reward asks for a time function the port had left to the Switch's own code, which stopped the game because there is no Switch time service.",
    changed:
      'Every time function the game uses now runs on the Mac or iPhone clock, including the periodic reward check. A test makes sure none is left out.',
    versions: '2.0.0 and 1.0.1',
    tested:
      'Play-tested on Mac (2.0.0) on 2026-10-28: the game no longer closes there, and play continued into Chapter 3. Not checked: that the division reward arrives on its schedule; iPhone.',
  },
  {
    date: '2026-10-28',
    commit: '59ec458',
    title: 'Effects played twice as fast at 60 fps',
    platform: 'Mac and iPhone',
    wrong:
      'With the experimental 60 fps setting, effects played about twice as fast. The easiest one to see is the item that flies to your character after you pick up a collectible or open a treasure container.',
    changed:
      'The game\'s effect engine moved every effect by a fixed step each frame, sized for 30 fps. The 60 fps patch now scales that step by the real frame time, so effects play at the same speed as at 30 fps. At 30 fps the original code runs.',
    versions: '2.0.0 and 1.0.1',
    tested:
      'Play-tested on Mac (M1 MacBook Air, 2.0.0, 60 fps) on 2026-10-28: the item that flies to the character looks right. Not played on 1.0.1 or on an iPhone. Other effects (fire, battle arts, Skells, menus) were not checked one by one.',
  },
  {
    date: '2026-10-27',
    commit: 'c953cb5',
    title: 'Stretched meshes in field battles',
    platform: 'Mac and iPhone',
    wrong:
      'In field battles, single frames could show a character or monster stretched into spikes toward another object. It happened more often at 60 fps than at 30.',
    changed:
      'A write of bone data could overwrite data an earlier draw was still reading. The graphics layer now makes those writes wait for the earlier reads. In the test field battle the frame rate at 60 fps stayed the same as before the fix.',
    tested:
      'Play-tested on Mac (2.0.0, 60 fps, a field battle in East Gate Plain) on 2026-10-27: no stretched meshes with the fix, and the glitch came back with it turned off. Not checked: iPhone, 1.0.1, other scenes.',
  },
  {
    date: '2026-10-26',
    commit: '9cb7519',
    title: 'iPhone updates install over the app with the old name',
    platform: 'iPhone',
    wrong:
      'After the XCNative rename, an update installed as a second app next to the one with the old name. On a free Apple ID that already had 3 sideloaded apps, the install failed with `ApplicationVerificationFailed`.',
    changed:
      'The install step now finds an app installed under the old name and installs over it. Saves and the 14 GB game data stay, and no extra app slot is used. Keep the phone unlocked while it installs: on a locked phone it cannot see the old app.',
    tested:
      'The check that finds the installed app was tested on an iPhone 15 Pro Max (iOS 27) on 2026-10-26. An install over an actual old-name app is not checked yet.',
  },
  {
    date: '2026-10-25',
    commit: 'b336691',
    title: 'Flickering garbage frames at 60 fps',
    platform: 'Mac and iPhone',
    wrong:
      'At experimental 60 fps, single frames of garbage or flicker appeared in the scene, for example in the New Los Angeles hangar. The game could start writing the next frame\'s data while the GPU was still drawing an earlier frame with it.',
    changed: 'The graphics layer now makes the game wait the way a real Switch does before it reuses a picture.',
    tested:
      'Play-tested on Mac (2.0.0) on 2026-10-26, together with the fix for boxes and green streaks of the same day: at 60 fps the flicker is much rarer. Not checked: iPhone.',
    remaining:
      'Thin black lines or small white or black flashes still appear for a split second now and then, at 60 fps and, rarely, at 30 fps. They have a different cause, still unknown; they are in the known issues.',
  },
  {
    date: '2026-10-25',
    commit: 'b336691',
    title: 'Single-frame boxes and green streaks when the GPU falls behind',
    platform: 'Mac and iPhone',
    wrong:
      'For single frames, a large flat box could appear in front of the camera, or the whole scene could turn into green streaks. Seen at Bianno Lake at night with 60 fps on.',
    changed:
      'The graphics layer copies the game\'s per-draw data when it hands work to the GPU. Before, a whole block could be read live while the game was already writing the next frame into it. Now only the part the GPU itself writes is read live.',
    tested:
      'Play-tested on Mac (2.0.0) on 2026-10-26, together with the flicker fix of the same day: at 60 fps the flicker is much rarer. The play test does not tell the two fixes apart. Not checked: iPhone.',
    remaining:
      'Thin black lines or small white or black flashes still appear for a split second now and then; they are in the known issues.',
  },
  {
    date: '2026-10-25',
    commit: 'be7eafa',
    title: 'Soul Challenge ring ran twice as fast at 60 fps',
    platform: 'Mac and iPhone',
    wrong:
      'With the experimental 60 fps setting, the timed B-button prompt in battle (the Soul Challenge ring) ran twice as fast, so Perfect and Good were much harder to hit.',
    changed:
      'The ring now runs at its normal speed at any frame rate, so the Perfect and Good window keeps its length in time. At 30 fps nothing changes.',
    versions: '2.0.0 and 1.0.1',
    tested: 'Play-tested on Mac (2.0.0) on 2026-10-25, and on iPhone with an IPA built on 2026-10-25 or later: the ring runs at its normal speed at 60 fps.',
    remaining: 'A short sound cue of the prompt still plays early at 60 fps.',
  },
]

export const commitUrl = (sha: string) => `${REPO_URL}/commit/${sha}`

/** How to get a fix, from its platform. */
export function getItText(platform: FixPlatform): string {
  if (platform === 'Mac') return 'Build the app again to get it.'
  if (platform === 'iPhone') return 'Build the IPA again and install it again to get it.'
  return 'Build the app again to get it. On iPhone, build the IPA again and install it again.'
}

/** FIXES grouped by date, newest date first; entries keep their order within a date. */
export function fixesByDate(fixes: Fix[] = FIXES): { date: string; fixes: Fix[] }[] {
  const groups = new Map<string, Fix[]>()
  for (const f of fixes) groups.set(f.date, [...(groups.get(f.date) ?? []), f])
  return [...groups.entries()]
    .sort(([a], [b]) => (a < b ? 1 : a > b ? -1 : 0))
    .map(([date, list]) => ({ date, fixes: list }))
}
