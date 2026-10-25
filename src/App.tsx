import { BringYourOwn } from '@/sections/BringYourOwn'
import { EarlyNotice } from '@/sections/EarlyNotice'
import { Footer } from '@/sections/Footer'
import { Credits } from '@/sections/Credits'
import { Guide } from '@/sections/Guide'
import { Hero } from '@/sections/Hero'
import { Media } from '@/sections/Media'
import { Playthrough } from '@/sections/Playthrough'
import { ShareShaders } from '@/sections/ShareShaders'
import { Status } from '@/sections/Status'
import { Support } from '@/sections/Support'

function App() {
  return (
    <>
      {/* the Nav lives inside the Hero, over the key art */}
      <Hero />
      <EarlyNotice />
      <main>
        <Media />
        <ShareShaders />
        <BringYourOwn />
        <Guide />
        <Playthrough />
        <Status />
        <Credits />
        <Support />
      </main>
      <Footer />
    </>
  )
}

export default App
