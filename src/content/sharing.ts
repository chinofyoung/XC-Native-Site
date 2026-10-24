import { REPO_URL } from './site'

export const SHADER_FORM_URL = `${REPO_URL}/issues/new?template=shader-list.yml`
export const MAC_CONTRIBUTION_PATH = '~/Library/Application Support/XCNative/XCX/shader-list-contribution.txt'
export const LIST_DEVICES = 'xcrun devicectl list devices'
export const IOS_FETCH_COMMAND =
  'XCX_IOS_DEVICE=<id> python3 build_app.py "<path to>/<game>.xci" -k "<path to>/prod.keys" --platform ios'
export const FILL_SHADERS_COMMAND =
  'python3 games/xcx/ios/tools/fill_shaders.py --work XCX_build --device <id> --bundle-id <bundle id>'
export const METAL_TOOLCHAIN_COMMAND = 'xcodebuild -downloadComponent MetalToolchain'

// Inline markup: `code` and **bold**.
export const SHARING = {
  title: 'Sharing shaders',
  lead: "Help every player's copy of Xenoblade Chronicles X draw the whole picture.",
  reassurance: {
    title: 'Only a small text file leaves your machine',
    body: 'No game files, no saves and no personal information. The file holds identifiers only: each line is a fingerprint of a shader and how it is set up. You can open it in any text editor before you send it.',
  },
  what: {
    title: 'What this is',
    paragraphs: [
      'A game draws its picture with many small programs called shaders. A Mac makes the ones it needs while you play. An iPhone cannot do that, so it can only use the shaders that were prepared when the app was built. If one is missing, the game skips that part of the picture, and you may see a character without their clothes.',
      "Nobody has played every corner of the game, so nobody's build has every shader. That is why there is a shared list. When you play, the game notes the shaders it met that the list does not have yet. If you share them, they join the list, and everyone's next build prepares them in advance. The more people share, the fewer gaps there are.",
    ],
  },
  data: {
    title: "What you share and what you don't",
    paragraphs: ['You share a short text file. Each line is a fingerprint of a shader and how it is set up. That is all.'],
    bullets: [
      'No game files, no pieces of the game, no saves and no personal information.',
      'Nobody can rebuild the game from the list. It only says which shaders exist.',
      "Each player's build makes the real shaders from their own copy of the game. Nothing from the game is ever uploaded or downloaded.",
    ],
    after: 'You can open the file in any text editor before you send it.',
  },
  build: {
    title: 'Your first build',
    paragraphs: [
      'Nothing to set up. When you build the app, the build downloads the newest shared list. If you are offline, it uses the last list it saved, or the one that comes with the project (`python3 build_app.py ... --offline` skips the download). Then it finds those shaders in your own game files and prepares them, for the Mac and for the iPhone. The window and the log show this as the step "shaders: prepare".',
      'What to expect:',
    ],
    bullets: [
      '**Mac:** the first preparation took about a minute on an M1 for about 12,400 shaders. The build finds 12,429 shaders in 6,818 game files (12,427 can be prepared) in about 18 seconds. A rebuild with nothing new takes about 2 seconds.',
      '**iPhone:** the first iPhone build after this also prepares the shaders for the phone. That took about 28 minutes once. Later builds reuse that work. The app grew from 86 MB to 159 MB and now carries 13,962 shaders.',
      '**A few parts may still be missing at first.** The list only has what players have found so far. On the Mac, anything missing is made while you play. On the iPhone it is skipped until it is on the list. See "Fixing missing parts right now" below.',
    ],
  },
  how: {
    title: 'How to share',
    intro: 'You need a free GitHub account (see the questions at the end). Sharing is one file and one form.',
    mac: {
      title: 'On a Mac',
      steps: [
        { text: 'Play. The game saves the new shaders it meets in this file:', code: MAC_CONTRIBUTION_PATH },
        {
          text: 'When the file has 50 new shaders, the game asks before it starts: "Share", "Not now" or "Never". After that it asks again every 500 more. "Not now" asks again after 500 more new shaders. "Never" stops the questions (the game still notes them).',
        },
        { text: 'Choose "Share". Your browser opens the GitHub form and Finder shows the file.' },
        {
          text: 'Drag `shader-list-contribution.txt` into the form\'s file box, pick the game version and "Mac", and press "Submit new issue".',
        },
      ],
      after: [
        'The builder window also shows a "Share N new shaders" button after a build. It does the same as "Share".',
        'To do it by hand, open the form with the button above, fill it in, and attach the file from the folder above.',
      ],
    },
    ios: {
      title: 'On an iPhone',
      intro:
        'The phone keeps its own file. Open the Files app, then On My iPhone, then Xenoblade Chronicles X, and find `shader-list-contribution.txt`. To share it by hand:',
      steps: [
        { text: 'Send the file to your Mac (AirDrop works, or connect with a cable and use Finder\'s file sharing).' },
        { text: 'Open the form, drag the file in, pick the game version and "iPhone", and submit.' },
      ],
      overlay:
        "The overlay's \"missing\" number tells you when the phone met shaders it does not have.",
      fetchIntro:
        "If you build the iOS app from a Mac with the phone connected, the Mac can fetch the file for you. Set `XCX_IOS_DEVICE` to the phone's id before the build:",
      fetchAfter:
        "The build then copies the phone's file to the Mac and merges it into the Mac's file, so the \"Share\" button or reminder counts those shaders too. (If your app has a team name in its bundle id, also set `XCX_BUNDLE_ID` to it. The bundle id is explained in the next section.) If the phone is not there, the build only prints a warning and goes on.",
    },
  },
  after: {
    title: 'What happens after you share',
    steps: [
      'Within a few minutes an automatic check reads your file. It accepts only lines of the expected shape, so it cannot add anything else to the list.',
      'If it is fine, the new shaders are added to the shared list, a comment thanks you, and the issue is closed.',
      'Your next build, and everyone else\'s, downloads the list and prepares those shaders too.',
    ],
    note: 'You do not need to do anything else, and nobody needs to approve it by hand.',
  },
  fix: {
    title: 'Fixing missing parts right now (iPhone)',
    intro:
      'If something is missing on the phone and you do not want to wait for the list, you can send the missing shaders to the phone yourself from your Mac. Connect the phone, unlock it, and run this from the project folder:',
    bullets: [
      "`--work` is the work folder of your build (`XCX_build` in the project's top folder unless you picked another).",
      "`<id>` is the phone's id from `xcrun devicectl list devices`.",
      "`<bundle id>` is the app's name on the phone. An app you installed with your own Apple ID has your team in it, like `org.xcnative.xcx.<team>`. The install step prints it. Without the right one the tool cannot find the app.",
    ],
    after:
      'Restart the game afterwards. It picks up the new shaders when it starts. Later builds include them as well. If you have not installed Apple\'s Metal Toolchain, the tool still works, and the phone prepares the shaders a little later. You can install the toolchain with:',
  },
  questions: {
    title: 'Questions',
    items: [
      {
        q: 'Is this legal and safe?',
        a: [
          'The list holds identifiers only, never game files. You still need your own copy of the game, and every build is made from it. Look at the file before sending it if you like.',
        ],
      },
      {
        q: 'Do I need a GitHub account?',
        a: ['Yes, a free one. It is how you attach the file. The account must be at least a week old.'],
      },
      {
        q: 'Why was my share not added?',
        a: [
          'The automatic check leaves a comment that says why, and usually closes the issue. The rules are:',
        ],
        bullets: [
          'The account is less than 7 days old. This keeps spam out. Send it again when the account is a week old.',
          'You already shared today. One share per account per day (a day ends at midnight UTC, which may not match your local time). This issue stays open. Edit it tomorrow and it will be added.',
          'It has more than 2,000 new shaders. Split it into smaller parts over several days.',
          'The issue was already added on an earlier day. An issue can only add shaders on the day it was first added. Open a new issue to share more.',
        ],
        afterBullets: [
          'If many people share at once, you may be asked to edit the issue (any small change) to try again.',
          'Two other comments are not mistakes. "Nothing new" means every shader in your file was already on the list. "No shaders were found" means the file did not come with the issue. Drag the file into the form.',
        ],
      },
      {
        q: 'Does it work for both game versions?',
        a: [
          'Yes, 1.0.1 and 2.0.0. The list holds shaders of both, and a build uses only the ones that belong to its version. Pick the version you played in the form.',
        ],
      },
      {
        q: "What if I don't want to share?",
        a: [
          'That is fine. Everything works without it. Choose "Never" on the Mac, or ignore the file. You still get everything others have shared.',
        ],
      },
    ],
  },
}

// Landing-page highlight
export const SHARE_HIGHLIGHT = {
  eyebrow: 'Help fill in the picture',
  title: 'Share the shaders you meet',
  points: [
    'An iPhone can only use the shaders prepared when the app was built, and nobody has played every corner of the game. If one is missing, the game skips that part of the picture.',
    'You share only a small text file of fingerprints. No game files, no saves, no personal information.',
    "Once the shaders are on the shared list, everyone's next build prepares them in advance.",
  ],
}
