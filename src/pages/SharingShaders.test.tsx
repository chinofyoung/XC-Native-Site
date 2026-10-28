import { render, screen } from '@testing-library/react'
import { SharingShadersPage } from '@/pages/SharingShaders'
import { FILL_SHADERS_COMMAND, SHADER_FORM_URL, SHARING } from '@/content/sharing'

beforeEach(() => {
  render(<SharingShadersPage />)
})

test('has an h1', () => {
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sharing shaders')
})
test('Share on GitHub links to the issue form safely', () => {
  const links = screen.getAllByRole('link', { name: /share on github/i })
  expect(links.length).toBeGreaterThan(0)
  links.forEach((l) => {
    expect(l).toHaveAttribute('href', SHADER_FORM_URL)
    expect(l).toHaveAttribute('target', '_blank')
    expect(l).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })
})
test('reassurance says no game files, saves or personal info', () => {
  expect(screen.getByText(/no game files, no saves and no personal information/i)).toBeInTheDocument()
})
test('shows the fill_shaders.py command', () => {
  expect(screen.getByText(FILL_SHADERS_COMMAND)).toBeInTheDocument()
  expect(FILL_SHADERS_COMMAND).toContain('fill_shaders.py')
})
test('keeps the numbers from the doc', () => {
  const text = document.body.textContent! + JSON.stringify(SHARING.questions)
  for (const n of ['12,400', '28 minutes', '86 MB to 159 MB', '50 new shaders', '500 more', '7 days', '2,000']) {
    expect(text).toContain(n)
  }
})
test('nav links point back to the landing page', () => {
  const nav = screen.getByRole('navigation', { name: 'Main' })
  expect(nav.querySelector('a[href="/XC-Native-Site/#guide"]')).not.toBeNull()
  expect(nav.querySelector('a[href="/XC-Native-Site/sharing-shaders/"]')).not.toBeNull()
})

test('nav marks this page as current and has no section bar', () => {
  const nav = screen.getByRole('navigation', { name: 'Main' })
  const current = nav.querySelectorAll('[aria-current="page"]')
  expect(current.length).toBe(2)
  current.forEach((a) => expect(a).toHaveAttribute('href', '/XC-Native-Site/sharing-shaders/'))
  expect(screen.queryByRole('navigation', { name: 'Sections', hidden: true })).toBeNull()
  expect(nav.querySelector('a[href="/XC-Native-Site/"]')).not.toBeNull()
})
