import type { GuidePage, GuideStep } from './guide'
import { BYO_ITEMS, EXPERIMENTAL_NOTE } from './guide'
import { README_URL } from './site'

const base = import.meta.env.BASE_URL
const mac = `${base}mac/`

export const IOS_BUILD_COMMAND =
  'python3 build_app.py "<path to>/<game>.xci" -k "<path to>/prod.keys" --platform ios'
export const INSTALL_DEVICE_COMMAND =
  'python3 games/xcx/ios/tools/install_device.py "<path to>/Xenoblade Chronicles X.ipa" --device "<device name>" --game-data "<path to>/XCX_build/extracted/<v101 | v200>/romfs/romfs.bin"'

export const IOS_STEPS: GuideStep[] = [
  {
    id: 'mac-setup',
    title: 'Set up your Mac first',
    body: [
      'Your Mac builds the iPhone app, so this guide starts where the Mac guide\'s setup ends. Do the Mac guide up to "Check your Mac": Terminal, the command line tools, Homebrew and the libraries, and the code. The iPhone build reuses the Mac build\'s steps and the same work folder.',
      'New to Terminal? The Mac guide explains how to open it, paste a command and replace the `<path to>` placeholders.',
    ],
    link: { label: 'Never used Terminal? Start here (Mac guide)', url: `${mac}#terminal` },
  },
  {
    id: 'ios-tools',
    title: 'Install the iPhone build tools',
    body: [
      'On top of the Mac build, the iPhone build needs Xcode 26 or later with the iOS SDK, and two more tools from Homebrew: xcodegen and CMake.',
    ],
    substeps: [
      'Install Xcode 26 or later.',
      'In Xcode, open **Xcode › Settings › Components** and add the iOS platform.',
      'Install xcodegen and CMake with the first command below.',
      'Optional: install Xcode\'s Metal toolchain with the second command. With it the build compiles the carried shaders for the device. Without it they stay Metal source, and the device compiles each one the first time it is used.',
      'Check this Mac for the iPhone build with the third command.',
    ],
    commands: [
      { label: 'Install xcodegen and CMake', code: 'brew install xcodegen cmake' },
      { label: 'Optional: install the Metal toolchain', code: 'xcodebuild -downloadComponent MetalToolchain' },
      { label: 'Check the iPhone build requirements', code: 'python3 build_app.py --check-requirements --platform ios' },
    ],
    expect: 'the check print a fix for anything that is missing. Run the fix, then run the check again.',
  },
  {
    id: 'apple-id',
    title: 'Add your Apple ID to Xcode',
    body: [
      'Your app is signed with your own Apple ID, so the iPhone accepts it. A free Personal Team works.',
    ],
    substeps: [
      'In Xcode, open **Xcode › Settings › Accounts** and add your Apple ID.',
      'If you have no Apple Development certificate yet, make one: **Xcode › Settings › Accounts** › your Apple ID › **Manage Certificates** › **+** › **Apple Development**.',
    ],
    notes: [
      {
        kind: 'tip',
        text: 'A free Apple ID signs the app for 7 days, so you re-sign it every 7 days. A paid membership signs it for a year.',
      },
    ],
  },
  {
    id: 'build-ipa',
    title: 'Build the IPA',
    body: [
      'The IPA is the iPhone app file. The build translates the game\'s shaders ahead of time, because an iPhone or iPad cannot translate them while it plays.',
    ],
    substeps: [
      'From the XC-Native folder, open the builder window with the command below.',
      'Choose your game file and your `prod.keys`, as for the Mac (and the 2.0.0 update NSP for 2.0.0).',
      'Pick **iPhone and iPad (experimental)**. The output becomes an `.ipa`, and the prerequisites add Xcode with the iOS SDK, xcodegen and CMake, and the iOS platform.',
      'Press **Build IPA**.',
    ],
    commands: [{ label: 'Open the builder window', code: 'python3 build_app.py --gui' }],
    expect:
      '`Xenoblade Chronicles X.ipa` next to your game file when it finishes. It is about 159 MB, because it holds the game code, the RomFS index, the system fonts and the shaders, but not the 14.3 GB game image.',
    notes: [
      {
        kind: 'tip',
        title: 'About the first iPhone build',
        text: 'The build prepares every shader in your game plus the shared list. The first iPhone build takes longer (about 28 minutes on an M1) while it prepares the shaders for the phone; later builds reuse that work. The first build also downloads and compiles Opus and libvpx for iOS, so it needs network access.',
      },
    ],
    advanced: {
      title: 'Advanced: build the IPA with one command instead',
      body: [
        'The same build from Terminal. Replace each `<…>` with the path to your own file. For 2.0.0, add `--update "<path to>/<2.0.0 update>.nsp"`, as for the Mac.',
      ],
      commands: [{ label: 'Build the IPA', code: IOS_BUILD_COMMAND }],
      expect: '`Xenoblade Chronicles X.ipa` written next to the game file (`-o` picks another `.ipa` path).',
    },
  },
  {
    id: 'developer-mode',
    title: 'Turn on Developer Mode',
    body: [
      'iOS will not run an app you install yourself until Developer Mode is on. Do this on the iPhone or iPad before you install.',
    ],
    substeps: [
      'On the iPhone or iPad open Settings › Privacy & Security › Developer Mode.',
      'Switch it on and restart.',
      'After the restart, tap **Turn On** when asked and enter your passcode.',
    ],
    notes: [
      {
        kind: 'warning',
        title: 'No Developer Mode switch?',
        text: 'Connect the device to your Mac with a cable and unlock it once (open Xcode if it does not appear); the switch shows up after that. Without it the install stops at "profile" with "Developer Mode disabled".',
      },
    ],
  },
  {
    id: 'install',
    title: 'Install on your device',
    body: [
      'The builder window has an optional **Install on my iPhone or iPad** section below **Build IPA**. It signs the app with your Apple ID, installs it, and copies the game data across.',
    ],
    substeps: [
      'Connect your device with a cable, unlock it and tap **Trust**. The window lists the paired devices by name and model; the refresh button looks again.',
      'Check that the window shows your signing team. Without an Apple Development certificate it shows the steps to make one instead.',
      'Leave the game data copy on (it is on by default). The device needs room for the 14 GB of game data.',
      'Install, and keep the device unlocked until it is done.',
    ],
    expect:
      'each step (device, profile, sign, install, game data part N of M) and any error in the tool\'s own words, with what to do. Later installs skip the game data copy while the device holds the same image.',
    notes: [
      {
        kind: 'warning',
        text: 'If Xcode\'s Devices window shows the device as Preparing, let that finish first. "May need to be unlocked to recover from previously reported preparation errors" means exactly this.',
      },
      {
        kind: 'tip',
        text: 'A free Apple ID signs the app for 7 days, so you re-sign it every 7 days: install again to renew. Your saves are kept.',
      },
    ],
    advanced: {
      title: 'Advanced: install from Terminal instead',
      body: [
        'This is what the window runs. Use the version the IPA was built for (`v101` or `v200`) in the game data path.',
      ],
      commands: [{ label: 'Install on the device', code: INSTALL_DEVICE_COMMAND }],
      after: [
        '`--list-devices` only lists devices and teams, and `--dry-run` checks everything and stops before signing. The app is signed as `org.xcnative.xcx.<team>`.',
      ],
    },
  },
  {
    id: 'trust-launch',
    title: 'Trust the developer and launch',
    body: [
      'The first time, iOS asks you to trust the Apple ID that signed the app.',
    ],
    substeps: [
      'On the device, open Settings › General › VPN & Device Management.',
      'Trust your Apple ID.',
      'Launch Xenoblade Chronicles X.',
    ],
    notes: [
      {
        kind: 'tip',
        text: 'The first start hashes the game data once against the build\'s checksum and keeps a record.',
      },
    ],
  },
  {
    id: 'touch-controller',
    title: 'Play with touch or a controller',
    body: [
      'With no controller connected, on-screen controls laid out like a Switch controller appear automatically. Connect a gamepad and they hide; disconnect it and they come back.',
    ],
    notes: [
      {
        kind: 'tip',
        title: 'Optional: 60 fps',
        text: 'The frame rate can be switched to 60 (experimental) in the iPhone Settings app, under Xenoblade Chronicles X › Frame rate. On an iPhone 15 Pro Max it reached about 50-58 fps in the field, dropping to 36-45 fps at times when the phone got hot, so it means more heat.',
      },
    ],
  },
  {
    id: 'shaders',
    title: 'Check for missing shaders',
    body: [
      'Turn on the FPS display to see how many shaders are ready and whether any are missing (the "missing" number is what you can share). It reads like this: `Shaders 12,400 / 13,962   missing 3`.',
      'The first number is the shaders ready so far (it climbs during startup), the second is all the shaders the app carries, and "missing" counts shaders the game needed that the app does not have. A missing shader is skipped on the phone, so that part of the picture is not drawn.',
    ],
    link: { label: 'How to share them, or fill them in from your Mac: Sharing shaders', url: `${base}sharing-shaders/` },
  },
  {
    id: 'updating',
    title: 'Updating from an earlier version',
    body: [
      'If you installed an earlier version, the new one appears as a separate app. Installing copies your saves across and copies the game data again (make sure you have 14 GB free). Delete the old app once the new one shows your saves.',
    ],
    notes: [
      {
        kind: 'warning',
        text: 'With a free Apple ID, the new app counts as one more App ID (the limit is about 10 per 7 days).',
      },
    ],
  },
]

export const IOS_GUIDE: GuidePage = {
  eyebrow: 'iPhone and iPad guide',
  title: 'Install on iPhone and iPad',
  summary: 'Build the app for your iPhone or iPad on your Mac, then install it with a cable and your own Apple ID.',
  experimental: EXPERIMENTAL_NOTE,
  time: [
    'The first iPhone build takes about 28 minutes on an M1 while it prepares the shaders; later builds reuse that work. Add the Mac setup first (a clean Mac build takes about 8 minutes).',
  ],
  checklist: {
    title: 'What you need',
    items: [
      'Everything the Mac guide needs: a Mac with Apple silicon on macOS 26, the tools, about 16 GB free, your game and your keys.',
      'Xcode 26 or later with the iOS SDK, and the iOS platform (Xcode › Settings › Components).',
      'xcodegen and CMake from Homebrew (step 2).',
      'An iPhone 14 or newer (A15 or later) on iOS 26, or an iPad with an A15 chip or later on iPadOS 26. These are the original project\'s requirements; untested with this game beyond the iPhone 15 Pro Max.',
      'A cable to connect the device to your Mac, and your Apple ID (a free Personal Team works).',
      'About 14 GB free on the device for the game data.',
    ],
  },
  byo: { title: 'Bring your own', items: BYO_ITEMS },
  steps: IOS_STEPS,
  troubleshooting: {
    intro: 'Only problems the project documents. Anything else: open an issue with the last lines of the output.',
    items: [
      {
        q: 'The install stops at "profile" with "Developer Mode disabled"',
        a: ['Developer Mode is off. Turn it on (Settings › Privacy & Security › Developer Mode), restart, and install again.'],
      },
      {
        q: 'There is no Developer Mode switch',
        a: [
          'Connect the device to your Mac with a cable and unlock it once (open Xcode if it does not appear); the switch shows up after that.',
        ],
      },
      {
        q: 'Xcode shows the device as Preparing',
        a: [
          'Let that finish first, and keep the device unlocked. "May need to be unlocked to recover from previously reported preparation errors" means exactly this.',
        ],
      },
      {
        q: 'The window has no signing team',
        a: [
          'You have no Apple Development certificate yet. Make one in Xcode › Settings › Accounts › add your Apple ID › Manage Certificates › + › Apple Development.',
        ],
      },
      {
        q: 'Seven days have passed',
        a: ['A free Apple ID signs the app for 7 days. Install again to renew; your saves are kept.'],
      },
      {
        q: 'Parts of the picture are missing',
        a: [
          'A shader neither found in your game files nor on the shared list is skipped on the phone, and you may see a character without their clothes. Share it, or fill it in from your Mac right away; the Sharing shaders page shows both.',
        ],
      },
      {
        q: 'The new version appeared next to the old app',
        a: [
          'iOS treats the new app ID as another app. The first install of the new one copies the old app\'s saves, shader cache, shader list contribution, shader requests and Settings choices over, unless the new app already has saves. If the copy fails it says how to copy the `save` folder by hand in Finder or the Files app, and the next install tries again. The old app and its data are left alone: delete it once the new one shows your saves.',
        ],
      },
      {
        q: 'I used another sideloading tool',
        a: [
          'Keep the IPA\'s entitlement (`increased-memory-limit`). Then copy the game data: in Finder, select the device, open Files, and drag `<path to>/XCX_build/extracted/<v101 | v200>/romfs/romfs.bin` onto Xenoblade Chronicles X. The app moves it into its GameData folder on the next start. If the game starts before the copy is complete, it says so and waits for the next start.',
        ],
      },
      {
        q: 'Can I use the iOS Simulator?',
        a: ['No. The graphics layer uses Metal 4, which the Simulator SDK does not have.'],
      },
      {
        q: 'Where is the log on the device?',
        a: [
          'It is `log.txt` in the app\'s Documents. You can read it in the Files app: On My iPhone › Xenoblade Chronicles X. Saves and the shader cache are in Documents too.',
        ],
      },
    ],
  },
  related: [
    {
      title: 'Install on Mac',
      body: 'The setup this guide builds on: Terminal, the tools, the code and the builder window.',
      href: mac,
    },
    {
      title: 'Sharing shaders',
      body: 'Share the shaders your phone misses, or fill them in from your Mac right now.',
      href: `${base}sharing-shaders/`,
    },
    {
      title: 'The full README on GitHub',
      body: 'Every option, the iPhone and iPad details and the known issues.',
      href: README_URL,
      external: true,
    },
  ],
}
