import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Gallery } from './Gallery'

test('opens a shot in a dialog', async () => {
  render(<Gallery shots={[{ file: 'screenshots/a.webp', alt: 'Battle in Primordia' }]} />)
  await userEvent.click(screen.getByRole('button', { name: /battle in primordia/i }))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(within(screen.getByRole('dialog')).getByRole('img')).toHaveAttribute('src', '/XC-Native-Site/screenshots/a.webp')
})
