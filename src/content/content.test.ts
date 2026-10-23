import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { GALLERY, HERO_IMAGE, VIDEOS, KOFI_URL, CREDITS } from './site'
import { MAC_STEPS, IOS_STEPS } from './guide'
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
  expect(VIDEOS.find(v => v.device === 'iPhone 15 Pro Max')!.caption).toMatch(/first area/i)
})
test('guide commands never reference downloading keys or game files', () => {
  const text = JSON.stringify([MAC_STEPS, IOS_STEPS]).toLowerCase()
  for (const bad of ['download prod.keys', 'nsw2u', 'romsfun', '.ipa download']) expect(text).not.toContain(bad)
})
test('mac guide includes the builder window and brew line', () => {
  const cmds = MAC_STEPS.flatMap(s => s.command ?? [])
  expect(cmds).toContain('python3 build_app.py --gui')
  expect(cmds).toContain('brew install opus libvpx python@3.14')
})
test('stages 0–5', () => expect(STAGES.map(s => s.n)).toEqual([0, 1, 2, 3, 4, 5]))
test('credits link https', () => CREDITS.forEach(c => expect(c.url).toMatch(/^https:\/\//)))
