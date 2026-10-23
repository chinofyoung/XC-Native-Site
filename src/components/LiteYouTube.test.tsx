import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LiteYouTube } from './LiteYouTube'

test('empty id shows coming soon and no button/iframe', () => {
  const { container } = render(<LiteYouTube video={{ id: '', device: 'M1 MacBook Air', caption: 'x', fps: '30 fps' }} />)
  expect(screen.getByText(/video coming soon/i)).toBeInTheDocument()
  expect(screen.queryByRole('button')).toBeNull()
  expect(container.querySelector('iframe')).toBeNull()
})
test('click loads nocookie iframe', async () => {
  const { container } = render(<LiteYouTube video={{ id: 'abc123', device: 'M1 MacBook Air', caption: 'x', fps: '30 fps' }} />)
  expect(container.querySelector('iframe')).toBeNull()
  await userEvent.click(screen.getByRole('button', { name: /play.*M1 MacBook Air/i }))
  expect(container.querySelector('iframe')!.src).toBe('https://www.youtube-nocookie.com/embed/abc123?autoplay=1')
})
test('video with an id shows the YouTube thumbnail', () => {
  render(<LiteYouTube video={{ id: 'abc123', device: 'M1 MacBook Air', caption: 'x', fps: '30 fps' }} />)
  const img = document.querySelector('img')!
  expect(img.src).toBe('https://i.ytimg.com/vi/abc123/hqdefault.jpg')
})
