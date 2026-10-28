// The "Moving saves" page: save export and import between Macs, iPhones and iPads.
// Source: XC-Native games/xcx/README.md "Moving saves between Macs and iPhones", CHANGELOG 2026-10-28,
// app/launcher.m and ios/Sources/main.m for the exact button names and messages.
// Inline markup: `code` and **bold**.

const base = import.meta.env.BASE_URL

export const SAVES_ZIP_NAME = 'XCX-saves-<yyyy-MM-dd-HHmm>.zip'
export const MAC_PROFILE_PATH = '~/Library/Application Support/XCNative/XCX/profile'
export const MAC_BACKUP_PATH = '~/Library/Application Support/XCNative/XCX/profile-<version>-backup-<date>'
export const IOS_BACKUP_NAME = 'save-<version>-backup-<date>'
export const MAC_EXPORT_COMMAND =
  '"Xenoblade Chronicles X.app/Contents/MacOS/Xenoblade Chronicles X" --export-saves "<path to>/XCX-saves.zip"'
export const MAC_IMPORT_COMMAND =
  '"Xenoblade Chronicles X.app/Contents/MacOS/Xenoblade Chronicles X" --import-saves "<path to>/XCX-saves-<date>.zip"'

export type SaveStep = { text: string; code?: string }

export const SAVES = {
  title: 'Moving saves',
  eyebrow: 'Mac · iPhone · iPad',
  lead: 'Take your game from a Mac to an iPhone or iPad and back, as one zip file.',
  reassurance: {
    title: 'You move one file yourself',
    body: 'Export makes one zip of your saves. You move it the way you move any file: AirDrop, iCloud Drive or the Files app. There is no account and no online service of the project in between.',
  },
  what: {
    title: 'What this is',
    paragraphs: [
      'Your saves are plain files, but the folder they sit in is named after the device\'s own account, so copying folders by hand puts them where the game does not look. Export and import do it for you.',
      `On the Mac, **Export Saves…** and **Import Saves…** are in the settings window. On an iPhone or iPad the app opens on a start screen with **Play**, **Export Saves** and **Import Saves**. Both make and read the same zip, \`${SAVES_ZIP_NAME}\`.`,
      'The zip holds:',
    ],
    bullets: [
      'The save files: `gamedata01`, `gamedata02`, `gamedataa`, `systemdata`, `avatarmakedata`, `socialdata` and the `.tmb` thumbnails.',
      '`xcx-saves.json`: the game version, the device name, the export time, and the size and SHA-256 of every file, so the importing device can check them.',
    ],
  },
  before: {
    title: 'Before you start',
    items: [
      '**Get the new app.** Export and import came on 2026-10-28. On the Mac, build the app again. On the iPhone or iPad, build the IPA again and install it again.',
      '**Mind the game version.** A 2.0.0 export is refused by a 1.0.1 app. A 1.0.1 export goes into a 2.0.0 app. The importing app shows the export\'s game version before it changes anything.',
      '**Quit the game.** On the Mac both buttons are off while the game runs, and the window says "The game is running: quit it to export or import saves." On an iPhone or iPad the buttons are only on the start screen, before **Play**. The game cannot be stopped inside the app, so to get back to the start screen, close the app (swipe it away in the app switcher) and open it again.',
    ],
    links: [
      { label: 'Install on Mac', href: `${base}mac/` },
      { label: 'Install on iPhone', href: `${base}iphone/` },
    ],
  },
  how: {
    title: 'Step by step',
    intro: 'Pick the direction you need. Each one is an export on one device and an import on the other.',
    flows: [
      {
        id: 'mac-to-iphone',
        title: 'Mac to iPhone or iPad',
        tested: 'Play-tested on 2026-10-28 (2.0.0).',
        steps: [
          { text: 'On the Mac, double-click `Xenoblade Chronicles X.app`. The settings window comes first.' },
          {
            text: 'Press **Export Saves…** in the **Saves** row. The save panel says "This Mac\'s saves, in one zip another Mac or an iPhone can import." and suggests a name like `XCX-saves-<date>.zip`.',
          },
          {
            text: 'Save it in iCloud Drive, or save it anywhere and send it to the phone with AirDrop. The Mac says "Saves exported" with the file\'s place.',
          },
          { text: 'On the iPhone, open Xenoblade Chronicles X. It opens on the start screen.' },
          { text: 'Tap **Import Saves**. The Files picker opens. Find the `XCX-saves-....zip` and pick it.' },
          {
            text: 'The app asks "Import these saves?": "This replaces your current saves. A backup is made first." Below that it shows **From** (the device that exported), **Exported** (when) and **Game version**. Tap **Import**, or **Cancel** to leave everything as it is.',
          },
          {
            text: 'When it is done, "Saves imported" says where your previous saves went, for example "Your previous saves were copied to Files › On My iPhone › Xenoblade Chronicles X › `save-<version>-backup-<date>`." With no saves before, it says "There were no previous saves to back up."',
          },
          { text: 'Tap **Play**. The game starts with the imported saves.' },
        ],
      },
      {
        id: 'iphone-to-mac',
        title: 'iPhone or iPad to Mac',
        tested: 'Not play-tested yet. It uses the same zip and the same checks.',
        steps: [
          { text: 'On the iPhone, open Xenoblade Chronicles X. It opens on the start screen.' },
          {
            text: 'Tap **Export Saves**. The share sheet opens. (The button is off, with "There are no saves to export yet.", when there are no saves.)',
          },
          { text: 'Pick **AirDrop** and your Mac, or **Save to Files** (iCloud Drive, for example).' },
          { text: 'On the Mac, double-click `Xenoblade Chronicles X.app`. The settings window comes first.' },
          {
            text: 'In the **Saves** row, press **Import Saves…** and choose the zip ("Choose a saves zip (XCX-saves-….zip).").',
          },
          {
            text: 'The Mac asks "Import these saves?" with **From**, **Exported** and **Game version**. Press **Import**, or **Cancel**.',
          },
          {
            text: '"Saves imported" names the backup of your previous Mac saves, in `~/Library/Application Support/XCNative/XCX/`.',
          },
          { text: 'Press **Play**.' },
        ],
      },
      {
        id: 'mac-to-mac',
        title: 'Mac to Mac',
        tested:
          'Checked from the command line on a copy of real 2.0.0 saves (the files came out identical). The buttons were not clicked through by hand for this.',
        steps: [
          { text: 'On the first Mac, press **Export Saves…** in the settings window and save the zip.' },
          { text: 'Move the zip to the other Mac: AirDrop, iCloud Drive, a USB drive.' },
          {
            text: 'On the other Mac, press **Import Saves…**, choose the zip, check **From**, **Exported** and **Game version**, and press **Import**.',
          },
        ],
      },
    ],
  },
  safe: {
    title: 'How import keeps your saves safe',
    intro: 'An import never mixes old and new saves, and it keeps a copy of what it replaces.',
    bullets: [
      '**It checks first.** Before it writes anything, the import reads the whole zip: the list of files, plain file names only, and every file\'s size and SHA-256. It refuses a damaged zip, a zip that is not a saves export, and an export from a newer game version (2.0.0 into a 1.0.1 app). A refused import changes nothing, and the app says "The saves were not imported" with the reason.',
      `**It backs up first.** On the Mac the whole profile is copied to \`${MAC_BACKUP_PATH}\`, the same naming as the builder's **Back Up Saves**. On an iPhone or iPad the saves are copied to \`${IOS_BACKUP_NAME}\`, which you can see in the Files app: On My iPhone › Xenoblade Chronicles X.`,
      '**It replaces in one step.** The new files are written aside first and then swapped in, so the save folder holds either the old saves or the new ones, never a mix.',
      '**It leaves the device\'s own files alone.** `account.uid`, `pseudo-device.id`, `pso_user.tsv`, `cache/` and `temp/` belong to the device. They are never exported or replaced.',
      '**It puts the saves where this device looks.** The account folder has a different name on every device. The import writes into the importing device\'s own folder, so you never rename anything. A device that never started the game can import too.',
    ],
  },
  undo: {
    title: 'Undo an import',
    mac: {
      title: 'On a Mac',
      steps: [
        { text: 'Quit the game and close the settings window.' },
        { text: 'In Finder, open this folder (Go › Go to Folder…):', code: '~/Library/Application Support/XCNative/XCX' },
        {
          text: 'Move the `profile` folder away (to the Desktop, for example), then rename the backup, `profile-<version>-backup-<date>`, to `profile`.',
        },
        { text: 'Open the app again. It uses the saves from before the import.' },
      ],
    },
    ios: {
      title: 'On an iPhone or iPad',
      text: `Your previous saves are in \`${IOS_BACKUP_NAME}\` in the Files app (On My iPhone › Xenoblade Chronicles X). The project does not describe a way to put that folder back on the phone yet, so keep it until you are sure about the imported saves.`,
    },
  },
  commandLine: {
    title: 'From Terminal (Mac)',
    intro:
      'The app can export and import without its window. Run these from the folder that holds the app, and use your own zip path. They do the same checks and the same backup.',
    after: '`TOTK_PROFILE_DIR=<folder>` points them at another profile folder.',
  },
  tested: {
    title: 'What has been tested',
    items: [
      '**Play-tested Mac to iPhone** on 2026-10-28 (2.0.0): saves exported with the Mac app on an M1 MacBook Air, imported on an iPhone 15 Pro Max through the start screen and the Files picker, and the game loaded them.',
      '**Checked on the Mac from Terminal** on a copy of real 2.0.0 saves: the files came back identical, the backup was made, and a 1.0.1 app refused the 2.0.0 zip.',
      '**Not checked by hand yet:** an export from the iPhone (the share sheet), an import on the Mac from the settings window, a controller\'s A button on the start screen, and an iPad.',
    ],
  },
  questions: {
    title: 'Questions',
    items: [
      {
        q: 'Is this cloud save?',
        a: [
          'No. Nothing syncs on its own. You export when you want to move your game, and import on the other device. If you play on both, export again from the device you played on last.',
        ],
      },
      {
        q: 'Can I import on the iPhone before the game data is copied?',
        a: [
          'Yes. Without game data **Play** is off and the start screen says how to copy `romfs.bin`, but **Import Saves** works, so your saves can go in before the 14 GB image.',
        ],
      },
      {
        q: 'Can a 2.0.0 save go into a 1.0.1 app?',
        a: [
          'No, the import refuses it and changes nothing. A 1.0.1 export goes into a 2.0.0 app. To play a 2.0.0 save, build the other app for 2.0.0 too.',
        ],
      },
      {
        q: 'Export Saves does nothing, or is greyed out',
        a: [
          'There are no saves on this device yet. The iPhone start screen says "There are no saves to export yet." and the button is off; on a Mac the button answers "No saves". On a Mac both buttons are also off while the game runs: quit the game first.',
        ],
      },
      {
        q: 'The import was refused',
        a: [
          '"The saves were not imported" comes with the reason: the zip is damaged, it is not a saves export, or it is from a newer game version. Nothing was changed and no backup was made. Export again on the other device and send the new zip.',
        ],
      },
      {
        q: 'How do I get back to the start screen on the iPhone?',
        a: [
          'Close the app (swipe up from the bottom and hold to open the app switcher, then swipe it away) and open it again. The game runs inside the app and cannot be stopped there, which is why export and import are only on the start screen.',
        ],
      },
      {
        q: 'Can I press Play with a controller?',
        a: ['Yes, a controller\'s A button presses **Play** on the start screen. This was not checked by hand yet.'],
      },
    ],
  },
}
