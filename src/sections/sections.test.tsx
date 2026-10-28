import { render, screen, within } from '@testing-library/react'
import App from '@/App'

beforeEach(() => {
  render(<App />)
})

test('early testing warning is in the hero', () => {
  const hero = document.getElementById('top')!
  expect(within(hero).getByText(/early testing/i)).toBeInTheDocument()
})
test('every ko-fi link is the right url and opens safely', () => {
  const links = screen.getAllByRole('link', { name: /ko-fi/i })
  expect(links.length).toBeGreaterThanOrEqual(2)
  links.forEach((l) => {
    expect(l).toHaveAttribute('href', 'https://ko-fi.com/chinofyoungdev')
    expect(l).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })
})
test('nav anchors match section ids', () => {
  for (const id of ['media', 'guide', 'status', 'support']) {
    expect(document.getElementById(id)).not.toBeNull()
    expect(document.getElementById(id)!.className).toContain('scroll-mt-20')
  }
  for (const id of ['media', 'guide', 'status']) {
    expect(document.querySelector(`nav a[href="#${id}"]`)).not.toBeNull()
  }
})
test('bring-your-own states ownership and no sharing', () => {
  expect(screen.getByText(/copy you bought/i)).toBeInTheDocument()
  expect(screen.getByText(/never share the built app/i)).toBeInTheDocument()
})
test('guide highlights both install guides and links to each page', () => {
  const guide = document.getElementById('guide')!
  expect(guide.className).toContain('scroll-mt-20')
  expect(within(guide).getByRole('heading', { name: 'Install on Mac' })).toBeInTheDocument()
  expect(within(guide).getByRole('heading', { name: 'Install on iPhone' })).toBeInTheDocument()
  expect(within(guide).getByRole('link', { name: /open the mac guide/i })).toHaveAttribute('href', '/XC-Native-Site/mac/')
  expect(within(guide).getByRole('link', { name: /open the iphone guide/i })).toHaveAttribute('href', '/XC-Native-Site/iphone/')
  expect(within(guide).getAllByText(/experimental/i).length).toBeGreaterThan(0)
  expect(guide.querySelector('[role="tab"]')).toBeNull()
})
test('hero Start the guide button points at #guide', () => {
  const hero = document.getElementById('top')!
  expect(within(hero).getByRole('link', { name: /start the guide/i })).toHaveAttribute('href', '#guide')
})
test('footer has the no-affiliation disclaimer', () =>
  expect(screen.getByText(/not affiliated with.*nintendo/i)).toBeInTheDocument())

const UP = 'https://github.com/ly05010419/MacNativeGames'
const D2R = 'https://github.com/jhaizhou-ops/d2r-mobile'
test('hero credits MacNativeGames with a link', () => {
  const hero = document.getElementById('top')!
  const link = hero.querySelector(`a[href="${UP}"]`)
  expect(link).not.toBeNull()
  expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
})
test('credits section exists, is linked from nav, and links both upstreams safely', () => {
  const credits = document.getElementById('credits')!
  expect(credits).not.toBeNull()
  expect(credits.className).toContain('scroll-mt-20')
  expect(document.querySelectorAll('nav a[href="#credits"]').length).toBe(2)
  for (const href of [UP, D2R]) {
    const links = credits.querySelectorAll(`a[href="${href}"]`)
    expect(links.length).toBeGreaterThan(0)
    links.forEach((l) => expect(l).toHaveAttribute('rel', expect.stringContaining('noopener')))
  }
})

test('status mentions 60 fps', () => {
  expect(document.getElementById('status')!.textContent).toMatch(/60 fps/)
})

test('media section highlights iPhone touch and gamepad controls', () => {
  const box = screen.getByRole('complementary', { name: /play with touch or a controller/i })
  expect(within(box).getByText(/on-screen controls laid out like a switch controller appear automatically/i)).toBeInTheDocument()
  expect(within(box).getByText(/connect a gamepad and the on-screen controls hide/i)).toBeInTheDocument()
})

test('share-shaders section links to the page and the issue form', () => {
  const s = document.getElementById('share-shaders')!
  expect(s).not.toBeNull()
  expect(s.className).toContain('scroll-mt-20')
  expect(s.querySelector('a[href="/XC-Native-Site/sharing-shaders/"]')).not.toBeNull()
  const form = s.querySelector('a[href="https://github.com/chinofyoung/XC-Native/issues/new?template=shader-list.yml"]')
  expect(form).not.toBeNull()
  expect(form).toHaveAttribute('rel', expect.stringContaining('noopener'))
  expect(document.querySelectorAll('nav a[href="/XC-Native-Site/sharing-shaders/"]').length).toBe(2)
})

test('nav links to the Moving saves page', () => {
  const nav = screen.getByRole('navigation', { name: 'Main' })
  const links = nav.querySelectorAll('a[href="/XC-Native-Site/moving-saves/"]')
  expect(links.length).toBe(2)
  const labels = Array.from(links).map((l) => l.textContent)
  expect(labels[0]).toContain('Move saves')
  expect(labels[1]).toBe('Saves')
})

test('playthrough section explains testing by playing, with an issues link', () => {
  const s = document.getElementById('playthrough')!
  expect(within(s).getByRole('heading', { level: 2 })).toHaveTextContent(/playing the game/i)
  const link = within(s).getByRole('link', { name: /open an issue/i })
  expect(link).toHaveAttribute('href', 'https://github.com/chinofyoung/XC-Native/issues')
  expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
})

test('status lists the New Los Angeles glitch, drops the shader seed issue and has the shader works line', async () => {
  const { KNOWN_ISSUES, WORKS } = await import('@/content/status')
  expect(KNOWN_ISSUES.map(i => i.title)).toContain('Rendering glitches in New Los Angeles and cutscenes')
  expect(KNOWN_ISSUES.map(i => i.title)).not.toContain('No shader seed yet')
  expect(WORKS).toContain('Every shader in the game is prepared at build time, for Mac and iPhone')
})

test('an early-version notice sits right after the hero', () => {
  const notice = screen.getByRole('complementary', { name: /early version, not thoroughly tested/i })
  expect(document.getElementById('top')!.nextElementSibling).toBe(notice)
  expect(within(notice).getByRole('link', { name: /what works/i })).toHaveAttribute('href', '#status')
  expect(within(notice).getByRole('link', { name: /report a problem/i })).toHaveAttribute('rel', expect.stringContaining('noopener'))
})

test('the hero key art comes from HERO_ART_URL', async () => {
  const { HERO_ART_URL } = await import('@/content/site')
  const art = within(document.getElementById('top')!).getByTestId('hero-art')
  expect(art.getAttribute('style')).toContain(HERO_ART_URL)
  expect(art).toHaveAttribute('aria-hidden', 'true')
})
