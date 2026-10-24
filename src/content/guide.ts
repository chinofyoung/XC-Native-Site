import { README_URL } from './site'

export type Step = {
  title: string
  body: string
  command?: string | string[]
  note?: string
  link?: { label: string; url: string }
}

export const MAC_STEPS: Step[] = [
  {
    title: 'Check the requirements',
    body: 'You need a Mac with Apple silicon on macOS 26 or later, Xcode (or at least its command line tools plus Xcode\'s llvm-objdump), and about 16 GB free for the work folder. You also need your own copy of the game and your own prod.keys.',
  },
  {
    title: 'Install the tools',
    body: 'Install Homebrew if you do not have it, then add Opus, libvpx and Python 3.14.',
    link: { label: 'Homebrew', url: 'https://brew.sh' },
    command: 'brew install opus libvpx python@3.14',
  },
  {
    title: 'Get the code',
    body: 'Clone the repository and work from its root.',
    command: 'git clone https://github.com/chinofyoung/XC-Native.git && cd XC-Native',
  },
  {
    title: 'Open the builder window',
    body: 'This opens a small native window. Choose your game file (the XCI or a base NSP), your prod.keys and, if you want 2.0.0, the update NSP, then press Build App. Each step shows its time and log, and Cancel stops cleanly.',
    link: { label: 'NSP builds need a few extra files (see the README).', url: README_URL },
    command: 'python3 build_app.py --gui',
    note: 'The first run compiles the window with the Xcode command line tools, which takes a few seconds.',
  },
  {
    title: 'Or build with one command',
    body: 'The same build from the terminal. The first command builds 1.0.1. The second adds the 2.0.0 update NSP and builds 2.0.0. Replace each <…> with the path to your own file.',
    command: [
      'python3 build_app.py "<path to>/<game>.xci" -k "<path to>/prod.keys"',
      'python3 build_app.py "<path to>/<game>.xci" -k "<path to>/prod.keys" --update "<path to>/<2.0.0 update>.nsp"',
    ],
    note: 'The app is made on your Mac from your own files. Never share it or the work folder.',
  },
  {
    title: 'Play',
    body: 'Double-click Xenoblade Chronicles X.app. A settings window comes first; press Play. The default preset runs the game\'s own 30 fps in a window. The settings window also has an experimental 60 fps option under Frame rate. It is off by default and reaches about 45-57 fps on an M1.',
    link: { label: 'The README has the details on 60 fps.', url: README_URL },
    note: 'The first start checks the whole RomFS once, so the first frame takes about 10 seconds. Builds prepare the shaders ahead of time, so only ones nobody has met yet are made while you play (a short stutter).',
  },
  {
    title: 'Controls',
    body: 'A controller macOS recognizes works as a Switch controller (a DualSense was used). The keyboard layout is in the table below.',
  },
]

export const IOS_STEPS: Step[] = [
  {
    title: 'Check the requirements',
    body: 'Everything the Mac build needs, plus Xcode 26 with the iOS SDK, and an iPhone 14 or newer (or an iPad with an A15 chip or later) on iOS 26 (the original project\'s requirements; untested with this game beyond the iPhone 15 Pro Max).',
    command: 'brew install xcodegen cmake',
    note: 'The iPhone and iPad build is experimental. It has only been run on an iPhone 15 Pro Max, in the first area.',
  },
  {
    title: 'About the first iPhone build',
    body: 'The build prepares every shader in your game plus the shared list. The first iPhone build takes longer (about 28 minutes on an M1) while it prepares the shaders for the phone; later builds reuse that work.',
  },
  {
    title: 'Build the IPA',
    body: 'In the builder window pick "iPhone and iPad (experimental)" and press Build IPA, or use the command line.',
    command: 'python3 build_app.py "<path to>/<game>.xci" -k "<path to>/prod.keys" --platform ios',
  },
  {
    title: 'Install on your device',
    body: 'In the window\'s "Install on my iPhone or iPad" section, connect your device with a cable, unlock it and tap Trust. Add your Apple ID in Xcode (a free Personal Team works), then install. The window also copies the game data across.',
    note: 'A free Apple ID signs the app for 7 days, so you re-sign it every 7 days. Your saves are kept.',
  },
  {
    title: 'Trust the developer and launch',
    body: 'On the device, open Settings, General, VPN & Device Management, trust your Apple ID, then launch Xenoblade Chronicles X.',
    note: 'The frame rate can be switched to 60 (experimental) in the iPhone Settings app, under Xenoblade Chronicles X, Frame rate. It is untested on iPhone beyond being available, and it means more heat.',
  },
  {
    title: 'Play with touch or a controller',
    body: 'With no controller connected, on-screen controls laid out like a Switch controller appear automatically. Connect a gamepad and they hide; disconnect it and they come back.',
    note: 'New in the latest build: turn on the FPS display to see how many shaders are ready and whether any are missing (the "missing" number is what you can share). It reads like this: Shaders 12,400 / 13,962   missing 3. The first number is the shaders ready so far (it climbs during startup), the second is all the shaders the app carries, and "missing" counts shaders the game needed that the app does not have.',
  },
]

export const CONTROLS: { key: string; switch: string }[] = [
  { key: 'W A S D', switch: 'Left stick' },
  { key: 'Arrow keys', switch: 'Right stick' },
  { key: 'J', switch: 'A' },
  { key: 'K, Space', switch: 'B' },
  { key: 'I', switch: 'X' },
  { key: 'U', switch: 'Y' },
  { key: 'Q / E', switch: 'L / R' },
  { key: 'Option / Shift', switch: 'ZL / ZR' },
  { key: 'F T H G', switch: 'D-pad left / up / right / down' },
  { key: 'Z / C', switch: 'Left / right stick press' },
  { key: 'Return', switch: '+' },
  { key: 'Tab, Esc', switch: '−' },
  { key: '1', switch: 'Show or hide the on-screen overlay' },
  { key: '2', switch: 'Cycle MetalFX frame interpolation (off at start; costs more than it gains on an M1)' },
]
