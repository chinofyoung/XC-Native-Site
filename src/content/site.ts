export const KOFI_URL = 'https://ko-fi.com/chinofyoungdev'
export const REPO_URL = 'https://github.com/chinofyoung/XC-Native'
export const README_URL = `${REPO_URL}#readme`
export const ISSUES_URL = `${REPO_URL}/issues`
export const UPSTREAM_URL = 'https://github.com/ly05010419/MacNativeGames'
export const D2R_URL = 'https://github.com/jhaizhou-ops/d2r-mobile'

export type Video = { id: string; device: string; caption: string; fps: string; title?: string }

/** YouTube ids; an empty id renders a "coming soon" card. */
export const VIDEOS: Video[] = [
  {
    id: '03pSBNEmmGQ',
    device: 'iPhone 15 Pro Max',
    title: 'Gameplay, 0:23',
    caption:
      'Experimental, running natively on iPhone 15 Pro Max. First area only: a smooth 30 fps there, and nothing past it has been tested on iPhone.',
    fps: '30 fps',
  },
  {
    id: 'Pz0GTYMqbWY',
    device: 'iPhone 15 Pro Max',
    title: 'Gameplay, 0:44',
    caption:
      'Experimental, running natively on iPhone 15 Pro Max. First area only: a smooth 30 fps there, and nothing past it has been tested on iPhone.',
    fps: '30 fps',
  },
  {
    id: 'F66DfFCeHR0',
    device: 'M1 MacBook Air',
    caption: 'Early testing on a MacBook Air with M1, 16 GB. The game runs at its own 30 fps.',
    fps: '30 fps',
  },
  {
    id: 'WeeY_6jE64Q',
    device: 'M1 MacBook Air',
    caption: 'Running natively on macOS, MacBook Air with M1. The game runs at its own 30 fps.',
    fps: '30 fps',
  },
]

export type Shot = { file: string; alt: string }

export const IOS_CONTROLS = {
  title: 'On iPhone: play with touch or a controller',
  touch: 'No controller connected? On-screen controls laid out like a Switch controller appear automatically.',
  gamepad: 'Connect a gamepad and the on-screen controls hide. Disconnect it and they come back.',
}

export const PLAYTHROUGH = {
  eyebrow: 'How it gets tested',
  title: "I'm playing the game, and fixing things as I go",
  paragraphs: [
    "There is no test lab behind this. I'm playing Xenoblade Chronicles X the normal way, on an M1 MacBook Air and an iPhone 15 Pro Max, and when something breaks I stop, fix it in the port, and keep playing.",
    "That is why the status list below looks the way it does: the parts I've reached work, and the parts I haven't reached yet simply haven't been checked. Each fix lands in the repo, so the next build you make includes it.",
  ],
  cta: 'Ran into something before I got there? Open an issue',
}

export const EARLY_NOTICE = {
  title: 'This is an early version, not thoroughly tested yet',
  body: "Only parts of the game have been played and checked so far, mostly the opening areas. Expect bugs, crashes and graphics problems, especially in places nobody has reached yet. The iPhone build is experimental.",
  links: { status: 'See what works and what is known to break', issues: 'Report a problem' },
}

export const GALLERY: Shot[] = [
  {
    file: 'screenshots/xcx-stage5-app-title.webp',
    alt: 'The title screen running natively on a Mac, with New Game, Continue, Load Game and Settings.',
  },
  {
    file: 'screenshots/xcx-stage5-app-continue.webp',
    alt: 'Two characters standing in a rainy, dark Primordia field after Continue loads a save.',
  },
  {
    file: 'screenshots/xcx-field-gameplay.webp',
    alt: 'The player character running through tall grass in Primordia with the minimap in the corner.',
  },
  {
    file: 'screenshots/xcx-stage4-battle.webp',
    alt: 'A first battle against an Origin Blatta, with party health and the battle HUD drawn.',
  },
]

/** The project's own screenshot. To go back to it, point the hero at `asset(HERO_IMAGE)` instead of HERO_ART_URL. */
export const HERO_IMAGE = 'screenshots/xcx-stage4-battle.webp'

/**
 * Hero key art: official Xenoblade Chronicles X art, loaded from IGN. Kept on purpose
 * by the owner; HERO_IMAGE is the project's own screenshot if it ever needs swapping.
 */
export const HERO_ART_URL =
  'https://assets-prd.ignimgs.com/2021/12/30/xenoblade-chronicles-x-button-2021-1640846839930.jpg'

/** Hero micro-copy. iPhone claims stay as limited as the rest of the site. */
export const HERO = {
  title: 'Xenoblade Chronicles X, native on Apple silicon',
  sub: 'Native on Apple silicon',
  spec: '30 FPS · v1.0.1 / v2.0.0',
  platforms: 'Mac · iPhone',
  panels: [
    {
      title: 'Not an emulator',
      body: "The game's own code runs directly on Apple silicon. Graphics are drawn with Metal.",
    },
    {
      title: 'Mac + iPhone',
      body: 'A smooth 30 fps on an M1 MacBook Air. iPhone (experimental) is tested on a 15 Pro Max, in the first area only. 60 fps is experimental.',
    },
    {
      title: 'Bring your own',
      body: 'Built on your Mac from your own game dump and prod.keys. No game, keys or builds are shared.',
    },
  ],
  early: { label: 'EARLY', note: 'Not thoroughly tested yet', srText: 'Early testing, expect bugs.' },
}

export const CREDITS: { name: string; url: string; note: string }[] = [
  {
    name: 'MacNativeGames',
    url: UPSTREAM_URL,
    note: 'The runtime, rewriter, graphics layer and app this port is built from (MIT).',
  },
  {
    name: 'd2r-mobile',
    url: D2R_URL,
    note: 'Developed this way of running Switch games natively (MIT).',
  },
  {
    name: 'Ryujinx',
    url: `${REPO_URL}/tree/main/vendor/ryujinx`,
    note: 'Its shader translator is vendored and compiled ahead of time (MIT).',
  },
  {
    name: 'SPIRV-Cross',
    url: 'https://github.com/KhronosGroup/SPIRV-Cross',
    note: 'Fetched at a pinned commit and compiled during the build (Apache-2.0).',
  },
  {
    name: 'libopus',
    url: 'https://opus-codec.org',
    note: 'Audio decoding, installed from Homebrew (BSD).',
  },
  {
    name: 'libvpx',
    url: 'https://www.webmproject.org',
    note: 'Decodes the game\'s movies, installed from Homebrew (BSD).',
  },
]

export const UPSTREAM = {
  eyebrow: 'Credits',
  title: 'Built on MacNativeGames',
  intro:
    'XC-Native is a fork of MacNativeGames, released under MIT. It reuses that project\'s runtime, its ahead-of-time code rewriter, its NVN-on-Metal graphics layer and its app. The Xenoblade X port started from its Bayonetta 3 port.',
  heroPrefix: 'Built on',
  author: 'ly05010419',
  main: {
    name: 'MacNativeGames',
    by: 'by ly05010419',
    description: 'Native Apple silicon ports of Tears of the Kingdom, Breath of the Wild and Bayonetta 3',
    license: 'MIT',
    cta: 'View on GitHub',
    url: UPSTREAM_URL,
  },
  root: {
    name: 'd2r-mobile',
    description: 'MacNativeGames itself builds on d2r-mobile, which developed this way of running Switch games natively.',
    license: 'MIT',
    url: D2R_URL,
  },
  othersHeading: 'Also built with',
}
