# Ops Flow AI — an interactive operations-first assistant

A polished **React + Vite + Tailwind CSS + Framer Motion + lucide-react** front-end prototype. No backend, accounts, API keys or real AI charges.

## Running it on your computer

1. Download Node.js 20.19+ or 22.12+ (https://nodejs.org/).
2. Open this extracted project folder in Visual Studio Code.
3. Open **Terminal → New Terminal**.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL shown in the terminal (usually http://localhost:5173).
6. To check the production build: `npm run build` then `npm run preview`.

## GitHub Pages

See **DEPLOY_TO_GITHUB_PAGES.md** for guided steps. Included `.github/workflows/deploy.yml` automatically installs packages, builds, and publishes the `dist` directory. Choose **GitHub Actions** in repository Settings → Pages.

## What you can try

- On the landing page, click **Watch demo**, **Get started**, **Explore** or toggle the theme.
- **New chat**, search, pin, rename or delete chats; right-click chat to see the menu.
- Type “Java test on Friday, Report due Monday, Gym 4x this week” to generate a realistic task draft. **Approve**, **Edit** or **Reject** it.
- Type “Give me a Java quiz” for a real interactive **10-question** MCQ / true–false / fill-in quiz. Answers update concept mastery in the right panel.
- Type “Turn meeting notes into a workflow” to see dependencies.
- Draw in the **Doodle pad** (pen, colours, eraser, undo, clear) then convert to a sample workflow.
- Try a **PDF/Word/text attachment** or **photo**: only the name/type is stored. The assistant will NOT read the contents.
- **Camera** requests permission, previews the real device camera (on localhost/HTTPS), and attaches a simulated photo chip. No image is uploaded.
- **Microphone** toggles a simulated recording indicator; it doesn't capture or transcribe audio.
- Open **Study toolkit** in the Education progress panel: add subjects, reorder and tick topics, start/pause/reset a per-topic focus timer.
- View Education mastery, Work task completion, Fitness streak, Finance example budget, and Mental support mood chart.
- Settings: theme, mode, life areas, reduce motion, profile, delete/reset local data.

### Important prototype boundaries

**No real AI or external processing.** `src/utils/engine.js` contains rule-based example responses. Approving a plan stores tasks and reminder flags in **localStorage on this device**; it does not schedule OS background notifications, send emails, sync across devices or create real calendar reminders. Sensitive-topic keyword handling displays a support dialog and does not store the triggering text. This is a UX safeguard, **not** a comprehensive safety system. The help link points to https://findahelpline.com/. Finance, mental health and habit suggestions are general guidance only.

### Beginner-friendly source tree

```text
ops-flow-ai/
├── .github/workflows/deploy.yml  # automated GitHub Pages publishing
├── public/favicon.svg           # app icon
├── index.html                   # Vite web entry
├── package.json                 # dependencies and scripts
├── vite.config.js               # relative assets for Pages subfolders
├── tailwind.config.js           # design tokens
├── postcss.config.js            # Tailwind processing
├── .gitignore
├── DEPLOY_TO_GITHUB_PAGES.md
├── README.md
└── src/
    ├── main.jsx                # mounts React
    ├── App.jsx                 # UI state, simulated behavior
    ├── pages/
    │   ├── LandingPage.jsx     # public marketing site
    │   └── AppShell.jsx        # responsive application shell
    ├── components/
    │   ├── AreaArt.jsx         # SVG life-area doodles
    │   ├── Logo.jsx
    │   ├── Modal.jsx
    │   ├── Sidebar.jsx         # search and chat actions
    │   ├── ChatPanel.jsx       # message area + controls
    │   ├── ChatMessage.jsx     # task drafts, workflow steps
    │   ├── Composer.jsx        # attachments and input tools
    │   ├── QuizCard.jsx        # timed interactive quiz
    │   ├── ProgressPanel.jsx   # area-specific analytics
    │   ├── StudyToolkit.jsx    # custom subjects, checklists, elapsed timer
    │   ├── DoodlePad.jsx       # HTML canvas tools
    │   ├── CameraModal.jsx     # permissioned camera preview
    │   └── SettingsModal.jsx   # settings and data reset
    ├── data/mockData.js         # six chats, sample plan, ten questions
    ├── utils/
    │   ├── engine.js           # simulated AI & crisis keywords
    │   └── storage.js          # browser localStorage helpers
    └── styles/index.css        # Tailwind + custom styles
```

## 5 future backend integration points

1. **Chat replies** → `src/utils/engine.js` `generateReply()` — replace with a secure server-side AI endpoint; never expose secret API keys in Vite client code.
2. **Plan generation** → `src/utils/engine.js` `generateReply()` plan branch, and `src/App.jsx` `approve()` — generate validated structured tasks on server and create approved database records.
3. **Quiz generation and results** → `src/data/mockData.js` `JAVA_QUESTIONS` and `src/components/QuizCard.jsx` — generate questions, save answers and mastery per account.
4. **File/photo uploads** → `src/components/Composer.jsx` / `CameraModal.jsx` — upload with authenticated signed URLs and validate file types/sizes server-side.
5. **Reminders** → `src/App.jsx` `approve()` and the `ProgressPanel.jsx` Today section — server-side scheduler, push/email/calendar integration and user time zones.

## Developer notes

- All interactions run on the client; localStorage is not suitable for sensitive or regulated data.
- Persistent chat messages are *mock* examples. The app has no actual sign-in; Sign in opens the demo.
- No real speech-to-text or drawing-recognition model is wired up yet.
- GitHub Pages is a static host. Real AI, storage, scheduled reminders and authentication require a separately hosted backend.
