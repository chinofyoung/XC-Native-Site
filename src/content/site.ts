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
    id: '',
    device: 'M1 MacBook Air',
    caption: 'Early testing on a MacBook Air with M1, 16 GB. The game runs at its own 30 fps.',
    fps: '30 fps',
  },
]

export type Shot = { file: string; alt: string }

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

export const HERO_IMAGE = 'screenshots/xcx-stage4-battle.webp'

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
