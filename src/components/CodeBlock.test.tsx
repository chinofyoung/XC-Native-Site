import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CodeBlock } from './CodeBlock'

function mockClipboard(value: unknown) {
  Object.defineProperty(navigator, 'clipboard', { value, configurable: true })
}

test('copies the command', async () => {
  const user = userEvent.setup()
  const writeText = vi.fn().mockResolvedValue(undefined)
  mockClipboard({ writeText })
  render(<CodeBlock code="python3 build_app.py --gui" />)
  await user.click(screen.getByRole('button', { name: /copy/i }))
  expect(writeText).toHaveBeenCalledWith('python3 build_app.py --gui')
  expect(await screen.findByText(/copied/i)).toBeInTheDocument()
})
test('clipboard failure does not throw', async () => {
  const user = userEvent.setup()
  mockClipboard({ writeText: vi.fn().mockRejectedValue(new Error('denied')) })
  render(<CodeBlock code="x" />)
  await user.click(screen.getByRole('button', { name: /copy/i }))
  expect(await screen.findByText(/copy failed/i)).toBeInTheDocument()
})
test('clipboard missing does not throw', async () => {
  const user = userEvent.setup()
  mockClipboard(undefined)
  render(<CodeBlock code="x" />)
  await user.click(screen.getByRole('button', { name: /copy/i }))
  expect(await screen.findByText(/copy failed/i)).toBeInTheDocument()
})
test('long commands wrap inside the block', () => {
  const { container } = render(<CodeBlock code="x" />)
  const cls = container.querySelector('pre')!.className
  expect(cls).toMatch(/whitespace-pre-wrap/)
  expect(cls).toMatch(/overflow-wrap:anywhere/)
})
