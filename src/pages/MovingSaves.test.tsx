import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MovingSavesPage } from '@/pages/MovingSaves'
import { MAC_EXPORT_COMMAND, MAC_IMPORT_COMMAND, SAVES } from '@/content/saves'

beforeEach(() => {
  render(<MovingSavesPage />)
})

test('has one h1', () => {
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Moving saves')
})

test('has every part, linked from On this page', () => {
  const toc = screen.getByRole('navigation', { name: 'Sections on this page' })
  for (const id of ['what', 'before', 'how', 'safe', 'undo', 'command-line', 'tested', 'questions']) {
    expect(document.getElementById(id)).not.toBeNull()
    expect(toc.querySelector(`a[href="#${id}"]`)).not.toBeNull()
  }
})

test('walks through the three directions', () => {
  const how = document.getElementById('how')!
  for (const t of ['Mac to iPhone or iPad', 'iPhone or iPad to Mac', 'Mac to Mac']) {
    expect(within(how).getByRole('heading', { level: 3, name: t })).toBeInTheDocument()
  }
  for (const id of ['mac-to-iphone', 'iphone-to-mac', 'mac-to-mac']) expect(document.getElementById(id)).not.toBeNull()
})

test('quotes the buttons and messages of the apps', () => {
  const text = document.body.textContent!
  for (const s of [
    'Export Saves…',
    'Import Saves…',
    'Export Saves',
    'Import Saves',
    'Play',
    'Import these saves?',
    'This replaces your current saves. A backup is made first.',
    'Saves imported',
    'There were no previous saves to back up.',
    'The game is running: quit it to export or import saves.',
    'XCX-saves-<yyyy-MM-dd-HHmm>.zip',
  ]) {
    expect(text).toContain(s)
  }
})

test('names both backup places and the version rule', () => {
  const text = document.body.textContent!
  expect(text).toContain('~/Library/Application Support/XCNative/XCX/profile-<version>-backup-<date>')
  expect(text).toContain('save-<version>-backup-<date>')
  expect(text).toMatch(/A 2\.0\.0 export is refused by a 1\.0\.1 app/)
  expect(text).toMatch(/A refused import changes nothing/)
  expect(text).toContain('account.uid')
})

test('says honestly what was tested', () => {
  const tested = document.getElementById('tested')!
  expect(tested.textContent).toMatch(/Play-tested Mac to iPhone/)
  expect(tested.textContent).toMatch(/M1 MacBook Air/)
  expect(tested.textContent).toMatch(/iPhone 15 Pro Max/)
  expect(tested.textContent).toMatch(/2026-10-28/)
  expect(tested.textContent).toMatch(/Not checked by hand yet/)
  expect(document.getElementById('how')!.textContent).toMatch(/Not play-tested yet/)
})

test('shows the command line options', () => {
  expect(screen.getByText(MAC_EXPORT_COMMAND)).toBeInTheDocument()
  expect(screen.getByText(MAC_IMPORT_COMMAND)).toBeInTheDocument()
  expect(MAC_EXPORT_COMMAND).toContain('--export-saves')
  expect(MAC_IMPORT_COMMAND).toContain('--import-saves')
})

test('links to the install guides', () => {
  const before = document.getElementById('before')!
  expect(before.querySelector('a[href="/XC-Native-Site/mac/"]')).not.toBeNull()
  expect(before.querySelector('a[href="/XC-Native-Site/iphone/"]')).not.toBeNull()
})

test('questions open', async () => {
  const q = document.getElementById('questions')!
  await userEvent.click(within(q).getByRole('button', { name: 'Is this cloud save?' }))
  expect(within(q).getByText(/Nothing syncs on its own/)).toBeInTheDocument()
  expect(SAVES.questions.items.length).toBeGreaterThan(3)
})

test('nav links to the landing page and to this page', () => {
  const nav = screen.getByRole('navigation', { name: 'Main' })
  expect(nav.querySelector('a[href="/XC-Native-Site/#guide"]')).not.toBeNull()
  expect(nav.querySelectorAll('a[href="/XC-Native-Site/moving-saves/"]').length).toBe(2)
})

test('no em dashes in the copy', () => {
  expect(JSON.stringify(SAVES)).not.toContain('—')
})

test('nav marks this page as current and has no section bar', () => {
  const nav = screen.getByRole('navigation', { name: 'Main' })
  const current = nav.querySelectorAll('[aria-current="page"]')
  expect(current.length).toBe(2)
  current.forEach((a) => expect(a).toHaveAttribute('href', '/XC-Native-Site/moving-saves/'))
  expect(screen.queryByRole('navigation', { name: 'Sections', hidden: true })).toBeNull()
  expect(nav.querySelector('a[href="/XC-Native-Site/"]')).not.toBeNull()
})
