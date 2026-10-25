export const STAGES: { n: number; goal: string; state: 'done' | 'in progress' }[] = [
  { n: 0, goal: 'Feasibility', state: 'done' },
  { n: 1, goal: 'Code and data out of your dump, code rewritten for Apple silicon', state: 'done' },
  { n: 2, goal: 'The runtime boots the game to its nnMain', state: 'done' },
  { n: 3, goal: 'First frame and the title screen', state: 'done' },
  { n: 4, goal: 'Picture, audio, input, saves', state: 'in progress' },
  { n: 5, goal: 'Performance, shaders, the app', state: 'in progress' },
]

export const WORKS: string[] = [
  'Title screen, character creation and gameplay in Primordia',
  'Characters drawn and lit, in the field and in battle (the first battle was played)',
  'Field and battle HUD and menu text',
  'Saves write, and Continue loads them',
  'A controller and the Mac keyboard',
  'Runs at the game\'s own 30 fps on an M1 MacBook Air',
  'Audio plays (the game\'s Wwise output through Core Audio)',
  'The opening cutscene\'s White Whale renders correctly',
  'Every shader in the game is prepared at build time, for Mac and iPhone',
  'Experimental 60 fps option (about 45–57 fps on an M1, 50–58 fps on an iPhone 15 Pro Max)',
]

export const KNOWN_ISSUES: { title: string; body: string }[] = [
  {
    title: 'Large areas not checked yet',
    body: 'Skells, cutscenes, day-time lighting, water, menus beyond character creation, and a New Game through character creation with the current build.',
  },
  {
    title: 'Rendering glitches in New Los Angeles and cutscenes',
    body: 'Flickering black shapes come off some objects, and characters\' eyes can disappear during cutscenes (they are fine in character creation). For single frames a large flat box or green streaks can also appear (seen at Bianno Lake at night with 60 fps on), and some menus flicker. Possible fixes shipped on 2026-10-25 are not play-tested yet. Being investigated.',
  },
  {
    title: 'Frame interpolation (key 2)',
    body: 'On an M1 it costs more than it gains: the game drops to about 23-27 fps. Moving characters, enemies and rain streaks ghost in the generated frames, and labels attached to enemies run half a frame ahead. It is off at start.',
  },
  {
    title: '60 fps is experimental',
    body: 'Off by default; 30 fps is the game\'s own and the Mac then runs unpatched code. Checked on 2.0.0 in Primordia at night on an M1 MacBook Air: about 45-57 fps in the field (GPU-limited), with the same walking speed as at 30 fps. Two of the game\'s subsystems step a fixed 1/60 s per frame, so they run slower while below 60 fps. The speed of the time of day could not be checked. Cutscenes, Skells and cities are untested. A fanless Mac or a phone gets hotter. The timed B-button prompt in battle (Soul Challenge) ran twice as fast at 60 fps; a fix shipped on 2026-10-25 but has not been play-tested yet (iPhone needs a rebuilt IPA).',
  },
  {
    title: 'MetalFX upscaling not checked',
    body: 'MetalFX spatial upscaling has not been checked with this game and is off in the presets.',
  },
  {
    title: 'No online features',
    body: 'The network is offline. The name filter accepts any name.',
  },
  {
    title: 'Missing graphics functions',
    body: 'About a hundred NVN functions the game imports are not implemented. One that is called stops the game with its name in the log; none was reached up to the first battle.',
  },
  {
    title: 'Shaders nobody has shared yet',
    body: 'Builds prepare every shader in your game plus the shared list. Anything nobody has shared yet is made while you play on the Mac (a short stutter) and skipped on iPhone until someone shares it.',
  },
  {
    title: 'NSP path lightly checked',
    body: 'A base NSP with an update NSP has been checked with an update NSP only; the port was played from the XCI.',
  },
  {
    title: 'iPhone: experimental',
    body: 'Runs at 30 fps on an iPhone 15 Pro Max in the first area; nothing past it is tested on iPhone. Needs iOS 27: on iOS 26 the app closes at start.',
  },
]
