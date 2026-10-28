import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { GALLERY, HERO_IMAGE, VIDEOS, KOFI_URL, CREDITS } from './site'
import { MAC_STEPS, MAC_GUIDE, CONTROLS } from './mac'
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

test('Mac guide warns about interpolation ghosting and early enemy labels', () => {
  const key2 = CONTROLS.find((c) => c.key === '2')!
  expect(key2.switch).toMatch(/ghost/)
  expect(key2.switch).toMatch(/half a frame ahead/)
})

test('iPhone guide warns about the slow first launch', () => {
  const text = JSON.stringify(IOS_STEPS.find((s) => s.id === 'trust-launch'))
  expect(text).toMatch(/black screen/i)
  expect(text).toMatch(/title screen/i)
  expect(text).toMatch(/only happens on the first launch/i)
  expect(text).toMatch(/close by itself/i)
})

test('iPhone guide requires iOS 27 and explains the iOS 26 close', () => {
  const all = JSON.stringify(IOS_GUIDE)
  expect(all).toMatch(/iOS 27/)
  expect(all).not.toMatch(/on iOS 26, or/)
  expect(all).toMatch(/FAIL: reserve guest stack, heap and alias regions/)
})

test('Mac video is set', () => {
  expect(VIDEOS.find((v) => v.device === 'M1 MacBook Air')!.id).toBe('F66DfFCeHR0')
})

test('iPhone guide explains choosing 30 or 60 fps on the phone', () => {
  const all = JSON.stringify(IOS_GUIDE)
  expect(all).toMatch(/every IPA has both/)
  const step = JSON.stringify(IOS_STEPS.find((x) => x.id === 'frame-rate'))
  expect(step).toMatch(/\*\*Settings\*\* app/)
  expect(step).toMatch(/tap \*\*Apps\*\*/)
  expect(step).toMatch(/\*\*Xenoblade Chronicles X\*\*/)
  expect(all).toMatch(/Where is the 60 fps option in the builder\?/)
})

test('60 fps step shows the Settings screenshot', () => {
  const step = IOS_STEPS.find((x) => x.id === 'frame-rate')!
  expect(step.image?.file).toBe('screenshots/ios-settings-frame-rate.webp')
  expect(existsSync(pub(step.image!.file))).toBe(true)
})

test('second Mac video is set', () => {
  expect(VIDEOS.map((v) => v.id)).toContain('WeeY_6jE64Q')
})

test('saves page copy matches the apps and has no em dashes', async () => {
  const { SAVES, MAC_BACKUP_PATH, IOS_BACKUP_NAME, SAVES_ZIP_NAME } = await import('./saves')
  const all = JSON.stringify(SAVES)
  expect(SAVES_ZIP_NAME).toBe('XCX-saves-<yyyy-MM-dd-HHmm>.zip')
  expect(MAC_BACKUP_PATH).toBe('~/Library/Application Support/XCNative/XCX/profile-<version>-backup-<date>')
  expect(IOS_BACKUP_NAME).toBe('save-<version>-backup-<date>')
  // the Mac buttons end in an ellipsis character, the iPhone ones do not
  expect(all).toContain('**Export Saves…**')
  expect(all).toContain('**Import Saves…**')
  expect(all).toContain('**Export Saves**')
  expect(all).toContain('**Import Saves**')
  expect(all).not.toMatch(/Saves\.\.\./)
  expect(all).not.toContain('—')
  expect(all).not.toMatch(/Application Support\/MacNativeGames/)
  const ids = SAVES.how.flows.map((f) => f.id)
  expect(new Set(ids).size).toBe(ids.length)
})

test('both guides link to the Moving saves page', () => {
  for (const steps of [MAC_STEPS, IOS_STEPS]) {
    expect(steps.find((s) => s.id === 'updating')!.link!.url).toBe('/XC-Native-Site/moving-saves/')
  }
  expect(JSON.stringify(IOS_STEPS.find((s) => s.id === 'trust-launch'))).toMatch(/Tap \*\*Play\*\*/)
})

test('known issues keep only open problems; fixes live on the Fixes page', async () => {
  const { KNOWN_ISSUES } = await import('./status')
  const { FIXES } = await import('./fixes')
  const flickerFaq = MAC_GUIDE.troubleshooting.items.find((i) => i.q.startsWith('Black shapes flicker'))!
  const texts = [...KNOWN_ISSUES.map((k) => k.body), ...flickerFaq.a]
  for (const t of texts) {
    expect(t).not.toMatch(/fix from|fixes from|fixed on|a fix shipped|corrects it|removed it|much rarer/i)
    expect(t).not.toMatch(/2026-10-2\d/)
  }
  // the still-open problems stay
  const all = JSON.stringify(KNOWN_ISSUES)
  expect(all).toContain('Thin black lines or small white or black flashes')
  expect(all).toContain('eyes can disappear during cutscenes')
  expect(all).toMatch(/sound cue .* plays early at 60 fps/)
  expect(flickerFaq.a.join(' ')).toContain('on the Fixes page')
  // each date is a real YYYY-MM-DD and each commit a short sha
  for (const f of FIXES) {
    expect(f.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(f.commit).toMatch(/^[0-9a-f]{7}$/)
  }
})
