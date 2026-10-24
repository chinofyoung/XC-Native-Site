import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { GALLERY, HERO_IMAGE, VIDEOS, KOFI_URL, CREDITS } from './site'
import { MAC_STEPS, MAC_GUIDE } from './mac'
import { IOS_STEPS, IOS_GUIDE } from './ios'
import type { GuideStep } from './guide'

const commandsOf = (steps: GuideStep[]) =>
  steps.flatMap((s) => [...(s.commands ?? []), ...(s.advanced?.commands ?? [])].map((c) => c.code))
import { STAGES } from './status'
import { asset } from '@/lib/asset'

const pub = (p: string) => resolve(__dirname, '../../public', p)
test('every gallery image and the hero exist in public/', () => {
  for (const s of [...GALLERY.map(g => g.file), HERO_IMAGE]) expect(existsSync(pub(s))).toBe(true)
})
test('gallery has 4–6 shots, each with alt text', () => {
  expect(GALLERY.length).toBeGreaterThanOrEqual(4); expect(GALLERY.length).toBeLessThanOrEqual(6)
  GALLERY.forEach(g => expect(g.alt.length).toBeGreaterThan(10))
})
test('asset() prefixes the base path once', () => {
  expect(asset('screenshots/a.webp')).toBe('/XC-Native-Site/screenshots/a.webp')
  expect(asset('/screenshots/a.webp')).toBe('/XC-Native-Site/screenshots/a.webp')
})
test('ko-fi url', () => expect(KOFI_URL).toBe('https://ko-fi.com/chinofyoungdev'))
test('iPhone video is scoped to the first area', () => {
  const iphone = VIDEOS.filter(v => v.device === 'iPhone 15 Pro Max')
  expect(iphone.length).toBeGreaterThan(0)
  for (const v of iphone) expect(v.caption).toMatch(/first area/i)
})
test('guide commands never reference downloading keys or game files', () => {
  const text = JSON.stringify([MAC_GUIDE, IOS_GUIDE]).toLowerCase()
  for (const bad of ['download prod.keys', 'nsw2u', 'romsfun', '.ipa download']) expect(text).not.toContain(bad)
})
test('mac guide includes the builder window and brew line', () => {
  const cmds = commandsOf(MAC_STEPS)
  expect(cmds).toContain('python3 build_app.py --gui')
  expect(cmds).toContain('brew install opus libvpx python@3.14')
})
test('stages 0–5', () => expect(STAGES.map(s => s.n)).toEqual([0, 1, 2, 3, 4, 5]))
test('credits link https', () => CREDITS.forEach(c => expect(c.url).toMatch(/^https:\/\//)))

test('VIDEOS contains the two iPhone YouTube ids', () => {
  const ids = VIDEOS.map(v => v.id)
  expect(ids).toContain('03pSBNEmmGQ')
  expect(ids).toContain('Pz0GTYMqbWY')
})

test('site uses the XCNative folder and app ID, not the old MacNativeGames ones', async () => {
  const sharing = await import('./sharing')
  expect(sharing.MAC_CONTRIBUTION_PATH).toBe('~/Library/Application Support/XCNative/XCX/shader-list-contribution.txt')
  const all = JSON.stringify([sharing, MAC_GUIDE, IOS_GUIDE])
  expect(all).not.toMatch(/Application Support\/MacNativeGames|Logs\/MacNativeGames|org\.macnativegames\.xcx/)
  expect(all).toContain('org.xcnative.xcx.<team>')
  expect(JSON.stringify(IOS_STEPS)).toMatch(/new one appears as a separate app/)
  expect(JSON.stringify(MAC_STEPS)).toMatch(/Delete apps built before this update/)
})

test('every guide step has a unique anchor id', () => {
  for (const steps of [MAC_STEPS, IOS_STEPS]) {
    const ids = steps.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    ids.forEach((id) => expect(id).toMatch(/^[a-z0-9-]+$/))
  }
})

test('every file path in a guide command uses the <path to> placeholder', () => {
  for (const code of commandsOf([...MAC_STEPS, ...IOS_STEPS])) {
    for (const m of code.matchAll(/"([^"]*\.(?:xci|nsp|keys|ipa|bin))"/g)) expect(m[1]).toMatch(/^<path to>\//)
  }
})

test('iPhone guide is scoped to the iPhone 15 Pro Max and the first area', () => {
  expect(IOS_GUIDE.experimental).toMatch(/iPhone 15 Pro Max, in the first area/)
  expect(IOS_GUIDE.experimental).toMatch(/Nothing past it has been tested on iPhone/)
})
