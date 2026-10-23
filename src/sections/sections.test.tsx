import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
test('guide switches to iPhone tab and shows experimental', async () => {
  await userEvent.click(screen.getByRole('tab', { name: /iphone/i }))
  expect(within(screen.getByRole('tabpanel')).getAllByText(/experimental/i).length).toBeGreaterThan(0)
  expect(screen.getByText(/play the mac app first/i)).toBeInTheDocument()
})
test('footer has the no-affiliation disclaimer', () =>
  expect(screen.getByText(/not affiliated with.*nintendo/i)).toBeInTheDocument())
