import { render, screen } from '@testing-library/react'
import App from './App'
test('renders the page title', () => {
  render(<App />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Xenoblade Chronicles X/i)
})
