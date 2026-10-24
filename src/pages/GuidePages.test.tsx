import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InstallMacPage } from '@/pages/InstallMac'
import { InstallIphonePage } from '@/pages/InstallIphone'
import { MAC_STEPS } from '@/content/mac'
import { IOS_STEPS } from '@/content/ios'
import type { GuideStep } from '@/content/guide'

const OLD_PATHS = /Application Support\/MacNativeGames|Logs\/MacNativeGames|Caches\/MacNativeGames|org\.macnativegames\.xcx/

function stepTitles() {
  // step headings carry the anchor ids (the Advanced accordions have their own headers)
  return Array.from(document.querySelectorAll('#steps h3[id]')).map((h) => h.textContent!.replace(/^Step \d+: /, ''))
}

function sharedChecks(steps: GuideStep[]) {
  // h1, then the steps in content order, each with its anchor id
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(stepTitles()).toEqual(steps.map((s) => s.title))
  for (const s of steps) {
    const h = document.getElementById(s.id)!
    expect(h.tagName).toBe('H3')
    expect(h.className).toContain('scroll-mt-20')
    expect(h.className).toContain('max-sm:scroll-mt-28')
  }
  // before you start, troubleshooting, related
  expect(screen.getByRole('heading', { level: 2, name: 'Before you start' })).toBeInTheDocument()
  const trouble = document.getElementById('troubleshooting')!
  expect(within(trouble).getByRole('heading', { level: 2, name: 'Troubleshooting' })).toBeInTheDocument()
  expect(within(trouble).getAllByRole('button').length).toBeGreaterThan(3)
  expect(screen.getByText(/early testing · expect bugs/i)).toBeInTheDocument()
  expect(screen.getByText(/never share the built app or the work folder/i)).toBeInTheDocument()
  expect(screen.getByText(/we do not help you get keys or game files/i)).toBeInTheDocument()
  // related links
  const related = document.getElementById('related')!
  expect(related.querySelector('a[href="/XC-Native-Site/sharing-shaders/"]')).not.toBeNull()
  const readme = related.querySelector('a[href="https://github.com/chinofyoung/XC-Native#readme"]')
  expect(readme).toHaveAttribute('rel', expect.stringContaining('noopener'))
  // nav goes back to the homepage sections
  const nav = screen.getByRole('navigation', { name: 'Main' })
  expect(nav.querySelector('a[href="/XC-Native-Site/#guide"]')).not.toBeNull()
  // no old MacNativeGames Library paths
  expect(document.body.textContent).not.toMatch(OLD_PATHS)
  expect(document.body.textContent).toMatch(/Built on|MacNativeGames/) // credits stay
}

describe('Mac page', () => {
  beforeEach(() => {
    render(<InstallMacPage />)
  })

  test('has the h1, steps in order, troubleshooting and related links', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Install on Mac')
    sharedChecks(MAC_STEPS)
    expect(document.getElementById('related')!.querySelector('a[href="/XC-Native-Site/iphone/"]')).not.toBeNull()
  })

  test('starts with the Terminal primer before the first command', () => {
    expect(MAC_STEPS[0].id).toBe('terminal')
    expect(MAC_STEPS[0].commands).toBeUndefined()
    const t = document.getElementById('terminal')!.closest('li')!
    expect(t.textContent).toMatch(/Applications › Utilities › Terminal/)
    expect(t.textContent).toMatch(/Command-V/)
    expect(t.textContent).toMatch(/Nothing appears while you type it/)
    expect(t.textContent).toMatch(/drag the file from Finder into the Terminal window/)
    expect(t.querySelector('a[href="https://github.com/chinofyoung/XC-Native/issues"]')).not.toBeNull()
  })

  test('has the builder window as the main path and the brew line', () => {
    const codes = Array.from(document.querySelectorAll('#steps pre')).map((p) => p.textContent)
    expect(codes).toContain('python3 build_app.py --gui')
    expect(codes).toContain('brew install opus libvpx python@3.14')
    expect(codes).toContain('xcode-select --install')
  })

  test('the one-line build command is collapsed under Advanced', async () => {
    const one = 'python3 build_app.py "<path to>/<game>.xci" -k "<path to>/prod.keys"'
    const build = document.getElementById('build')!.closest('li')!
    expect(within(build).queryByText(one)).toBeNull()
    await userEvent.click(within(build).getByRole('button', { name: /advanced: build with one command/i }))
    expect(within(build).getByText(one)).toBeInTheDocument()
  })

  test('mentions the experimental 60 fps option', () => {
    expect(document.getElementById('steps')!.textContent).toMatch(/experimental 60 fps option/i)
  })

  test('has the controls table', () => {
    const table = screen.getByRole('table', { name: 'Keyboard controls' })
    expect(within(table).getByRole('rowheader', { name: 'W A S D' })).toBeInTheDocument()
    expect(within(table).getByText('Left stick')).toBeInTheDocument()
  })

  test('keeps the update note and the clean-build time', () => {
    expect(screen.getByText(/delete apps built before this update/i)).toBeInTheDocument()
    expect(screen.getByText(/a clean build takes about 8 minutes/i)).toBeInTheDocument()
  })
})

describe('iPhone page', () => {
  beforeEach(() => {
    render(<InstallIphonePage />)
  })

  test('has the h1, steps in order, troubleshooting and related links', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Install on iPhone and iPad')
    sharedChecks(IOS_STEPS)
    expect(document.getElementById('related')!.querySelector('a[href="/XC-Native-Site/mac/"]')).not.toBeNull()
  })

  test('is marked experimental and limited to the first area', () => {
    const header = document.getElementById('top')!
    expect(within(header).getAllByText(/experimental/i).length).toBeGreaterThan(0)
    expect(
      within(header).getByText(
        'Tested only on an iPhone 15 Pro Max, in the first area (a smooth 30 fps there). Nothing past it has been tested on iPhone.',
      ),
    ).toBeInTheDocument()
    expect(within(header).getByText(/about 28 minutes on an M1/i)).toBeInTheDocument()
  })

  test('shows About the first iPhone build', () => {
    expect(screen.getByText('About the first iPhone build')).toBeInTheDocument()
  })

  test('has a Developer Mode step before installing', () => {
    const titles = stepTitles()
    const dev = titles.findIndex((t) => /turn on developer mode/i.test(t))
    const install = titles.findIndex((t) => /install on your device/i.test(t))
    expect(dev).toBeGreaterThanOrEqual(0)
    expect(dev).toBeLessThan(install)
    const step = document.getElementById('developer-mode')!.closest('li')!
    expect(within(step).getByText(/privacy & security › developer mode/i)).toBeInTheDocument()
    expect(step.textContent).toMatch(/Turn On/)
    expect(step.textContent).toMatch(/unlock it once/)
  })

  test('links to the Mac page Terminal primer instead of repeating it', () => {
    expect(document.querySelector('a[href="/XC-Native-Site/mac/#terminal"]')).not.toBeNull()
    expect(document.getElementById('terminal')).toBeNull()
  })

  test('keeps the touch, update and shader counter facts', () => {
    const text = document.getElementById('steps')!.textContent!
    expect(text).toMatch(/on-screen controls laid out like a Switch controller appear automatically/)
    expect(text).toMatch(/new one appears as a separate app/)
    expect(text).toMatch(/Shaders 12,400 \/ 13,962\s+missing 3/)
  })
})
