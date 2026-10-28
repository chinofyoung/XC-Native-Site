import type { GuidePage, GuideStep } from './guide'
import { BYO_ITEMS } from './guide'
import { ISSUES_URL, README_URL, REPO_URL } from './site'

const base = import.meta.env.BASE_URL

export const BREW_INSTALL_COMMAND =
  '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
export const BREW_PACKAGES_COMMAND = 'brew install opus libvpx python@3.14'
export const GUI_COMMAND = 'python3 build_app.py --gui'

export const MAC_STEPS: GuideStep[] = [
  {
    id: 'terminal',
    title: 'Never used Terminal? Start here',
    body: [
      'Terminal is the Mac app where you type commands instead of clicking. Every command on this page goes into Terminal. You only need a few things.',
    ],
    substeps: [
      '**Open Terminal.** Press Command-Space to open Spotlight, type Terminal and press Return. Or open Finder, then Applications › Utilities › Terminal.',
      '**Run a command.** Click the copy button on a command box on this page, click in the Terminal window, paste with Command-V and press Return. Wait until the prompt (the line ending in `%`) comes back before you run the next command.',
      '**Your Mac password.** Some commands ask for your Mac password. Nothing appears while you type it, not even dots. That is normal: type it and press Return.',
      '**Replace the placeholders.** Anything in angle brackets, like `<path to>/prod.keys`, stands for your own file and must be replaced. The easiest way: type the command up to that point, then drag the file from Finder into the Terminal window. Terminal pastes its full path for you.',
      '**`cd` moves Terminal into a folder.** `cd XC-Native` means "work inside the XC-Native folder from now on". The build commands only work from inside that folder.',
    ],
    notes: [
      {
        kind: 'tip',
        title: 'If something goes wrong',
        text: 'Copy the last lines of what Terminal printed and paste them into a GitHub issue, so someone can see what happened.',
      },
    ],
    link: { label: 'Open an issue on GitHub', url: ISSUES_URL },
  },
  {
    id: 'command-line-tools',
    title: 'Install the Xcode command line tools',
    body: [
      'The build needs Apple\'s developer tools: Xcode (for `clang`, `llvm-objdump` and the Metal frameworks), or at least the Xcode command line tools plus Xcode\'s `llvm-objdump`. The command line tools also bring `git`, which the build uses.',
      'This command asks macOS to install the command line tools. If you already have Xcode installed, you can skip this step.',
    ],
    commands: [{ label: 'Install the command line tools', code: 'xcode-select --install' }],
    expect: 'a window that asks to install the command line tools. Accept it and wait until the download and install finish.',
  },
  {
    id: 'homebrew',
    title: 'Install Homebrew and the libraries',
    body: [
      'Homebrew is a free tool that installs other tools from Terminal. The build needs three things from it: Opus (the game\'s audio), libvpx (it decodes the game\'s movies) and Python 3.14, which runs the build.',
    ],
    substeps: [
      'If you do not have Homebrew yet, install it with the command below, the official one from brew.sh. It asks for your Mac password. When it finishes, it may print a few more commands under "Next steps"; run those too.',
      'Then install the three libraries with the second command.',
    ],
    commands: [
      { label: 'Install Homebrew', code: BREW_INSTALL_COMMAND },
      { label: 'Install opus, libvpx and Python 3.14', code: BREW_PACKAGES_COMMAND },
    ],
    expect: 'the prompt come back when each command is done. Homebrew prints what it downloads and installs as it goes.',
    link: { label: 'Homebrew\'s own page, brew.sh', url: 'https://brew.sh' },
  },
  {
    id: 'get-code',
    title: 'Get the code',
    body: [
      'This downloads the project into a folder named XC-Native (inside the folder Terminal is in, your home folder when you first open it), then moves Terminal into it with `cd`. Every build command on this page runs from this folder.',
    ],
    commands: [
      { label: 'Clone the repository', code: 'git clone https://github.com/chinofyoung/XC-Native.git && cd XC-Native' },
    ],
    expect: 'git count up as it receives the files, then the prompt come back inside the XC-Native folder.',
    notes: [
      {
        kind: 'tip',
        title: 'Opened a new Terminal window later?',
        text: 'A new window starts in your home folder. Type `cd ` (with a space), drag the XC-Native folder from Finder into the window, and press Return.',
      },
      {
        kind: 'tip',
        title: 'Without git',
        text: 'On the GitHub page, the green **Code** button › **Download ZIP** gives the same files. The unzipped folder is named XC-Native-main, so `cd` into that folder instead. `git clone` is the main way.',
      },
      {
        kind: 'tip',
        title: 'Where to keep your game file',
        text: 'You can keep your game file and `prod.keys` in a folder named `personal` inside XC-Native, where git ignores them. Any other place works. Keep game files, work folders and apps out of the project\'s tracked files.',
      },
    ],
    link: { label: 'The XC-Native repository on GitHub', url: REPO_URL },
  },
  {
    id: 'check-mac',
    title: 'Check your Mac',
    body: [
      'This checks this Mac without building anything: the macOS version, Apple silicon, the developer tools, Homebrew\'s `opus` and `libvpx`, and Python 3.14.',
    ],
    commands: [{ label: 'Check the requirements', code: 'python3 build_app.py --check-requirements' }],
    expect: 'a fix printed for anything that is missing. Run the fix, then run the check again.',
  },
  {
    id: 'build',
    title: 'Build the app in the builder window',
    body: [
      'The easiest way to build: a small window where you pick your files with the mouse, so you do not type any paths. Run this command from the XC-Native folder to open **Xenoblade Chronicles X Builder**.',
    ],
    commands: [{ label: 'Open the builder window', code: GUI_COMMAND }],
    substeps: [
      'Choose your game file (the XCI, or a base NSP) and your `prod.keys`. Each file shows what it is, read from inside it (for example "XCI: base v0 + update 1.0.1"), and the window says which version the build makes.',
      'For 2.0.0, also choose the 2.0.0 update NSP. It is optional for an XCI that holds 1.0.1, and choosing it there updates the game. For a base NSP the update NSP (1.0.1 or 2.0.0) is required, and NSP builds also need your firmware folder.',
      'Look at the **Prerequisites** panel. It checks this Mac and lists anything missing, with the command that installs it.',
      'Press **Build App**.',
      'When it finishes, press **Open App** or **Show in Finder**.',
    ],
    expect:
      'each step with its time and the log while it builds. The app, `Xenoblade Chronicles X.app`, is made next to your game file.',
    notes: [
      {
        kind: 'tip',
        text: 'The first time, the window is compiled with the Xcode command line tools, which takes a few seconds. Nothing ready-made is downloaded. The window remembers your choices and never shows or logs key values.',
      },
      {
        kind: 'tip',
        text: '**Cancel** stops cleanly, and the next build continues from the last finished step. If the build stops, the window names the step and the file.',
      },
      {
        kind: 'warning',
        text: 'A file of the wrong kind (an update chosen as the game file, another game, an unsupported version) is flagged and the build stays disabled.',
      },
    ],
    link: { label: 'NSP builds need a few extra files (see the README).', url: README_URL },
    advanced: {
      title: 'Advanced: build with one command instead',
      body: [
        'The same build from Terminal, without the window. Replace each `<…>` with the path to your own file (drag the file into Terminal). The first command builds 1.0.1. The second adds the 2.0.0 update NSP and builds 2.0.0. The third is for a base NSP.',
      ],
      commands: [
        { label: 'Build 1.0.1 from an XCI', code: 'python3 build_app.py "<path to>/<game>.xci" -k "<path to>/prod.keys"' },
        {
          label: 'Build 2.0.0 with the update NSP',
          code: 'python3 build_app.py "<path to>/<game>.xci" -k "<path to>/prod.keys" --update "<path to>/<2.0.0 update>.nsp"',
        },
        {
          label: 'Build from a base NSP',
          code: 'python3 build_app.py "<path to>/<base>.nsp" -k "<path to>/prod.keys" --update "<path to>/<1.0.1 or 2.0.0 update>.nsp" --firmware "<path to>/<firmware folder>"',
        },
      ],
      after: [
        'For an NSP without a common ticket, add `--title-keys "<path to>/title.keys"`. `python3 build_app.py --help` lists every option.',
        'Need the disk space back? `--delete-work` deletes the work folder once the app is built and its final check passed. The next build or update then starts from scratch, about 8 minutes.',
      ],
      expect:
        'the build check the Mac first, then each step timed as it runs. A second run reuses what is already done and correct and takes seconds.',
    },
  },
  {
    id: 'play',
    title: 'Play',
    body: [
      'The app holds everything it needs, so you can move it, also to `/Applications`. Your game file stays where it is.',
    ],
    substeps: [
      'Double-click `Xenoblade Chronicles X.app` in Finder.',
      'A settings window comes first. The default preset is "Original (30 fps, window)"; "Original (30 fps, full screen)" is the other one.',
      'Press **Play**.',
    ],
    expect:
      'the game start. The first start checks the whole RomFS once, so the first frame takes about 10 seconds; later starts reuse that record.',
    notes: [
      {
        kind: 'tip',
        text: 'Builds prepare the shaders ahead of time, so only ones nobody has met yet are made while you play (a short stutter).',
      },
    ],
  },
  {
    id: 'sixty-fps',
    title: 'Optional: try 60 fps',
    body: [
      'The settings window also has an experimental 60 fps option under **Frame rate: 30 (original) / 60 (experimental)**. It is off by default and reaches about 45-57 fps in the field on an M1.',
    ],
    notes: [
      {
        kind: 'warning',
        text: 'Two of the game\'s subsystems step by a fixed 1/60 s a frame, so they run slower than normal while the game is below 60 fps. Cutscenes, Skells and cities were not tested. On a fanless Mac the higher frame rate means more heat.',
      },
    ],
    link: { label: 'The README has the details on 60 fps.', url: README_URL },
  },
  {
    id: 'controls',
    title: 'Controls',
    body: [
      'A controller that macOS recognizes is given to the game as one Switch controller (a DualSense was used in testing). The Mac keyboard uses the physical key positions of a US layout, as in the table below.',
    ],
    extra: 'controls',
    notes: [
      { kind: 'tip', text: 'Keys 3 and 4 do nothing in this port.' },
    ],
  },
  {
    id: 'updating',
    title: 'Updating from an earlier version, or to 2.0.0',
    body: [
      'Updating from an earlier version? Rebuild the app; your saves move to the new folder on the first start. Delete apps built before this update.',
      'Your saves are not in the app. They are in `~/Library/Application Support/XCNative/XCX/profile`, so a rebuilt app continues from them. To go from 1.0.1 to 2.0.0, build again with the 2.0.0 update NSP to the same app: in the window, choose the update NSP, or use this command.',
    ],
    commands: [
      {
        label: 'Update to 2.0.0',
        code: 'python3 build_app.py "<path to>/<game>.xci" -k "<path to>/prod.keys" --update "<path to>/<2.0.0 update>.nsp"',
      },
    ],
    expect:
      'the build say when it replaces an older app. The window offers **Back Up Saves** before it builds (**Back Up Saves and Build**, **Build Without Backup**, **Cancel**).',
    notes: [
      {
        kind: 'warning',
        text: 'A 1.0.1 save loads in 2.0.0, but the other direction is not guaranteed: once 2.0.0 has saved, that save may not load in 1.0.1 again. Back up your saves first.',
      },
      {
        kind: 'tip',
        title: 'Moving saves to another Mac or an iPhone?',
        text: 'The settings window has **Export Saves…** and **Import Saves…** in its **Saves** row. Export makes one zip you can AirDrop or put in iCloud Drive; Import checks it, backs up your current saves, then replaces them.',
      },
    ],
    link: { label: 'Moving saves, step by step', url: `${base}moving-saves/` },
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
  { key: '2', switch: 'Cycle MetalFX frame interpolation (off at start; costs more than it gains on an M1, and causes visual glitches: moving characters, enemies and rain streaks ghost, enemy labels run half a frame ahead)' },
]

export const MAC_GUIDE: GuidePage = {
  eyebrow: 'Mac guide',
  title: 'Install on Mac',
  summary: 'Build Xenoblade Chronicles X as a Mac app from your own game file and prod.keys, then play it.',
  time: [
    'A clean build takes about 8 minutes, plus the time to install the tools. A second build reuses what is already done and takes seconds.',
  ],
  checklist: {
    title: 'What you need',
    items: [
      'A Mac with Apple silicon and **macOS 26** or later.',
      'Xcode, or at least the Xcode command line tools plus Xcode\'s `llvm-objdump` (step 2).',
      'Homebrew with `opus`, `libvpx` and Python 3.14 (step 3).',
      'Network access for the first build: it fetches SPIRV-Cross and the build\'s Python packages.',
      'About **16 GB free** for the work folder (the merged game data alone is 14.3 GB). On the same volume the app costs no extra space.',
      'Your game, update **1.0.1 or 2.0.0**: one XCI holding the base and 1.0.1 (builds 1.0.1), that XCI plus the 2.0.0 update NSP (builds 2.0.0), or a base NSP plus the 1.0.1 or 2.0.0 update NSP.',
      'For NSPs: your firmware\'s NCA files (for the system fonts), and `title.keys` for an NSP without a common ticket.',
    ],
  },
  byo: { title: 'Bring your own', items: BYO_ITEMS },
  steps: MAC_STEPS,
  troubleshooting: {
    intro: 'Only problems the project documents. Anything else: open an issue with the last lines of the output.',
    items: [
      {
        q: 'The check or the Prerequisites panel says something is missing',
        a: [
          'Run the command it prints. `python3 build_app.py --check-requirements` checks this Mac without building anything and prints a fix for anything missing.',
        ],
      },
      {
        q: 'The build stops with a message about the game or its version',
        a: [
          'The build recognises the game by the title IDs and versions inside the files, never by their names. Another game, the update given as the game, a base-only file without `--update`, or another version stops it with a message naming the supported versions (1.0.1 and 2.0.0).',
        ],
      },
      {
        q: 'The build stops at one file',
        a: [
          'Every step is checked against the version\'s expected hashes, so a damaged dump stops at the first wrong file. The window names the step and the file.',
        ],
      },
      {
        q: 'I cancelled the build, or it stopped',
        a: ['Cancel stops cleanly. The next build continues from the last finished step.'],
      },
      {
        q: 'An NSP build cannot find the system fonts',
        a: [
          'The game\'s own partitions do not carry the six Switch system fonts. An XCI\'s system update does; for NSPs, pass your firmware\'s NCA files with `--firmware <folder>` (or the firmware folder in the window), unless an earlier build already extracted them into the work folder.',
        ],
      },
      {
        q: 'The first start takes a while',
        a: ['The first start checks the whole RomFS once, so the first frame takes about 10 seconds. Later starts reuse that record.'],
      },
      {
        q: 'The game stutters for a moment',
        a: [
          'Builds prepare every shader in your game plus the shared list. A shader nobody has shared yet is made while you play on the Mac, which is a short stutter.',
        ],
      },
      {
        q: 'The frame rate drops, or things ghost, after pressing 2',
        a: [
          'Key 2 cycles MetalFX frame interpolation. On an M1 it costs more than it gains: with 30+30 the game itself drops to about 23-27 fps. It also causes visual glitches: characters and enemies moving on their own, and rain streaks, ghost in the generated frames, and labels attached to enemies run half a frame ahead. Press 2 until it is off again; it is off at start.',
        ],
      },
      {
        q: 'Black shapes flicker in New Los Angeles, or eyes disappear in cutscenes',
        a: [
          'A known issue: flickering black shapes come off some objects, and characters\' eyes can disappear during cutscenes (they are fine in character creation). Thin black lines or small flashes can appear for a split second now and then, at 60 fps and, rarely, at 30 fps. Being investigated.',
          'Fixes for flicker at 60 fps and for stretched meshes in field battles are on the Fixes page; build the app again to get them.',
        ],
      },
      {
        q: 'The game stopped and the log names a function',
        a: [
          'About a hundred NVN functions the game imports are not implemented. One that is called stops the game with its name in the log; none has stopped the game so far, up to Chapter 3 on Mac. Please open an issue with that log line.',
        ],
      },
      {
        q: 'Where are my saves and the log?',
        a: [
          'Saves: `~/Library/Application Support/XCNative/XCX/profile`. Shader cache: `~/Library/Application Support/XCNative/XCX/shader-cache/`. Log: `~/Library/Logs/XCNative/xcx.log` (the run before: `xcx.previous.log`).',
        ],
      },
      {
        q: 'My saves are in the old folder from an earlier version',
        a: [
          'The next build or app start moves the old folder to the XCNative one once (a rename, nothing is copied). If both exist, the new one is used and the old one is left as it is. If the move fails, or the game is running, the old folder stays in use and the next start tries again. The log says what happened (`[launcher] library:` lines).',
          'Rebuild or delete apps built before this change: an older app would write to the old folder again.',
        ],
      },
    ],
  },
  related: [
    {
      title: 'Next: Install on iPhone',
      body: 'The iPhone build needs everything this Mac setup does, plus a few more tools. Experimental.',
      href: `${base}iphone/`,
    },
    {
      title: 'Sharing shaders',
      body: 'Share the shaders your game meets, so everyone\'s next build can prepare them.',
      href: `${base}sharing-shaders/`,
    },
    {
      title: 'The full README on GitHub',
      body: 'Every option, the developer build and the details behind this guide.',
      href: README_URL,
      external: true,
    },
  ],
}
