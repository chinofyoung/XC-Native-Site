import { BringYourOwn } from '@/sections/BringYourOwn'
import { Footer } from '@/sections/Footer'
import { Guide } from '@/sections/Guide'
import { Hero } from '@/sections/Hero'
import { Media } from '@/sections/Media'
import { Nav } from '@/sections/Nav'
import { Status } from '@/sections/Status'
import { Support } from '@/sections/Support'

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <Media />
        <BringYourOwn />
        <Guide />
        <Status />
        <Support />
      </main>
      <Footer />
    </>
  )
}

export default App
