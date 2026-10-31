export const STAGES: { n: number; goal: string; state: 'done' | 'in progress' }[] = [
  { n: 0, goal: 'Feasibility', state: 'done' },
  { n: 1, goal: 'Code and data out of your dump, code rewritten for Apple silicon', state: 'done' },
  { n: 2, goal: 'The runtime boots the game to its nnMain', state: 'done' },
  { n: 3, goal: 'First frame and the title screen', state: 'done' },
  { n: 4, goal: 'Picture, audio, input, saves', state: 'done' },
  { n: 5, goal: 'Performance, shaders, the app', state: 'in progress' },
]

export const WORKS: string[] = [
  'Title screen, character creation and gameplay in Primordia',
  'Characters drawn and lit, in the field and in battle (played up to Chapter 4 on Mac)',
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
    body: 'The Mac playthrough is at Chapter 4 (2.0.0); nothing past it has been checked. Picture, audio and cutscenes were fine up to there. Not checked yet: Skells, day-time lighting, water, menus beyond character creation, and a New Game through character creation with the current build.',
  },
  {
    title: 'Frame interpolation is hidden',
    body: 'Frame interpolation is hidden for now (not on any key) until it is fixed. On an M1 it cost more than it gained, and it made moving characters, enemies and rain streaks ghost.',
  },
  {
    title: '60 fps is experimental',
    body: 'Off by default; 30 fps is the game\'s own and the Mac then runs unpatched code. Checked on 2.0.0 in Primordia at night on an M1 MacBook Air: about 45-57 fps in the field (GPU-limited), with the same walking speed as at 30 fps. Two of the game\'s subsystems step a fixed 1/60 s per frame, so they run slower while below 60 fps. The speed of the time of day could not be checked. The playthrough to Chapter 4 ran at 60 fps, including cutscenes and New Los Angeles; Skells are untested. A fanless Mac or a phone gets hotter. A short sound cue of the timed B-button prompt in battle (Soul Challenge) plays early at 60 fps.',
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
    body: 'About a hundred NVN functions the game imports are not implemented. One that is called stops the game with its name in the log; none has stopped the game so far, up to Chapter 4 on Mac.',
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
