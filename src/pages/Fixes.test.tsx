import { render, screen, within } from '@testing-library/react'
import { FixesPage } from '@/pages/Fixes'
import { FIXES, FIXES_PAGE, fixesByDate } from '@/content/fixes'

beforeEach(() => {
  render(<FixesPage />)
})

test('has one h1 and the lead', () => {
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Fixes')
  expect(
    screen.getByText('Problems that have been fixed, newest first. Build the app again to get a fix.'),
  ).toBeInTheDocument()
})

test('dates are grouped, newest first', () => {
  const dates = within(screen.getByRole('main')).getAllByRole('heading', { level: 2 }).map((h) => h.textContent!)
  expect(dates).toEqual([...new Set(FIXES.map((f) => f.date))].sort().reverse())
  for (const d of dates) expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  expect(fixesByDate().map((g) => g.date)).toEqual(dates)
})

test('every entry is shown under its date with a commit link', () => {
  const entries = document.querySelectorAll('main article')
  expect(entries).toHaveLength(FIXES.length)
  for (const f of FIXES) {
    const group = document.getElementById(`d-${f.date}`)!
    const title = within(group).getByRole('heading', { level: 3, name: f.title })
    const article = title.closest('article')!
    const link = article.querySelector(`a[href="https://github.com/chinofyoung/XC-Native/commit/${f.commit}"]`)
    expect(link).not.toBeNull()
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(article.textContent).toContain('Build')
    expect(article.textContent).toMatch(/Tested/)
  }
})

test('lists the shipped fixes', () => {
  const commits = FIXES.map((f) => `${f.date} ${f.commit}`)
  for (const c of [
    '2026-10-28 d5ff82c',
    '2026-10-28 59ec458',
    '2026-10-27 c953cb5',
    '2026-10-26 9cb7519',
    '2026-10-25 b336691',
    '2026-10-25 be7eafa',
  ]) {
    expect(commits).toContain(c)
  }
  expect(FIXES.filter((f) => f.commit === 'b336691')).toHaveLength(2)
})

test('iPhone fixes say to rebuild and reinstall the IPA', () => {
  for (const f of FIXES.filter((x) => x.platform !== 'Mac')) {
    const article = screen.getByRole('heading', { level: 3, name: f.title }).closest('article')!
    expect(article.textContent).toMatch(/build the IPA again and install it again/i)
  }
})

test('links to the open known issues', () => {
  expect(document.querySelector('header a[href="/XC-Native-Site/#status"]')).not.toBeNull()
})

test('nav links to this page', () => {
  const nav = screen.getByRole('navigation', { name: 'Main' })
  const links = nav.querySelectorAll('a[href="/XC-Native-Site/fixes/"]')
  expect(links).toHaveLength(2)
  expect(links[1].textContent).toBe('Fixes')
})

test('no em dashes in the copy', () => {
  expect(JSON.stringify({ FIXES_PAGE, FIXES })).not.toContain('—')
  expect(document.querySelector('main')!.textContent).not.toContain('—')
})
