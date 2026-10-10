# Ops Flow AI — Complete Source Code

The actual editable files are in their respective folders. This is a single-file reading copy of all project source and configuration files.

---

## `.github/workflows/deploy.yml`

```yaml
name: Deploy Ops Flow AI to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: github-pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
      - name: Install packages
        run: npm install --no-audit --no-fund
      - name: Build Vite site
        run: npm run build
      - name: Configure Pages
        uses: actions/configure-pages@v5
      - name: Upload built site
        uses: actions/upload-pages-artifact@v4
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Publish
        id: deployment
        uses: actions/deploy-pages@v4

```

---

## `.gitignore`

```text
node_modules/
dist/
.DS_Store
.env
.env.*
!.env.example

```

---

## `DEPLOY_TO_GITHUB_PAGES.md`

```markdown
# Publish Ops Flow AI on GitHub Pages — beginner steps

## What you have

This ZIP contains the **source code**, not just an HTML file. The included GitHub Actions workflow installs dependencies, builds the React app, and publishes it for free using GitHub Pages. You DO NOT upload the ZIP as one file to GitHub — extract it first. GitHub Pages cannot run Vite directly without a build.

## Method A: GitHub Desktop (easiest / recommended)

**1. Prepare your computer**
- Download this project's ZIP and right-click **Extract All**.
- Make a free GitHub account at https://github.com/.
- Download **GitHub Desktop** from https://desktop.github.com/ and sign in.

**2. Create a repository from your extracted folder**
- Open GitHub Desktop → **File → Add local repository**.
- Choose the extracted `ops-flow-ai` folder. If prompted that it isn't a Git repository, choose **create a repository here**.
- Repository name: `ops-flow-ai`. Initialize it and confirm.
- GitHub Desktop should show files including `.github/workflows/deploy.yml`. This file matters: it tells GitHub how to build the site. `node_modules` should not be included.
- In the bottom-left commit box, enter `Add Ops Flow AI prototype`, then **Commit to main**.
- Click **Publish repository**, choose **Public** if using GitHub Free, and publish.

**3. Enable Pages**
- In your web browser, open https://github.com/YOUR-USERNAME/ops-flow-ai (replace YOUR-USERNAME).
- Click **Settings** (top of repository) → **Pages** (left sidebar).
- Under **Build and deployment** choose **Source: GitHub Actions**. Because `.github/workflows/deploy.yml` is included, you do not need to create another workflow.
- Open the **Actions** tab. You should see `Deploy Ops Flow AI to GitHub Pages` running (if not, select the workflow and click **Run workflow**, branch `main`).
- After the workflow completes successfully, the URL is typically: `https://YOUR-USERNAME.github.io/ops-flow-ai/`.
- If the URL gives 404 immediately, check **Actions** again and revisit Settings → Pages to find the published address.

## Method B: Upload via GitHub website

1. Create a **Public** repository called `ops-flow-ai` in GitHub, optionally adding a README.
2. Extract the ZIP. Use **Add file → Upload files** and drag the project content, preserving the `src/` and `public/` folder structure. Some browsers or GitHub upload interfaces do not preserve folders reliably. If yours does not, use Method A.
3. The hidden `.github` folder can be easy to miss on Windows! Confirm that `.github/workflows/deploy.yml` exists in the repository. If missing, use **Add file → Create new file**, type `.github/workflows/deploy.yml` as the filename, paste the contents from your extracted copy, and **Commit changes**.
4. In Settings → Pages select **GitHub Actions**.
5. In the Actions tab let the included workflow finish or manually select **Run workflow**. Visit the printed Pages URL.

## Test on your own computer

Install Node.js version **22.12+** from https://nodejs.org/.

```bash
cd ops-flow-ai
npm install
npm run dev
```

Open the localhost URL shown. To test a production build:

```bash
npm run build
npm run preview
```

## When you make changes

Edit the source files, commit, push to `main`. GitHub automatically rebuilds and redeploys. The Vite config uses `base: './'` so the app works at `/ops-flow-ai/` and other repository subpaths without manual edits.

## Common problems

- **Blank site:** confirm you picked **GitHub Actions**, not `Deploy from a branch`. Vite source must be built first.
- **404:** wait until the deployment completes; check the repository name and the full `/ops-flow-ai/` address.
- **Workflow not visible:** make sure `.github/workflows/deploy.yml` made it into the repository.
- **npm install failed:** check the Actions logs and package names in `package.json`. GitHub's runner needs internet access to npm.
- **Camera unavailable:** use HTTPS/localhost and grant camera permission; GitHub Pages is HTTPS.
- **Changes seem missing:** refresh with Ctrl+Shift+R and confirm you pushed the edits.
- **Chats missing on another phone:** this demo stores data only in each browser; it does not sync.

## Privacy / limitations

This is a public demo with local mock data. Do not enter personal medical or banking details. GitHub Pages cannot run a backend, secret AI API key, persistent cloud database, or automatic background task scheduler. To add those later, build a separately hosted API and store secrets on the server.

```

---

## `README.md`

```markdown
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

```

---

## `TESTING_NOTES.md`

```markdown
# Testing notes and acceptance checklist

Validated in the creation environment:
- Parsed every `src/**/*.js` and `src/**/*.jsx` file with the TypeScript/JSX parser (no syntax diagnostics).
- Checked relative source imports point to existing files.
- Executed simulated planner responses in Node.js for multi-area planning, Java quiz, workflows and finance.
- Verified six seeded recent chats, ten quiz questions, and crisis keyword flagging.
- Verified `.github/workflows/deploy.yml` exists and package layout is complete.

**Not verified in this environment:** npm package download and Vite production compilation, because this execution environment had no DNS access to the public npm registry. Therefore no claim is made that the production build has run locally. The included GitHub Actions workflow will run `npm install` and `npm run build`; its green success status is the definitive build verification after you publish the repository.

## Manual click-through after deployment

1. Landing: theme toggle, anchor links, demo modal, life-area Explore and Get started.
2. App: new chat, search, pin, rename, delete; send chat and view simulated typing.
3. Planning: submit `Java test Friday, report due Monday, gym 4x this week`, edit, approve, and verify tracker updates; create another draft and reject.
4. Education: click Study toolkit, create subject/topic, move topic up/down, check a topic, start and pause timer.
5. Quiz: type `Give me a Java quiz`, answer 10 questions, review mistakes, see mastery bars change.
6. Visual tools: upload mock attachment, camera preview (HTTPS + permission), doodle (draw, erase, undo, convert), mock microphone toggle.
7. Trackers: view Work, Fitness, Finance, Mental support; click mood faces; mark or delete today's task.
8. Safety: enter a phrase such as `I want to die` and confirm the support dialog appears without submitting it to the assistant. The external helpline button opens a new tab.
9. Settings: modify profile, mode, life areas, light theme, reduce-motion, save, then exercise Delete my data confirmation.
10. Responsive: desktop (>1250px), tablet (761–1250px), phone (<761px) and both side drawers.

```

---

## `index.html`

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0B1020" />
  <meta name="description" content="Ops Flow AI — turn instructions into actionable, trackable plans. Front-end prototype." />
  <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <title>Ops Flow AI — From intent to impact</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./src/main.jsx"></script>
</body>
</html>

```

---

## `package.json`

```json
{
  "name": "ops-flow-ai",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0"
  },
  "dependencies": {
    "framer-motion": "^11.18.2",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.7"
  }
}

```

---

## `postcss.config.js`

```javascript
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };

```

---

## `public/favicon.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="#111931"/><defs><linearGradient id="g"><stop stop-color="#7C5CFF"/><stop offset="1" stop-color="#22D3EE"/></linearGradient></defs><path d="M21 22h22M21 22v20h22" fill="none" stroke="url(#g)" stroke-width="5" stroke-linecap="round"/><circle cx="21" cy="22" r="6" fill="#7C5CFF"/><circle cx="21" cy="42" r="6" fill="#22D3EE"/><path d="m36 35 8 7-8 7" fill="none" stroke="#E6EAF5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>

```

---

## `src/App.jsx`

```jsx
import React,{useEffect,useRef,useState} from 'react';
import { AnimatePresence } from 'framer-motion';
import { AlertTriangle, LifeBuoy, CheckCircle2, ExternalLink, Plus, ShieldCheck } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import AppShell from './pages/AppShell';
import DoodlePad from './components/DoodlePad';
import CameraModal from './components/CameraModal';
import SettingsModal from './components/SettingsModal';
import Modal from './components/Modal';
import { makeInitialState } from './data/mockData';
import { uid, generateReply, detectArea, isCrisis, today } from './utils/engine';
import { loadState, saveState, clearState } from './utils/storage';

export default function App(){
  const [state,setState]=useState(()=>{const stored=loadState();return stored?{...makeInitialState(),...stored,studyTimer:null}:makeInitialState();});
  const [screen,setScreen]=useState('landing');
  const [thinking,setThinking]=useState(false),[attachment,setAttachment]=useState(null);
  const [settingsOpen,setSettingsOpen]=useState(false),[cameraOpen,setCameraOpen]=useState(false),[doodleOpen,setDoodleOpen]=useState(false);
  const [safetyOpen,setSafetyOpen]=useState(false),[editId,setEditId]=useState(null),[editItems,setEditItems]=useState([]);
  const [toast,setToast]=useState('');
  const mounted=useRef(true);
  // Timer ticks once a second only while the website is open. Progress is stored locally.
  useEffect(()=>{const id=setInterval(()=>setState(s=>{const t=s.studyTimer;if(!t)return s;return {...s,studySubjects:s.studySubjects.map(subject=>subject.id!==t.subjectId?subject:{...subject,topics:subject.topics.map(topic=>topic.id!==t.topicId?topic:{...topic,seconds:topic.seconds+1})})};}),1000);return()=>clearInterval(id);},[]);
  useEffect(()=>{document.documentElement.classList.toggle('light',state.theme==='light');document.documentElement.classList.toggle('reduce-motion',!!state.settings.reducedMotion);saveState(state);},[state]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),3400);return()=>clearTimeout(t);},[toast]);
  useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;};},[]);
  const patch=(values)=>setState(s=>({...s,...values}));
  const notify=(value)=>setToast(value);
  const active=state.conversations.find(c=>c.id===state.activeId);
  const newChat=(area='Education')=>{const id=uid();setState(s=>({...s,activeId:id,conversations:[{id,title:'New conversation',area,updated:Date.now(),pinned:false,messages:[]},...s.conversations]}));return id;};
  const start=(area)=>{setScreen('app');if(typeof area==='string'&&area){const target=state.conversations.find(c=>c.area===area);if(target)patch({activeId:target.id});else newChat(area);}else if(!state.activeId)newChat();};
  const updateChat=(id,transform)=>setState(s=>({...s,conversations:s.conversations.map(c=>c.id===id?transform(c):c)}));
  const updateMessage=(messageId,changes)=>{const cid=state.activeId;updateChat(cid,c=>({...c,messages:c.messages.map(m=>m.id===messageId?{...m,...changes}:m)}));};
  const send=(input)=>{
    const content=String(input||'').trim();if(!content&&!attachment)return;
    // Privacy-first crisis screen: do not submit or store distress messages.
    if(isCrisis(content)){setSafetyOpen(true);setAttachment(null);return;}
    if(thinking)return;
    const cid=state.activeId||newChat();
    const base=state.conversations.find(c=>c.id===cid);
    const area=detectArea(content,base?.area||'Education');
    const msg={id:uid(),role:'user',text:attachment?`${content}\n📎 ${attachment.name} (mock local attachment)`:content};
    setAttachment(null);
    updateChat(cid,c=>({...c,area,title:c.title==='New conversation'?content.slice(0,44):c.title,updated:Date.now(),messages:[...c.messages,msg]}));
    setThinking(true);
    const duration=state.speed==='Fast'?680:state.speed==='Deep'?2350:1300;
    setTimeout(()=>{if(!mounted.current)return;const reply=generateReply(content,area,state.speed);updateChat(cid,c=>({...c,messages:[...c.messages,{id:uid(),role:'ai',...reply}],updated:Date.now()}));setThinking(false);},duration);
  };
  const approve=(id)=>{
    const message=active?.messages.find(m=>m.id===id);if(!message||message.status)return;
    const existing=state.tasks;
    const adds=(message.items||[]).map(item=>({...item,id:uid(),done:false,reminder:true}));
    setState(s=>({...s,tasks:[...s.tasks,...adds],notificationLog:[...s.notificationLog,{id:uid(),title:'Plan approved',date:Date.now(),count:adds.length}],conversations:s.conversations.map(c=>c.id===s.activeId?{...c,messages:c.messages.map(m=>m.id===id?{...m,status:'approved'}:m)}:c)}));
    notify(`✓ ${adds.length} tasks and browser-local reminders created`);
  };
  const reject=(id)=>{updateMessage(id,{status:'rejected'});notify('Draft rejected; no tasks were added');};
  const edit=(id)=>{const msg=active?.messages.find(m=>m.id===id);if(!msg||msg.status)return;setEditId(id);setEditItems((msg.items||[]).map(item=>({...item})));};
  const saveEdit=()=>{updateMessage(editId,{items:editItems.filter(i=>i.title.trim())});setEditId(null);notify('Draft updated; review and approve when ready');};
  const changeMastery=(concept,correct)=>setState(s=>({...s,mastery:{...s.mastery,[concept]:Math.max(0,Math.min(100,(s.mastery[concept]||0)+(correct?7:-2)))}}));
  const toggleTask=(id)=>{setState(s=>({...s,tasks:s.tasks.map(t=>t.id===id?{...t,done:!t.done}:t)}));};
  const deleteTask=(id)=>{setState(s=>({...s,tasks:s.tasks.filter(t=>t.id!==id)}));notify('Task deleted');};
  const addSubject=(name)=>{const id=uid();setState(s=>({...s,studySubjects:[...s.studySubjects,{id,name,topics:[]}]}));notify('Subject added');return id;};
  const addTopic=(subjectId,title)=>setState(s=>({...s,studySubjects:s.studySubjects.map(sub=>sub.id!==subjectId?sub:{...sub,topics:[...sub.topics,{id:uid(),title,done:false,seconds:0}]})}));
  const toggleTopic=(subjectId,topicId)=>setState(s=>({...s,studySubjects:s.studySubjects.map(sub=>sub.id!==subjectId?sub:{...sub,topics:sub.topics.map(t=>t.id===topicId?{...t,done:!t.done}:t)})}));
  const moveTopic=(subjectId,topicId,direction)=>setState(s=>({...s,studySubjects:s.studySubjects.map(sub=>{if(sub.id!==subjectId)return sub;const list=[...sub.topics],i=list.findIndex(t=>t.id===topicId),j=i+direction;if(i<0||j<0||j>=list.length)return sub;[list[i],list[j]]=[list[j],list[i]];return {...sub,topics:list};})}));
  const startPause=(subjectId,topicId)=>setState(s=>({...s,studyTimer:s.studyTimer?.subjectId===subjectId&&s.studyTimer?.topicId===topicId?null:{subjectId,topicId}}));
  const resetTime=(subjectId,topicId)=>setState(s=>({...s,studyTimer:s.studyTimer?.subjectId===subjectId&&s.studyTimer?.topicId===topicId?null:s.studyTimer,studySubjects:s.studySubjects.map(sub=>sub.id!==subjectId?sub:{...sub,topics:sub.topics.map(t=>t.id===topicId?{...t,seconds:0}:t)})}));
  const resetData=()=>{clearState();const fresh=makeInitialState();setState({...fresh,conversations:[{id:'new-empty',title:'New conversation',area:'Education',updated:Date.now(),pinned:false,messages:[]}],activeId:'new-empty',tasks:[],mastery:{Variables:0,Loops:0,Arrays:0,OOP:0},moodHistory:[3,3,3,3,3,3,3],profile:{name:'',goal:'',hours:'',mode:'General'},budget:{spent:0,total:30000},studySubjects:[],studyTimer:null});notify('Saved demo data erased from this browser');};
  return <>
    {screen==='landing'?<LandingPage theme={state.theme} onTheme={()=>patch({theme:state.theme==='dark'?'light':'dark'})} onStart={start}/>:<AppShell state={state} thinking={thinking} attachment={attachment} onAttachment={setAttachment} onClearAttachment={()=>setAttachment(null)} onHome={()=>setScreen('landing')} onSelectChat={id=>patch({activeId:id})} onNewChat={newChat} onRenameChat={(id,title)=>updateChat(id,c=>({...c,title:title.trim()||c.title}))} onPinChat={id=>updateChat(id,c=>({...c,pinned:!c.pinned}))} onDeleteChat={id=>setState(s=>{const conversations=s.conversations.filter(c=>c.id!==id);return {...s,conversations,activeId:s.activeId===id?conversations[0]?.id||null:s.activeId};})} onMode={mode=>patch({mode})} onSpeed={speed=>patch({speed})} onTheme={()=>patch({theme:state.theme==='dark'?'light':'dark'})} onOpenSettings={()=>setSettingsOpen(true)} onCamera={()=>setCameraOpen(true)} onDoodle={()=>setDoodleOpen(true)} onSend={send} onApprove={approve} onReject={reject} onEdit={edit} onMastery={changeMastery} onMood={mood=>{setState(s=>({...s,moodHistory:[...s.moodHistory.slice(-6),mood]}));notify('Mood check-in recorded locally');}} onToggleTask={toggleTask} onDeleteTask={deleteTask} onAddSubject={addSubject} onAddTopic={addTopic} onToggleTopic={toggleTopic} onMoveTopic={moveTopic} onStartPause={startPause} onResetTime={resetTime}/>}
    {settingsOpen&&<SettingsModal state={state} onClose={()=>setSettingsOpen(false)} onSave={settings=>{setState(s=>({...s,...settings}));notify('Preferences updated');}} onReset={resetData}/>}
    {cameraOpen&&<CameraModal onClose={()=>setCameraOpen(false)} onCapture={data=>{setAttachment(data);setCameraOpen(false);notify('Mock photo attached to your next message');}}/>}
    {doodleOpen&&<DoodlePad onClose={()=>setDoodleOpen(false)} onConvert={instructions=>{setDoodleOpen(false);send(`${instructions}. Show process steps and dependencies.`);}}/>}
    {editId&&<Modal title="Edit your draft plan" onClose={()=>setEditId(null)} wide><p className="text-sm muted mb-4">Change a title, deadline, estimate or priority before you approve. These are still only draft tasks.</p><div className="space-y-3">{editItems.map((item,i)=><div className="raised rounded-2xl p-3" key={i}><div className="grid sm:grid-cols-[1fr_155px] gap-3"><label className="text-[11px] muted">Task title<input className="field mt-1 text-sm" value={item.title} onChange={e=>setEditItems(a=>a.map((v,j)=>j===i?{...v,title:e.target.value}:v))}/></label><label className="text-[11px] muted">Deadline<input className="field mt-1 text-sm" type="date" value={item.due} onChange={e=>setEditItems(a=>a.map((v,j)=>j===i?{...v,due:e.target.value}:v))}/></label></div><div className="grid grid-cols-2 gap-3 mt-3"><label className="text-[11px] muted">Priority<select className="field mt-1 text-sm" value={item.priority} onChange={e=>setEditItems(a=>a.map((v,j)=>j===i?{...v,priority:e.target.value}:v))}>{['High','Medium','Low'].map(p=><option key={p}>{p}</option>)}</select></label><label className="text-[11px] muted">Estimate (min)<input className="field mt-1 text-sm" type="number" min="5" max="480" value={item.minutes} onChange={e=>setEditItems(a=>a.map((v,j)=>j===i?{...v,minutes:Number(e.target.value)}:v))}/></label></div><button className="text-xs text-rose mt-2" onClick={()=>setEditItems(a=>a.filter((_,j)=>j!==i))}>Remove step</button></div>)}</div><div className="flex justify-between mt-4"><button className="btn btn-quiet btn-small" onClick={()=>setEditItems(a=>[...a,{title:'New action step',due:today(),minutes:30,priority:'Medium',area:active?.area||'Work'}])}><Plus size={14}/> Add step</button><button className="btn btn-primary" onClick={saveEdit}>Save draft changes</button></div></Modal>}
    {safetyOpen&&<div className="modal-backdrop" role="presentation"><section role="alertdialog" aria-modal="true" aria-label="Support and safety" className="modal-panel p-6 max-w-[650px]"><div className="w-14 h-14 rounded-2xl bg-violet/15 grid place-items-center mb-5"><LifeBuoy className="text-violet" size={28}/></div><p className="eyebrow">YOU MATTER · SUPPORT IS AVAILABLE</p><h2 className="font-display text-2xl font-bold">You don't have to handle this alone.</h2><p className="text-sm leading-8 muted">I'm sorry you're carrying this. You don't have to handle it alone. Please reach out to someone you trust or a local helpline now.</p><p className="safe-note text-xs mb-5">If you're in immediate danger, contact your local emergency service now. This prototype cannot provide emergency assistance.</p><div className="flex flex-wrap gap-3"><a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary"><LifeBuoy size={17}/> Find a helpline near you <ExternalLink size={14}/></a><button className="btn btn-quiet" onClick={()=>setSafetyOpen(false)}>Dismiss support card</button></div><p className="text-xs muted mt-4 mb-0">Your message was not processed or stored by this prototype.</p></section></div>}
    {toast&&<div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] glass rounded-xl px-4 py-3 text-xs font-semibold shadow-xl flex items-center gap-2 max-w-[90vw]" role="status"><CheckCircle2 size={17} className="text-emerald"/> {toast}</div>}
  </>;
}

```

---

## `src/components/AreaArt.jsx`

```jsx
import React from 'react';
import { BookOpen, BriefcaseBusiness, Dumbbell, HeartPulse, Rocket, Wallet, SunMedium, Sparkles } from 'lucide-react';
const icons={Education:BookOpen,Work:BriefcaseBusiness,Fitness:Dumbbell,'Health habits':HeartPulse,Motivation:Rocket,Finance:Wallet,'Mental support':SunMedium,'Personal life':Sparkles};
// Friendly line-art illustrations, built as SVG so there are no missing assets.
export default function AreaArt({area,color='#7C5CFF',size=72}){
  const Icon=icons[area]||Sparkles;
  return <div style={{width:size+30,height:size+16,position:'relative'}} aria-hidden="true">
    <svg viewBox="0 0 130 110" width="100%" height="100%"><path d="M16 60C5 25 32 7 62 13c27-16 54 10 53 33 13 24-2 51-36 52C36 105 16 90 16 60Z" fill={color} opacity=".14"/><path d="M18 27l5-5m-3 13-8-1m92 50 8 3m-5-11 5-5" stroke={color} strokeWidth="3" strokeLinecap="round"/><path d="M26 89q8 8 17 1" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 5"/></svg>
    <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',color}}><Icon size={size*.65} strokeWidth={1.6}/></div>
  </div>;
}

```

---

## `src/components/CameraModal.jsx`

```jsx
import React,{useEffect,useRef,useState} from 'react';
import { Camera, CameraOff, ImagePlus } from 'lucide-react';
import Modal from './Modal';
export default function CameraModal({onClose,onCapture}){
  const video=useRef(null),stream=useRef(null),[error,setError]=useState(''),[ready,setReady]=useState(false),[captured,setCaptured]=useState(false);
  useEffect(()=>{let active=true;async function open(){try{if(!navigator.mediaDevices?.getUserMedia)throw Error('Camera access is not available here.');const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false});if(!active){s.getTracks().forEach(t=>t.stop());return;}stream.current=s;if(video.current){video.current.srcObject=s;video.current.play().catch(()=>{});}setReady(true);}catch(e){setError('Camera unavailable or permission denied. You can still use Upload photo in the composer.');}}open();return()=>{active=false;stream.current?.getTracks().forEach(t=>t.stop());};},[]);
  return <Modal title="Capture a photo" onClose={onClose}><p className="text-xs muted mb-4">Camera images stay in this browser. The prototype only adds a mock photo chip.</p><div className="aspect-video rounded-2xl overflow-hidden bg-black/50 grid place-items-center">{!error?<video className="w-full h-full object-cover" ref={video} playsInline autoPlay muted aria-label="Camera preview"/>:<div className="text-center p-4"><CameraOff size={36} className="mx-auto mb-2 muted"/><p className="text-sm muted">{error}</p></div>}</div>{captured?<p className="safe-note mt-4">Mock photo successfully attached to your next chat message.</p>:null}<button disabled={!ready} className="btn btn-primary w-full mt-4" onClick={()=>{setCaptured(true);onCapture({name:`Camera photo · ${new Date().toLocaleTimeString()}.jpg`,type:'image/jpeg',size:0});}}><Camera size={17}/> Capture & attach photo</button></Modal>;
}

```

---

## `src/components/ChatMessage.jsx`

```jsx
import React,{useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, CalendarDays, Clock3, ArrowRight, Check, X, Pencil, Bell, BadgeCheck, ShieldCheck } from 'lucide-react';
import { fmtDate } from '../utils/engine';
import QuizCard from './QuizCard';
export default function ChatMessage({message,onApprove,onReject,onEdit,onMastery,reduceMotion}){
  const [explain,setExplain]=useState(false),m=message;
  if(m.role==='user')return <motion.div initial={reduceMotion?false:{opacity:0,x:18}} animate={{opacity:1,x:0}} className="flex justify-end my-5"><div className="chat-bubble-user text-[13px] leading-6 whitespace-pre-wrap">{m.text}</div></motion.div>;
  return <motion.div initial={reduceMotion?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} className="flex items-start gap-3 my-5"><div className="w-8 h-8 gradient-bg rounded-xl shrink-0 grid place-items-center mt-1"><Sparkles size={15}/></div><div className="chat-bubble-ai text-sm min-w-0"><p className="text-[11px] text-violet font-bold flex items-center gap-2 mb-2">OPS FLOW AI <span className="font-normal muted">· simulated response</span></p><p className="leading-7 text-[13px] mb-0 whitespace-pre-wrap">{m.text}</p>
    {m.kind==='plan'&&<div className="mt-4"><div className="flex justify-between items-center gap-3 mb-3"><b className="font-display">Draft plan</b><span className="tag">{m.items?.length||0} tasks</span></div><div className="grid gap-2">{m.items?.map((t,i)=><motion.div layout key={i} className="task-mini flex gap-2 items-start"><div className="w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded-lg bg-violet/10 text-violet">{i+1}</div><div className="flex-1 min-w-0"><p className="text-xs font-semibold mb-2">{t.title}</p><div className="flex flex-wrap items-center gap-2 text-[10px] muted"><span className="inline-flex items-center gap-1"><CalendarDays size={11}/>{fmtDate(t.due)}</span><span className="inline-flex items-center gap-1"><Clock3 size={11}/>{t.minutes} min</span><span className="tag !text-[10px] !py-[2px]" style={{color:t.priority==='High'?'#FDA4AF':'var(--muted)'}}>{t.priority}</span></div></div></motion.div>)}</div>
      {!m.status?<div className="flex flex-wrap gap-2 mt-4"><button className="btn btn-small text-white" style={{background:'#059669'}} onClick={()=>onApprove(m.id)}><Check size={15}/> Approve plan</button><button className="btn btn-quiet btn-small" onClick={()=>onEdit(m.id)}><Pencil size={14}/> Edit</button><button className="btn btn-small !text-rose" style={{border:'1px solid rgba(244,63,94,.4)'}} onClick={()=>onReject(m.id)}><X size={14}/> Reject</button></div>:<div className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold mt-3 ${m.status==='approved'?'bg-emerald/10 text-emerald':'bg-rose/10 text-rose'}`}>{m.status==='approved'?<BadgeCheck size={17}/>:<X size={15}/>} {m.status==='approved'?'Saved and reminders set in this browser':'Draft rejected — nothing was saved'}</div>}
      <button className="flex items-center gap-2 text-[11px] muted font-bold mt-4" onClick={()=>setExplain(!explain)} aria-expanded={explain}><ChevronDown size={14} className={explain?'rotate-180':''}/> Why this order?</button>{explain&&<p className="text-xs muted mt-2 leading-6 mb-0">Foundational steps come first, followed by hands-on practise and a final review. Time estimates and deadlines are sample suggestions; you can edit them before approval.</p>}
    </div>}
    {m.kind==='workflow'&&<div className="mt-4"><div className="flex flex-wrap gap-5">{m.steps?.map((s,i)=><div className="work-step raised rounded-xl p-3" key={i}><span className="text-[10px] text-violet font-bold">STEP {i+1}{i?' · after previous':''}</span><p className="text-xs font-bold mt-2 mb-1">{s.name}</p><p className="text-[11px] muted mb-0 leading-5">{s.detail}</p></div>)}</div><p className="text-[11px] muted mt-3 mb-0">Dependencies: complete the previous step before the next one.</p></div>}
    {m.kind==='quiz'&&<QuizCard questions={m.questions} onMastery={onMastery}/>}
    {m.note&&<p className="safe-note mt-3 mb-0 flex items-start gap-2"><ShieldCheck size={16} className="shrink-0 mt-[1px]"/> {m.note}</p>}
  </div></motion.div>;
}

```

---

## `src/components/ChatPanel.jsx`

```jsx
import React,{useEffect,useRef,useState} from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Menu, ChartNoAxesCombined, ChevronDown, Settings, Moon, Sun, UserRound, ChevronsUpDown, LogOut, Clock3 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import Composer from './Composer';
const suggestions=[['Plan my exam week','Education'],['Build a workout plan','Fitness'],['Make a monthly budget','Finance'],['Turn meeting notes into tasks','Work']];
const speeds=[['Fast','~1s'],['Balanced','~2s'],['Deep','~3s']];
export default function ChatPanel({chat,area,mode,speed,theme,profile,messages,thinking,onMode,onSpeed,onTheme,onSend,onOpenSettings,onHome,onOpenLeft,onOpenRight,onApprove,onEdit,onReject,onMastery,onCamera,onDoodle,attachment,onAttachment,onClearAttachment,reduceMotion}){
  const bottom=useRef(null),[profileOpen,setProfileOpen]=useState(false);
  useEffect(()=>{bottom.current?.scrollIntoView({behavior:reduceMotion?'instant':'smooth',block:'end'});},[messages.length,thinking,reduceMotion,chat?.id]);
  return <section className="app-chat" aria-label="AI assistant chat">
    <header className="px-3 sm:px-5 py-3 border-b flex flex-col gap-2" style={{borderColor:'var(--line)'}}><div className="flex items-center gap-2 min-w-0">
      <button className="icon-btn md:hidden shrink-0" aria-label="Open recent chats" onClick={onOpenLeft}><Menu size={19}/></button><span className="tag !text-[11px] !text-violet border-violet/20 shrink-0"><Sparkles size={12}/>{area}</span><span className="font-display text-[14px] font-bold truncate flex-1">{chat?.title||'New conversation'}</span>
      <div className="relative flex items-center gap-2"><button className="icon-btn tablet-progress-button" onClick={onOpenRight} aria-label="Open progress tracker" title="Show progress"><ChartNoAxesCombined size={19}/></button><button className="icon-btn" onClick={()=>setProfileOpen(!profileOpen)} aria-label="Profile menu" title="Profile menu"><span className="w-8 h-8 grid place-items-center rounded-xl text-xs font-bold gradient-bg">{profile.name?.[0]?.toUpperCase()||'A'}</span></button>{profileOpen&&<div className="absolute z-30 right-0 top-11 glass rounded-2xl p-2 w-52 shadow-xl"><p className="text-xs font-bold px-2 py-2">Hi, {profile.name||'there'} 👋</p><button className="side-nav-item text-xs" onClick={()=>{onOpenSettings();setProfileOpen(false);}}><Settings size={14}/> Settings</button><button className="side-nav-item text-xs" onClick={()=>{onTheme();setProfileOpen(false);}}>{theme==='dark'?<Sun size={14}/>:<Moon size={14}/>} Switch theme</button><button className="side-nav-item text-xs" onClick={()=>{onHome();setProfileOpen(false);}}><LogOut size={14}/> Landing page</button></div>}</div>
    </div><div className="flex items-center justify-between gap-2 top-modes"><label className="flex items-center gap-2 text-[10px] muted shrink-0">MODE <select value={mode} onChange={e=>onMode(e.target.value)} aria-label="Assistant mode" className="bg-transparent border rounded-lg p-1 text-xs font-semibold" style={{borderColor:'var(--line)',color:'var(--text)'}}>{['Student','Employee','Manager','General'].map(s=><option key={s}>{s}</option>)}</select></label><div className="flex items-center gap-1 p-1 rounded-xl" style={{background:'var(--raised)'}} aria-label="Response speed">{speeds.map(([name,time])=><button key={name} onClick={()=>onSpeed(name)} aria-pressed={speed===name} className={`text-[10px] px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1 whitespace-nowrap ${speed===name?'gradient-bg font-bold':'muted'}`}>{name}<span className="opacity-70 hidden sm:inline">{time}</span></button>)}</div></div></header>
    <div className="messages-scroll soft-scroll"><div className="max-w-[850px] px-4 sm:px-6 mx-auto py-6 min-h-full flex flex-col">
      {messages.length===0?<motion.div initial={reduceMotion?false:{opacity:0,y:15}} animate={{opacity:1,y:0}} className="flex-1 flex flex-col justify-center items-center text-center pb-12"><div className="w-16 h-16 rounded-3xl gradient-bg grid place-items-center mb-5 shadow-xl shadow-violet/25"><Sparkles size={30}/></div><p className="eyebrow">YOUR NEXT BIG THING STARTS HERE</p><h2 className="font-display font-bold text-3xl sm:text-4xl max-w-[540px] leading-tight">What do you want to <span className="gradient-text">get done today?</span></h2><p className="muted text-sm max-w-md leading-7 mt-3 mb-7">Try a goal, a rough idea, or a pile of messy to-dos. I'll turn it into a draft you can review.</p><div className="grid sm:grid-cols-2 gap-3 w-full max-w-[540px]">{suggestions.map(([text,which])=><button key={text} className="surface rounded-xl text-xs font-semibold text-left p-4 lift flex justify-between items-center gap-2" onClick={()=>onSend(text)}><span>{text}</span><Sparkles size={15} className="text-violet shrink-0"/></button>)}</div></motion.div>:<>{messages.map(m=><ChatMessage key={m.id} message={m} onApprove={onApprove} onEdit={onEdit} onReject={onReject} onMastery={onMastery} reduceMotion={reduceMotion}/>)}</>}
      {thinking&&<div className="flex items-center gap-3 mt-3" role="status" aria-label="Assistant thinking"><span className="gradient-bg w-8 h-8 rounded-xl grid place-items-center"><Sparkles size={15}/></span><span className="glass rounded-2xl px-4 py-3 flex items-center gap-2"><span className="typing" aria-hidden="true"><span/><span/><span/></span><span className="text-xs muted">{speed==='Deep'?'Reasoning through steps':speed==='Fast'?'Creating a quick reply':'Building your draft'}...</span></span></div>}
      <div ref={bottom}/>
    </div></div>
    <Composer onSend={onSend} onCamera={onCamera} onDoodle={onDoodle} attachment={attachment} onAddAttachment={onAttachment} onClearAttachment={onClearAttachment} disabled={thinking}/>
  </section>;
}

```

---

## `src/components/Composer.jsx`

```jsx
import React,{useState,useRef} from 'react';
import { Paperclip, ImagePlus, Camera, PenTool, Mic, MicOff, Send, X, FileText, Sparkles } from 'lucide-react';
export default function Composer({onSend,onCamera,onDoodle,onAddAttachment,attachment,onClearAttachment,disabled=false}){
  const [text,setText]=useState(''),[recording,setRecording]=useState(false);
  const fileInput=useRef(null),photoInput=useRef(null);
  const send=()=>{if(!text.trim()&&!attachment)return;onSend(text.trim()||(attachment?`Please organize this attachment: ${attachment.name}`:''));setText('');setRecording(false);};
  const fileSelected=e=>{const f=e.target.files?.[0];if(f)onAddAttachment({name:f.name,type:f.type,size:f.size});e.target.value='';};
  return <div className="chat-composer"><div className="max-w-[850px] mx-auto"><div className="flex items-center gap-1 mb-2"><input ref={fileInput} className="sr-only" type="file" accept=".pdf,.doc,.docx,.txt" onChange={fileSelected} aria-label="Upload a document"/><input ref={photoInput} className="sr-only" type="file" accept="image/*" onChange={fileSelected} aria-label="Upload a photo"/><button title="Attach document" className="icon-btn" aria-label="Attach PDF, Word or text" onClick={()=>fileInput.current?.click()}><Paperclip size={18}/></button><button title="Upload photo" className="icon-btn" aria-label="Upload photo" onClick={()=>photoInput.current?.click()}><ImagePlus size={18}/></button><button title="Open camera" className="icon-btn" aria-label="Open camera modal" onClick={onCamera}><Camera size={18}/></button><button title="Open doodle pad" className="icon-btn" aria-label="Open doodle pad" onClick={onDoodle}><PenTool size={18}/></button><button title="Simulate voice recording" className={`icon-btn ${recording?'active !text-rose animate-pulse':''}`} aria-label={recording?'Stop mock voice recording':'Start mock voice recording'} onClick={()=>setRecording(!recording)}>{recording?<MicOff size={18}/>:<Mic size={18}/>}</button><span className="ml-auto text-[11px] muted hidden sm:inline">{recording?'● Mock recording (no audio saved)':'Add an idea any way you like'}</span></div>
    {recording&&<div role="status" className="safe-note mb-2">Mock microphone is active. No audio is captured. Type the words you want to submit.</div>}
    {attachment&&<div className="tag mb-2"><FileText size={13}/><span className="max-w-[220px] truncate">{attachment.name}</span><span>· mock attachment</span><button onClick={onClearAttachment} className="ml-1" aria-label="Remove attachment"><X size={13}/></button></div>}
    <div className="rounded-2xl border p-2 flex items-end gap-2" style={{borderColor:'var(--line)',background:'var(--raised)'}}><label className="sr-only" htmlFor="chat-input">Message Ops Flow AI</label><textarea id="chat-input" className="resize-none flex-1 bg-transparent border-0 outline-0 p-2 text-sm min-w-0" rows={2} placeholder="Describe a goal, a problem or a workflow..." value={text} disabled={disabled} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}}/><button disabled={disabled||(!text.trim()&&!attachment)} className="btn btn-primary !rounded-xl p-3 glow-btn shrink-0" onClick={send} aria-label="Send message"><Send size={17}/></button></div>
    <div className="flex items-center justify-between gap-2 mt-2"><span className="text-[10px] muted">Enter to send · Shift+Enter for new line</span><span className="text-[10px] muted flex gap-1 items-center"><Sparkles size={11}/> Simulated AI · no backend</span></div>
  </div></div>;
}

```

---

## `src/components/DoodlePad.jsx`

```jsx
import React,{useEffect,useRef,useState} from 'react';
import { Eraser, Undo2, Trash2, Workflow, PenLine } from 'lucide-react';
import Modal from './Modal';
// Canvas drawing is local only; no drawing is sent to a server.
export default function DoodlePad({onClose,onConvert}){
  const canvas=useRef(null),draw=useRef(false),previous=useRef(null),history=useRef([]),[color,setColor]=useState('#7C5CFF'),[eraser,setEraser]=useState(false),[hasDrawn,setHasDrawn]=useState(false);
  useEffect(()=>{const c=canvas.current;if(!c)return;const context=c.getContext('2d');context.fillStyle='#F9FAFD';context.fillRect(0,0,c.width,c.height);history.current=[context.getImageData(0,0,c.width,c.height)];},[]);
  const at=e=>{const r=canvas.current.getBoundingClientRect();return {x:(e.clientX-r.left)*canvas.current.width/r.width,y:(e.clientY-r.top)*canvas.current.height/r.height};};
  const start=e=>{e.preventDefault();draw.current=true;previous.current=at(e);canvas.current.setPointerCapture(e.pointerId);};
  const move=e=>{if(!draw.current)return;const context=canvas.current.getContext('2d'),p=at(e);context.beginPath();context.moveTo(previous.current.x,previous.current.y);context.lineTo(p.x,p.y);context.lineWidth=eraser?18:4;context.lineCap='round';context.strokeStyle=eraser?'#F9FAFD':color;context.stroke();previous.current=p;setHasDrawn(true);};
  const end=()=>{if(!draw.current)return;draw.current=false;const c=canvas.current;history.current.push(c.getContext('2d').getImageData(0,0,c.width,c.height));if(history.current.length>30)history.current.shift();};
  const undo=()=>{if(history.current.length<2)return;history.current.pop();canvas.current.getContext('2d').putImageData(history.current.at(-1),0,0);};
  const clear=()=>{const c=canvas.current,ctx=c.getContext('2d');ctx.fillStyle='#F9FAFD';ctx.fillRect(0,0,c.width,c.height);history.current.push(ctx.getImageData(0,0,c.width,c.height));setHasDrawn(false);};
  return <Modal title="Doodle → workflow" onClose={onClose} wide><p className="text-sm muted mb-4">Draw a quick process, sketch connections or outline your idea. The prototype will suggest a workflow when you convert it.</p><canvas ref={canvas} className="doodle-canvas" width="750" height="320" aria-label="Drawing canvas" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}/><div className="flex flex-wrap gap-2 items-center mt-4"><span className="text-xs muted mr-2">Pen colour</span>{['#7C5CFF','#22B8CE','#F43F5E','#17233A'].map(c=><button key={c} style={{background:c}} className={`w-7 h-7 rounded-full ${c===color&&!eraser?'ring-2 ring-offset-2 ring-violet':''}`} onClick={()=>{setColor(c);setEraser(false);}} aria-label={`Choose pen colour ${c}`}/>)}<button className={`btn btn-small ${eraser?'btn-primary':'btn-quiet'}`} onClick={()=>setEraser(!eraser)}><Eraser size={14}/> Eraser</button><button className="btn btn-small btn-quiet" onClick={undo}><Undo2 size={14}/> Undo</button><button className="btn btn-small btn-quiet" onClick={clear}><Trash2 size={14}/> Clear</button></div><button className="btn btn-primary mt-5 w-full" onClick={()=>onConvert(hasDrawn?'Convert my doodle into a workflow':'Create a sample workflow from my doodle pad')}><Workflow size={17}/> Convert to workflow (simulation)</button></Modal>;
}

```

---

## `src/components/Logo.jsx`

```jsx
import React from 'react';
export default function Logo({compact=false}){
  return <div className="inline-flex items-center gap-2.5 select-none" aria-label="Ops Flow AI">
    <div className="w-9 h-9 rounded-xl gradient-bg grid place-items-center shadow-lg shadow-violet/20">
      <svg viewBox="0 0 30 30" width="27" height="27" fill="none" aria-hidden="true"><path d="M9 8h13M9 8v14h13" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="8" r="3.5" fill="white"/><circle cx="9" cy="22" r="3.5" fill="#BAFFF9"/><path d="m18 18 4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>{!compact&&<span className="font-display font-bold text-[20px] tracking-tight">Ops Flow <span className="gradient-text">AI</span></span>}
  </div>;
}

```

---

## `src/components/Modal.jsx`

```jsx
import React,{useEffect} from 'react';
import { X } from 'lucide-react';
export default function Modal({title,onClose,children,wide=false}){
  useEffect(()=>{const close=(e)=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[onClose]);
  return <div className="modal-backdrop" onMouseDown={(e)=>{if(e.target===e.currentTarget)onClose();}} role="presentation">
    <section className="modal-panel soft-scroll" style={wide?{maxWidth:850}:{}} role="dialog" aria-modal="true" aria-label={title}>
      <header className="flex items-center justify-between gap-4 p-5 border-b" style={{borderColor:'var(--line)'}}><h2 className="font-display text-xl font-bold mb-0">{title}</h2><button className="icon-btn" aria-label="Close dialog" onClick={onClose}><X size={20}/></button></header>
      <div className="p-5">{children}</div>
    </section>
  </div>;
}

```

---

## `src/components/ProgressPanel.jsx`

```jsx
import React,{useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartNoAxesCombined, Flame, BookOpen, Clock3, Check, X, Bell, Lightbulb, Wallet, Smile, CircleCheckBig, Trash2 } from 'lucide-react';
import StudyToolkit from './StudyToolkit';
import { fmtDate, today } from '../utils/engine';
const masteryLabel=(n)=>n===0?'Not started':n<40?'Learning':n<80?'Practised':'Mastered';
function Ring({value,size=122,color='#7C5CFF',children}){const radius=(size-15)/2,circ=2*Math.PI*radius;return <div className="relative inline-grid place-items-center shrink-0" style={{width:size,height:size}}><svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true"><circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--raised)" strokeWidth="9"/><circle className="svg-ring" cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ*(1-value/100)} style={{transition:'stroke-dashoffset .7s'}}/></svg><div className="absolute text-center">{children||<><span className="block font-display text-2xl font-bold">{Math.round(value)}%</span><span className="text-[10px] muted">overall</span></>}</div></div>}
export default function ProgressPanel({area,tasks,mastery,budget,moodHistory,onMood,onToggleTask,onDeleteTask,onClose,studySubjects,studyTimer,onAddSubject,onAddTopic,onToggleTopic,onMoveTopic,onStartPause,onResetTime}){
  const [panelTab,setPanelTab]=useState('Overview'), avg=Math.round(Object.values(mastery).reduce((a,b)=>a+b,0)/Object.values(mastery).length), due=today();
  const areaTasks=tasks.filter(t=>t.area===area),completed=areaTasks.filter(t=>t.done).length,spent=Math.min(100,Math.round(budget.spent/budget.total*100));
  const todayTasks=tasks.filter(t=>!t.done && t.due<=due).slice(0,4);
  const weak=Object.entries(mastery).filter(([,n])=>n<50);
  const linePoints=moodHistory.map((v,i)=>`${14+i*39},${90-(v-1)*19}`).join(' ');
  return <aside className="app-progress soft-scroll" aria-label="Progress tracker">
    <div className="p-5 border-b flex items-start justify-between" style={{borderColor:'var(--line)'}}><div><p className="eyebrow mb-1">LIVE PROGRESS</p><h2 className="font-display font-bold text-xl mb-0">Your momentum <span className="text-violet">↗</span></h2></div><button className="icon-btn xl:hidden" onClick={onClose} aria-label="Close progress panel"><X size={18}/></button></div>
    <div className="p-5 space-y-5"><div className="flex items-center justify-between"><span className="tag"><ChartNoAxesCombined size={13}/>{area}</span><span className="text-[10px] muted">Updated locally</span></div>
      {area==='Education'?<section className="glass rounded-2xl p-4"><h3 className="text-sm font-bold mb-4 flex gap-2 items-center"><BookOpen size={16} className="text-violet"/> Concept tracker</h3><div className="flex justify-center mb-4"><Ring value={avg}/></div><div className="space-y-4">{Object.entries(mastery).map(([name,value])=><div key={name}><div className="flex justify-between mb-2 text-xs"><span className="font-semibold">{name}</span><span className="muted">{masteryLabel(value)} · {value}%</span></div><div className="progress-track"><div className="progress-fill" style={{width:`${value}%`}}/></div></div>)}</div>{weak.length>0&&<div className="mt-4 pt-3 dash-line"><p className="text-[11px] font-bold text-amber mb-2">Needs a refresh</p><div className="flex gap-1 flex-wrap">{weak.map(([c])=><span key={c} className="tag !text-amber" style={{background:'rgba(245,158,11,.06)'}}><Bell size={11}/>{c}</span>)}</div></div>}</section>:null}
      {area==='Education'&&<StudyToolkit subjects={studySubjects||[]} timer={studyTimer} onAddSubject={onAddSubject} onAddTopic={onAddTopic} onToggleTopic={onToggleTopic} onMoveTopic={onMoveTopic} onStartPause={onStartPause} onResetTime={onResetTime}/>}
      {area==='Work'||area==='Personal life'?<section className="glass rounded-2xl p-4"><h3 className="text-sm font-bold mb-4">Task completion</h3><div className="flex items-center gap-5"><Ring value={areaTasks.length?completed/areaTasks.length*100:0} size={100} color="#22D3EE"/><div className="text-xs space-y-3"><p className="mb-0"><span className="w-2 h-2 inline-block bg-emerald rounded-full mr-2"/>{completed} completed</p><p className="mb-0"><span className="w-2 h-2 inline-block bg-violet rounded-full mr-2"/>{areaTasks.length-completed} remaining</p><p className="muted mb-0">Finish one thing at a time.</p></div></div></section>:null}
      {['Fitness','Health habits','Motivation'].includes(area)?<section className="glass rounded-2xl p-4"><div className="flex items-center gap-2 mb-4"><Flame size={19} className="text-amber"/><b className="font-display text-xl">3 day streak</b></div><div className="flex gap-2">{['M','T','W','T','F','S','S'].map((v,i)=><div key={i} className="flex-1 text-center"><div className="streak-cell" style={{background:i<4?'rgba(16,185,129,.55)':'var(--raised)',border:'1px solid var(--line)'}}/ ><span className="text-[10px] muted">{v}</span></div>)}</div><p className="text-xs muted mt-4 mb-0">Your next small action keeps the streak alive.</p></section>:null}
      {area==='Finance'?<section className="glass rounded-2xl p-4"><div className="flex gap-2 items-center mb-4"><Wallet size={18} className="text-emerald"/><h3 className="text-sm font-bold mb-0">Monthly budget preview</h3></div><p className="font-display text-2xl font-bold mb-1">₹{budget.spent.toLocaleString('en-IN')} <span className="text-sm muted">/ ₹{budget.total.toLocaleString('en-IN')}</span></p><div className="progress-track my-4 !h-3"><div className="progress-fill" style={{width:`${spent}%`,background:'linear-gradient(90deg,#10B981,#22D3EE)'}}/></div><p className="text-xs muted mb-0">₹{(budget.total-budget.spent).toLocaleString('en-IN')} left to allocate. Example data, not financial advice.</p></section>:null}
      {area==='Mental support'?<section className="glass rounded-2xl p-4"><div className="flex items-center gap-2 mb-2"><Smile size={18} className="text-amber"/><h3 className="text-sm font-bold mb-0">How are you feeling?</h3></div><p className="text-xs muted">Tap a face to check in today.</p><div className="flex justify-between gap-1 mb-5">{['😟','😕','😐','🙂','😄'].map((face,i)=><button key={face} className={`rounded-xl text-2xl p-1.5 border ${moodHistory.at(-1)===i+1?'border-violet bg-violet/10':'border-transparent hover:border-violet'}`} onClick={()=>onMood(i+1)} aria-label={`Set mood ${i+1} of 5`}>{face}</button>)}</div><p className="text-[11px] muted">Seven-day mood history</p><svg viewBox="0 0 260 100" className="w-full" role="img" aria-label="Line chart showing mood scores across seven days"><line x1="0" y1="90" x2="260" y2="90" stroke="var(--line)"/><polyline points={linePoints} fill="none" stroke="#A08BFF" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>{moodHistory.map((v,i)=><circle key={i} cx={14+i*39} cy={90-(v-1)*19} r="4" fill="#22D3EE"/>)}</svg><p className="text-[11px] muted mt-2 mb-0">Supportive reflection, not clinical assessment.</p></section>:null}
      <section className="glass rounded-2xl p-4"><div className="flex justify-between items-center mb-4"><h3 className="text-sm font-bold mb-0">Today & reminders</h3><Clock3 size={15} className="muted"/></div>{todayTasks.length?<AnimatePresence initial={false}>{todayTasks.map(t=><motion.div key={t.id} initial={{opacity:0,x:18}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-18}} layout className="flex items-start gap-1 mb-3"><label className="flex gap-2 items-start cursor-pointer flex-1"><input type="checkbox" className="accent-violet mt-1" checked={t.done} onChange={()=>onToggleTask(t.id)} aria-label={`Complete ${t.title}`}/><span className="flex-1"><span className="block text-xs leading-5">{t.title}</span><span className="text-[10px] muted">{fmtDate(t.due)} · {t.minutes} min {t.reminder?'· reminder':''}</span></span></label><button className="icon-btn !w-6 !h-6" aria-label={`Delete ${t.title}`} title="Delete task" onClick={()=>onDeleteTask(t.id)}><Trash2 size={12}/></button></motion.div>)}</AnimatePresence>:<p className="text-xs muted mb-0">You're caught up for today. New approved tasks will appear here.</p>}</section>
      <section className="rounded-2xl p-4" style={{background:'linear-gradient(130deg,rgba(124,92,255,.22),rgba(34,211,238,.07))',border:'1px solid rgba(124,92,255,.3)'}}><div className="flex items-center gap-2 mb-2"><Lightbulb size={17} className="text-amber"/><b className="text-sm">Suggested focus</b></div><p className="text-xs leading-6 muted mb-0">{area==='Education'?'Spend 20 minutes revisiting loops before taking the Java quiz.':area==='Finance'?'Review one spending category and adjust your budget deliberately.':area==='Mental support'?'A five-minute check-in is a meaningful start.':`Choose one ${area.toLowerCase()} task and complete it before adding more.`}</p></section>
    </div>
  </aside>;
}

```

---

## `src/components/QuizCard.jsx`

```jsx
import React,{useState,useEffect,useRef} from 'react';
import { Check, X, ArrowRight, RotateCcw, NotebookPen, Clock } from 'lucide-react';
import { JAVA_QUESTIONS } from '../data/mockData';
const SEC=25;
export default function QuizCard({questions=JAVA_QUESTIONS,onMastery}){
  const [index,setIndex]=useState(0),[left,setLeft]=useState(SEC),[choice,setChoice]=useState(''),[status,setStatus]=useState(null),[results,setResults]=useState([]),[review,setReview]=useState(false),started=useRef(Date.now());
  const q=questions[index],finished=index>=questions.length;
  // Timer resets on each question. If the countdown expires, an unanswered answer is recorded.
  useEffect(()=>{if(finished||status)return;const interval=setInterval(()=>setLeft(t=>Math.max(0,t-1)),1000);return()=>clearInterval(interval);},[index,finished,status]);
  const completedRef=useRef(false);
  useEffect(()=>{if(left===0&&!status&&!finished&&!completedRef.current){completedRef.current=true;setStatus('timeout');setResults(r=>[...r,{q,choice:'No answer',correct:false}]);}},[left,status,finished,q]);
  if(!questions.length)return <p>No questions available.</p>;
  const submit=()=>{if(status||!choice.trim())return;const correct=choice.trim().toLowerCase()===q.answer.toLowerCase();setStatus(correct?'correct':'incorrect');setResults(r=>[...r,{q,choice,correct}]);onMastery(q.concept,correct);};
  const next=()=>{setIndex(i=>i+1);setLeft(SEC);setChoice('');setStatus(null);completedRef.current=false;};
  const restart=()=>{started.current=Date.now();setIndex(0);setLeft(SEC);setChoice('');setStatus(null);setResults([]);setReview(false);completedRef.current=false;};
  if(finished){const score=results.filter(r=>r.correct).length, mistakes=results.filter(r=>!r.correct);return <div className="surface rounded-2xl p-4 mt-3"><div className="text-center py-4"><span className="text-4xl">🏅</span><h3 className="font-display text-xl font-bold mt-3">Quiz complete!</h3><p className="font-display text-4xl text-emerald font-bold mb-2">{score} / {questions.length}</p><p className="text-xs muted">{Math.round(score/questions.length*100)}% correct · ~{Math.max(1,Math.round((Date.now()-started.current)/60000))} min · mastery adjustment {results.reduce((n,r)=>n+(r.choice==='No answer'?0:r.correct?7:-2),0)>=0?'+':''}{results.reduce((n,r)=>n+(r.choice==='No answer'?0:r.correct?7:-2),0)} pts</p><div className="flex justify-center flex-wrap gap-2 mt-4"><button className="btn btn-quiet btn-small" onClick={()=>setReview(!review)}><NotebookPen size={15}/>{review?'Hide mistakes':'Review mistakes'} ({mistakes.length})</button><button className="btn btn-primary btn-small" onClick={restart}><RotateCcw size={14}/> Try again</button></div></div>{review&&<div className="space-y-2">{mistakes.length?mistakes.map((m,i)=><div className="raised rounded-xl p-3 text-xs" key={i}><b>{m.q.question}</b><p className="mt-2 mb-1 text-rose">Your answer: {m.choice}</p><p className="mb-1 text-emerald">Correct: {m.q.answer}</p><p className="muted mb-0">{m.q.explanation}</p></div>):<p className="text-sm text-center muted">No mistakes — well done!</p>}</div>}</div>}
  return <section className="surface rounded-2xl p-4 mt-4" aria-label="Interactive Java quiz"><div className="flex items-center justify-between mb-4"><span className="text-xs font-bold"><span className="text-violet">JAVA MASTERY QUIZ</span> · {index+1} / {questions.length}</span><div className="relative w-11 h-11 grid place-items-center"><svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18" fill="none" stroke="var(--raised)" strokeWidth="4"/><circle cx="22" cy="22" r="18" fill="none" stroke={left<=10?'#F43F5E':'#7C5CFF'} strokeWidth="4" className="svg-ring quiz-ring" strokeDasharray={2*Math.PI*18} strokeDashoffset={2*Math.PI*18*(1-left/SEC)}/></svg><span className={`text-xs font-bold absolute ${left<=10?'text-rose':''}`}>{left}</span></div></div><div className="progress-track mb-4"><div className="progress-fill" style={{width:`${(index+1)/questions.length*100}%`}}/></div><h3 className="font-display font-bold text-base leading-6 mb-4">{q.question}</h3>
    {q.type==='blank'?<label className="block text-xs muted mb-3">Your answer <input className="field mt-2" placeholder="Type the missing code here" value={choice} disabled={!!status} onChange={e=>setChoice(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')submit();}}/></label>:<div className="space-y-2 mb-4" role="radiogroup" aria-label="Choose quiz answer">{q.options.map(opt=><button key={opt} type="button" role="radio" aria-checked={choice===opt} disabled={!!status} onClick={()=>setChoice(opt)} className={`option text-xs ${status?(opt===q.answer?'correct':(opt===choice?'incorrect':'')):(choice===opt?'!border-violet':'')}`}><span className="w-4 h-4 rounded-full border grid place-items-center shrink-0" style={{borderColor:choice===opt?'#7C5CFF':'var(--muted)'}}>{choice===opt?<span className="rounded-full bg-violet w-2 h-2"/>:null}</span><span className="flex-1">{opt}</span>{status&&opt===q.answer?<Check className="success" size={15}/>:null}{status&&opt===choice&&choice!==q.answer?<X className="danger" size={15}/>:null}</button>)}</div>}
    {status&&<div className={`text-xs rounded-xl p-3 my-3 ${status==='correct'?'bg-emerald/10':'bg-rose/10'}`} role="status"><p className={`font-bold mb-1 ${status==='correct'?'text-emerald':'text-rose'}`}>{status==='correct'?'Correct!':status==='timeout'?'Time is up!':'Not quite.'} Answer: {q.answer}</p><p className="muted mb-0 leading-5">{q.explanation}</p></div>}
    <div className="flex justify-between gap-2 items-center"><span className="text-[10px] muted flex items-center gap-1"><Clock size={12}/> 25 seconds / question</span>{status?<button className="btn btn-primary btn-small" onClick={next}>Got it <ArrowRight size={13}/></button>:<button className="btn btn-primary btn-small" disabled={!choice.trim()} onClick={submit}>Check answer <Check size={13}/></button>}</div>
  </section>;
}

```

---

## `src/components/SettingsModal.jsx`

```jsx
import React,{useState} from 'react';
import { Save, Trash2, Moon, Sun, ShieldCheck, AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import { AREAS } from '../data/mockData';
export default function SettingsModal({state,onSave,onReset,onClose}){
  const [profile,setProfile]=useState({...state.profile}),[settings,setSettings]=useState({...state.settings,areaVisibility:{...state.settings.areaVisibility}}),[confirm,setConfirm]=useState(false),[theme,setTheme]=useState(state.theme),[mode,setMode]=useState(state.mode);
  return <Modal title="Profile & preferences" onClose={onClose} wide><div className="grid md:grid-cols-2 gap-5"><section><h3 className="font-bold mb-3 text-base">Your profile</h3><label className="text-xs muted block mb-3">Preferred name<input className="field mt-1" value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))}/></label><label className="text-xs muted block mb-3">Your main goal<input className="field mt-1" value={profile.goal} onChange={e=>setProfile(p=>({...p,goal:e.target.value}))}/></label><label className="text-xs muted block mb-3">Study or work hours<input className="field mt-1" value={profile.hours} onChange={e=>setProfile(p=>({...p,hours:e.target.value}))}/></label><label className="text-xs muted block mb-3">Default mode<select className="field mt-1" value={mode} onChange={e=>setMode(e.target.value)}>{['Student','Employee','Manager','General'].map(a=><option key={a}>{a}</option>)}</select></label><h3 className="font-bold mt-5 mb-3">Appearance</h3><div className="flex gap-2"><button className={`btn btn-small ${theme==='dark'?'btn-primary':'btn-quiet'}`} onClick={()=>setTheme('dark')}><Moon size={14}/> Dark</button><button className={`btn btn-small ${theme==='light'?'btn-primary':'btn-quiet'}`} onClick={()=>setTheme('light')}><Sun size={14}/> Light</button></div><label className="flex items-center gap-3 text-sm mt-4"><input type="checkbox" className="accent-violet" checked={settings.reducedMotion} onChange={e=>setSettings(s=>({...s,reducedMotion:e.target.checked}))}/> Reduce animations</label></section><section><h3 className="font-bold mb-3 text-base">Enabled life areas</h3><p className="text-xs muted">Turn areas on or off to customize quick access. Existing chats remain saved.</p><div className="grid grid-cols-2 gap-3">{AREAS.map(a=><label className="raised rounded-xl p-3 text-xs flex items-center gap-2" key={a.id}><input type="checkbox" className="accent-violet" checked={settings.areaVisibility[a.id]??true} onChange={e=>setSettings(s=>({...s,areaVisibility:{...s.areaVisibility,[a.id]:e.target.checked}}))}/><span>{a.id}</span></label>)}</div><p className="safe-note mt-5 flex gap-2"><ShieldCheck size={16} className="shrink-0"/> All demo data is stored locally on this device. Clearing browser storage also deletes it.</p></section></div><div className="flex flex-wrap justify-between gap-3 mt-6 pt-5 dash-line"><button className="btn btn-small !text-rose" style={{border:'1px solid rgba(244,63,94,.3)'}} onClick={()=>setConfirm(true)}><Trash2 size={14}/> Delete my data</button><button className="btn btn-primary" onClick={()=>{onSave({profile,settings,theme,mode});onClose();}}><Save size={16}/> Save changes</button></div>{confirm&&<div className="mt-5 p-4 rounded-xl border border-rose/40 bg-rose/10"><p className="flex items-center gap-2 text-sm font-bold mb-2"><AlertTriangle size={17} className="text-rose"/> Delete all local data?</p><p className="text-xs muted">This resets conversations, tasks, quiz progress, mood check-ins, profile and preferences. This cannot be undone.</p><div className="flex gap-2"><button className="btn btn-small !bg-rose !text-white" onClick={()=>{onReset();onClose();}}>Yes, delete and reset</button><button className="btn btn-quiet btn-small" onClick={()=>setConfirm(false)}>Cancel</button></div></div>}</Modal>;
}

```

---

## `src/components/Sidebar.jsx`

```jsx
import React,{useState} from 'react';
import { Plus, Search, Pin, Ellipsis, MessageSquare, X, BookOpen, BriefcaseBusiness, HeartPulse, Wallet, Dumbbell, Sparkles, SunMedium, Rocket } from 'lucide-react';
import Logo from './Logo';
const ico={Education:BookOpen,Work:BriefcaseBusiness,Fitness:Dumbbell,Finance:Wallet,'Health habits':HeartPulse,'Mental support':SunMedium,Motivation:Rocket,'Personal life':Sparkles};
const colors={Education:'#A08BFF',Work:'#22D3EE',Finance:'#10B981',Fitness:'#F59E0B','Health habits':'#EC87B1','Mental support':'#FDAF9B',Motivation:'#F59E0B','Personal life':'#80A7FF'};
function relative(date){const diff=Math.max(0,Math.floor((Date.now()-date)/60000));return diff<60?`${Math.max(1,diff)}m ago`:diff<1440?`${Math.floor(diff/60)}h ago`:`${Math.floor(diff/1440)}d ago`;}
export default function Sidebar({chats,activeId,onSelect,onNew,visibility,onRename,onPin,onDelete,onHome,onClose}){
  const [filter,setFilter]=useState(''),[menu,setMenu]=useState(null),[rename,setRename]=useState('');
  const filtered=[...chats].filter(c=>(visibility?.[c.area]??true)).filter(c=>c.title.toLowerCase().includes(filter.toLowerCase())||c.area.toLowerCase().includes(filter.toLowerCase())).sort((a,b)=>Number(b.pinned)-Number(a.pinned)||b.updated-a.updated);
  const grouped=Object.groupBy?Object.groupBy(filtered,c=>c.area):filtered.reduce((acc,c)=>{(acc[c.area]??=[]).push(c);return acc;},{});
  return <aside className="app-sidebar soft-scroll h-full flex flex-col" aria-label="Recent chats">
    <div className="p-5 border-b" style={{borderColor:'var(--line)'}}><div className="flex justify-between items-center mb-6"><button onClick={onHome} aria-label="Back to landing page"><Logo/></button><button className="icon-btn md:hidden" onClick={onClose} aria-label="Close chat drawer"><X size={19}/></button></div><button className="btn w-full gradient-outline justify-center" onClick={onNew}><Plus size={17} className="text-violet"/> New chat</button><div className="relative mt-4"><Search size={16} className="absolute top-1/2 -translate-y-1/2 left-3 muted"/><input value={filter} onChange={e=>setFilter(e.target.value)} className="field pl-10 text-[13px]" placeholder="Search conversations..." aria-label="Search conversations"/></div></div>
    <div className="p-3 space-y-5 flex-1 overflow-y-auto soft-scroll">{Object.entries(grouped).map(([area,list])=>{const Icon=ico[area]||MessageSquare;return <section key={area}><div className="px-3 mb-2 flex items-center gap-2 text-xs font-bold muted"><Icon size={13} style={{color:colors[area]}}/>{area}<span className="text-[10px] opacity-60">{list.length}</span></div><div className="space-y-1">{list.map(c=><div key={c.id} className="relative group"><button className={`side-nav-item pr-9 ${activeId===c.id?'selected':''}`} onClick={()=>{onSelect(c.id);onClose();}} onContextMenu={e=>{e.preventDefault();setMenu(c.id);setRename(c.title);}}><span className="w-2 h-2 rounded-full shrink-0" style={{background:colors[area]}}/><span className="flex-1 min-w-0"><span className="block text-[12px] font-semibold truncate">{c.title}</span><span className="text-[10px] muted">{relative(c.updated)}</span></span>{c.pinned&&<Pin size={12} className="text-violet"/>}</button><button onClick={()=>{setMenu(menu===c.id?null:c.id);setRename(c.title);}} aria-label={`More options for ${c.title}`} className="absolute top-[11px] right-2 icon-btn !w-7 !h-7 opacity-70 hover:opacity-100"><Ellipsis size={15}/></button>{menu===c.id&&<div className="absolute z-20 right-1 top-9 w-48 p-2 glass rounded-xl shadow-xl"><label className="text-[10px] font-bold muted pl-1">RENAME CHAT</label><input className="field text-xs py-2 mt-1" value={rename} onChange={e=>setRename(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){onRename(c.id,rename);setMenu(null);}}}/><button className="side-nav-item text-xs py-2" onClick={()=>{onRename(c.id,rename);setMenu(null);}}>Save name</button><button className="side-nav-item text-xs py-2" onClick={()=>{onPin(c.id);setMenu(null);}}>{c.pinned?'Unpin':'Pin'} chat</button><button className="side-nav-item text-xs py-2 !text-rose" onClick={()=>{onDelete(c.id);setMenu(null);}}>Delete chat</button></div>}</div>)}</div></section>;})}{filtered.length===0&&<p className="text-xs muted p-4">No conversations match this search.</p>}</div>
    <div className="m-4 p-4 rounded-2xl" style={{background:'linear-gradient(130deg,rgba(124,92,255,.18),rgba(34,211,238,.08))',border:'1px solid rgba(124,92,255,.28)'}}><span className="text-xs font-bold">✦ A little more every day</span><p className="text-[11px] muted leading-5 mt-2 mb-0">Small actions become real momentum. Your demo data stays in this browser.</p></div>
  </aside>;
}

```

---

## `src/components/StudyToolkit.jsx`

```jsx
import React, { useState } from 'react';
import { Plus, Play, Pause, RotateCcw, ArrowUp, ArrowDown, Timer, BookPlus, ChevronDown } from 'lucide-react';

// This optional study toolkit shares persistent state with the main app.
// The parent updates the running timer once per second while the site is open.
const prettyTime = (seconds) => `${Math.floor(seconds/3600).toString().padStart(2,'0')}:${Math.floor(seconds%3600/60).toString().padStart(2,'0')}:${Math.floor(seconds%60).toString().padStart(2,'0')}`;
export default function StudyToolkit({subjects, timer, onAddSubject, onAddTopic, onToggleTopic, onMoveTopic, onStartPause, onResetTime}){
  const [open,setOpen]=useState(false),[subjectId,setSubjectId]=useState(subjects[0]?.id||''),[selectedTopic,setSelectedTopic]=useState(null),[newName,setNewName]=useState(''),[topicName,setTopicName]=useState('');
  const subject=subjects.find(s=>s.id===subjectId)||subjects[0];
  const activeTopic=subject?.topics.find(t=>t.id===selectedTopic)||subject?.topics[0];
  const isRunning=timer?.subjectId===subject?.id&&timer?.topicId===activeTopic?.id;
  const addSubject=()=>{if(!newName.trim())return;const id=onAddSubject(newName.trim());setSubjectId(id);setSelectedTopic(null);setNewName('');};
  const addTopic=()=>{if(!subject||!topicName.trim())return;onAddTopic(subject.id,topicName.trim());setTopicName('');};
  return <section className="glass rounded-2xl p-4" aria-label="Subject and topic study tracker"><button onClick={()=>setOpen(!open)} className="flex items-center justify-between w-full text-left" aria-expanded={open}><span className="font-bold text-sm inline-flex items-center gap-2"><Timer size={17} className="text-violet"/> Study toolkit <span className="tag !text-[10px]">Checklists + timer</span></span><ChevronDown size={17} className={`muted transition-transform ${open?'rotate-180':''}`}/></button>
    {open&&<div className="mt-4"><label className="text-[11px] muted">Subject<select value={subject?.id||''} onChange={e=>{setSubjectId(e.target.value);setSelectedTopic(null);}} className="field mt-1 text-xs">{subjects.map(s=><option value={s.id} key={s.id}>{s.name}</option>)}</select></label><div className="flex gap-2 mt-2"><input className="field min-w-0 text-xs" placeholder="New subject name" aria-label="New subject" value={newName} onChange={e=>setNewName(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')addSubject();}}/><button className="btn btn-quiet btn-small" onClick={addSubject} title="Add subject" aria-label="Add subject"><BookPlus size={15}/></button></div>
      <p className="text-xs font-bold mt-5 mb-2">Topic checklist</p><div className="space-y-1">{subject?.topics.map((t,i)=><div key={t.id} className={`rounded-xl p-2 flex items-center gap-1 ${activeTopic?.id===t.id?'raised':''}`}><input type="checkbox" checked={t.done} className="accent-violet" onChange={()=>onToggleTopic(subject.id,t.id)} aria-label={`Complete ${t.title}`}/><button className={`text-xs flex-1 min-w-0 text-left truncate ${t.done?'line-through muted':''}`} onClick={()=>setSelectedTopic(t.id)} title={`Select ${t.title}`}>{t.title}</button><span className="text-[9px] muted">{Math.round(t.seconds/60)}m</span><button className="icon-btn !w-6 !h-6" aria-label={`Move ${t.title} up`} disabled={i===0} onClick={()=>onMoveTopic(subject.id,t.id,-1)}><ArrowUp size={12}/></button><button className="icon-btn !w-6 !h-6" aria-label={`Move ${t.title} down`} disabled={i===subject.topics.length-1} onClick={()=>onMoveTopic(subject.id,t.id,1)}><ArrowDown size={12}/></button></div>)}{!subject?.topics.length&&<p className="text-xs muted">No topics yet. Add your first topic below.</p>}</div><div className="flex gap-2 mt-3"><input className="field min-w-0 text-xs" placeholder="Add a topic" aria-label="New topic title" value={topicName} onChange={e=>setTopicName(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')addTopic();}}/><button className="btn btn-quiet btn-small" onClick={addTopic} aria-label="Add topic"><Plus size={16}/></button></div>
      {activeTopic&&<div className="mt-4 rounded-2xl p-4 text-center" style={{background:'linear-gradient(145deg,rgba(124,92,255,.14),rgba(34,211,238,.05))',border:'1px solid var(--line)'}}><p className="text-xs font-bold mb-1">Focus · {activeTopic.title}</p><p className="font-display font-bold text-3xl tabular-nums mb-3">{prettyTime(activeTopic.seconds)}</p><div className="flex justify-center gap-2"><button className="btn btn-primary btn-small" onClick={()=>onStartPause(subject.id,activeTopic.id)}>{isRunning?<><Pause size={14}/> Pause</>:<><Play size={14}/> Start</>}</button><button className="btn btn-quiet btn-small" onClick={()=>onResetTime(subject.id,activeTopic.id)}><RotateCcw size={14}/> Reset</button></div><p className="text-[10px] muted mt-3 mb-0">Time counts while this website is open.</p></div>}
      <p className="text-[10px] muted mt-4 mb-0">{subject?.topics.filter(t=>t.done).length||0} / {subject?.topics.length||0} topics completed · Choose topics to study in any order.</p>
    </div>}
  </section>;
}

```

---

## `src/data/mockData.js`

```javascript
// All sample content is local mock data. No account, server, or AI API is involved.
export const AREAS = [
  { id: 'Education', icon: 'BookOpen', color: '#9A83FF', description: 'Study plans, concepts, quizzes and deep understanding.', ready: true },
  { id: 'Work', icon: 'BriefcaseBusiness', color: '#22D3EE', description: 'Turn messy meeting notes into calm, clear next steps.', ready: true },
  { id: 'Fitness', icon: 'Dumbbell', color: '#10B981', description: 'Build routines, track sessions and stay consistent.', ready: true },
  { id: 'Health habits', icon: 'HeartPulse', color: '#F973A8', description: 'Gentle routines for sleep, hydration and self-care.', ready: true },
  { id: 'Motivation', icon: 'Rocket', color: '#F59E0B', description: 'Small wins that make progress feel possible.', ready: true },
  { id: 'Finance', icon: 'Wallet', color: '#6EE7B7', description: 'Simple budgets and personal money goals.', ready: true },
  { id: 'Mental support', icon: 'SunMedium', color: '#F6B6A8', description: 'Mood check-ins, reflection and supportive prompts.', ready: true },
  { id: 'Personal life', icon: 'Sparkles', color: '#80A7FF', description: 'Keep errands, projects and everyday plans in sync.', ready: true }
];
export const FEATURE_CARDS = [
  ['BrainCircuit', 'Instruction compiler', 'Write what you need. Get a structured, actionable plan.'],
  ['ShieldCheck', 'Approve before it acts', 'Review a draft before anything is saved to your plan.'],
  ['CalendarClock', 'Living plans & reminders', 'Dates, priorities and gentle nudges stay connected.'],
  ['PenTool', 'Doodle to workflow', 'Sketch an idea and turn it into organized next steps.'],
  ['ChartNoAxesCombined', 'Progress tracker', 'Follow mastery, habits and milestones in one place.'],
  ['Gauge', 'Speed modes', 'Choose Fast, Balanced or Deep for simulated responses.']
];
export const JAVA_QUESTIONS = [
  { type: 'mcq', question: 'Which type stores whole numbers in Java?', options: ['String', 'int', 'boolean', 'double'], answer: 'int', explanation: 'int is the primitive data type used to store whole numbers.', concept: 'Variables' },
  { type: 'tf', question: 'A Java variable must have a type.', options: ['True', 'False'], answer: 'True', explanation: 'Java is statically typed, so variables are given a type.', concept: 'Variables' },
  { type: 'blank', question: 'Complete the loop: for (int i = 0; i < 5; i__)', answer: '++', explanation: 'i++ increments the counter once per loop iteration.', concept: 'Loops' },
  { type: 'mcq', question: 'Which loop runs its body at least once?', options: ['for', 'while', 'do-while', 'enhanced for'], answer: 'do-while', explanation: 'do-while checks its condition after the first execution.', concept: 'Loops' },
  { type: 'mcq', question: 'What is the first index in a Java array?', options: ['1', '-1', '0', 'Depends on size'], answer: '0', explanation: 'Arrays are zero-indexed in Java.', concept: 'Arrays' },
  { type: 'blank', question: 'The array property giving its number of elements is .____', answer: 'length', explanation: 'The length field (without parentheses) is available on arrays.', concept: 'Arrays' },
  { type: 'tf', question: 'Java supports method overloading.', options: ['True', 'False'], answer: 'True', explanation: 'Methods can share a name when they have different parameter lists.', concept: 'OOP' },
  { type: 'mcq', question: 'Which keyword creates an instance of a class?', options: ['class', 'this', 'new', 'void'], answer: 'new', explanation: 'The new keyword creates an object instance.', concept: 'OOP' },
  { type: 'mcq', question: 'What does encapsulation usually help protect?', options: ['Internet speed', 'Internal object state', 'File extensions', 'Variable spelling'], answer: 'Internal object state', explanation: 'Encapsulation bundles state with methods and limits direct access.', concept: 'OOP' },
  { type: 'tf', question: 'An array can hold elements of different primitive types directly.', options: ['True', 'False'], answer: 'False', explanation: 'Java arrays have an element type; an int[] stores only ints.', concept: 'Arrays' }
];
const localISO = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const future = (days) => { const d = new Date(); d.setDate(d.getDate() + days); return localISO(d); };
const upcomingWeekday = (day) => { const d=new Date(); let diff=(day-d.getDay()+7)%7; if(diff===0) diff=7; d.setDate(d.getDate()+diff); return localISO(d); };
export const SAMPLE_PLAN = [
  { title:'Revise Java variables and data types', due:future(1), priority:'High', minutes:40, area:'Education' },
  { title:'Practise Java loops and arrays', due:future(2), priority:'High', minutes:50, area:'Education' },
  { title:'Take Java mock quiz', due:upcomingWeekday(5), priority:'High', minutes:25, area:'Education' },
  { title:'Outline monthly status report', due:future(1), priority:'Medium', minutes:45, area:'Work' },
  { title:'Submit final status report', due:upcomingWeekday(1), priority:'High', minutes:60, area:'Work' },
  { title:'Gym session 1: strength', due:future(1), priority:'Medium', minutes:45, area:'Fitness' },
  { title:'Gym session 2: cardio', due:future(2), priority:'Medium', minutes:35, area:'Fitness' },
  { title:'Gym session 3: strength', due:future(3), priority:'Medium', minutes:45, area:'Fitness' },
  { title:'Gym session 4: mobility', due:future(4), priority:'Low', minutes:30, area:'Fitness' }
];
export function makeInitialState(){
  const mk = (id,title,area,ago,messages=[],pinned=false)=>({id,title,area,updated:Date.now()-ago*60000,pinned,messages});
  return {
    conversations:[
      mk('java-chat','Java test revision','Education',7,[
        {id:'intro-user',role:'user',text:'Help me prepare for my Java test on Friday.'},
        {id:'intro-ai',role:'ai',kind:'text',text:'We can break this into quick concept reviews and a practice quiz. Start with variables, then loops, arrays and OOP. Want to test your understanding?'}
      ],true),
      mk('work-chat','Monday report workflow','Work',76,[{id:'m1',role:'ai',kind:'text',text:'Your report workflow is ready: collect inputs → draft summary → review → submit. Ask me to make a plan to save individual tasks.'}]),
      mk('fit-chat','Four-day gym routine','Fitness',220,[{id:'m2',role:'ai',kind:'text',text:'Try two strength sessions, one cardio session and one mobility session this week. Adjust exercises to your abilities.'}]),
      mk('budget-chat','Monthly spending reset','Finance',960,[{id:'m3',role:'ai',kind:'text',text:'Start by estimating essentials, flexible expenses and savings. I can draft a sample monthly budget for review.'}]),
      mk('mood-chat','Gentle weekly check-in','Mental support',1920,[{id:'m4',role:'ai',kind:'text',text:'A small check-in is enough. Try naming how you feel, then choosing one manageable next step.'}]),
      mk('habits-chat','Morning routine checklist','Health habits',2800,[{id:'m5',role:'ai',kind:'text',text:'A simple routine might be water, a short stretch and 10 minutes without screens. Small and sustainable is good.'}])
    ],
    activeId:'java-chat',
    tasks:[
      {id:'seed-1',title:'Revise Java loops',due:future(0),priority:'High',minutes:35,area:'Education',done:false,reminder:true},
      {id:'seed-2',title:'Review report outline',due:future(0),priority:'Medium',minutes:25,area:'Work',done:false,reminder:true},
      {id:'seed-3',title:'30-minute walk',due:future(0),priority:'Low',minutes:30,area:'Fitness',done:true,reminder:false},
      {id:'seed-4',title:'Track expenses',due:future(1),priority:'Medium',minutes:10,area:'Finance',done:false,reminder:true}
    ],
    mastery:{Variables:72,Loops:46,Arrays:18,OOP:9},
    studySubjects:[
      {id:'java-subject',name:'Java',topics:[{id:'java-variables',title:'Variables',done:true,seconds:920},{id:'java-loops',title:'Loops',done:false,seconds:540},{id:'java-arrays',title:'Arrays',done:false,seconds:0},{id:'java-oop',title:'OOP',done:false,seconds:0}]},
      {id:'math-subject',name:'Mathematics',topics:[{id:'math-algebra',title:'Algebra foundations',done:false,seconds:1200},{id:'math-trig',title:'Trigonometry',done:false,seconds:0}]}
    ],
    studyTimer:null,
    moodHistory:[3,4,3,5,4,4,3],
    budget:{spent:18250,total:30000},
    profile:{name:'Alex',goal:'Make steady progress every day',hours:'2 hours',mode:'Student'},
    settings:{areaVisibility: Object.fromEntries(AREAS.map(a=>[a.id,true])), reducedMotion:false},
    mode:'Student',speed:'Balanced',theme:'dark', notificationLog:[]
  };
}

```

---

## `src/main.jsx`

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);

```

---

## `src/pages/AppShell.jsx`

```jsx
import React,{useState} from 'react';
import { ArrowLeft, Menu, Sparkles, Check, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ChatPanel from '../components/ChatPanel';
import ProgressPanel from '../components/ProgressPanel';
export default function AppShell(props){
  const [drawer,setDrawer]=useState(null),active=props.state.conversations.find(c=>c.id===props.state.activeId),area=active?.area||'Education';
  return <><div className="bg-ambient"/><div className="nav-shell flex items-center justify-between h-[74px] px-4 sm:px-6"><button className="text-xs font-bold muted hover:text-violet inline-flex items-center gap-2" onClick={props.onHome}><ArrowLeft size={15}/> Back to website</button><div className="text-[11px] inline-flex items-center gap-2 text-emerald"><span className="w-2 h-2 bg-emerald rounded-full"/> INTERACTIVE PROTOTYPE <span className="hidden sm:inline muted">· stored locally</span></div></div>
    <div className="app-grid"><div className={`app-sidebar-wrapper ${drawer==='left'?'panel-open':''}`} style={{display:'contents'}}>
      <Sidebar chats={props.state.conversations} visibility={props.state.settings.areaVisibility} activeId={props.state.activeId} onSelect={props.onSelectChat} onNew={()=>{props.onNewChat();setDrawer(null);}} onRename={props.onRenameChat} onPin={props.onPinChat} onDelete={props.onDeleteChat} onHome={props.onHome} onClose={()=>setDrawer(null)}/>
    </div>
      <ChatPanel chat={active} area={area} mode={props.state.mode} speed={props.state.speed} theme={props.state.theme} profile={props.state.profile} messages={active?.messages||[]} thinking={props.thinking} reduceMotion={props.state.settings.reducedMotion} onMode={props.onMode} onSpeed={props.onSpeed} onTheme={props.onTheme} onSend={props.onSend} onOpenSettings={props.onOpenSettings} onHome={props.onHome} onOpenLeft={()=>setDrawer('left')} onOpenRight={()=>setDrawer('right')} onApprove={props.onApprove} onReject={props.onReject} onEdit={props.onEdit} onMastery={props.onMastery} onCamera={props.onCamera} onDoodle={props.onDoodle} attachment={props.attachment} onAttachment={props.onAttachment} onClearAttachment={props.onClearAttachment}/>
      <ProgressPanel area={area} tasks={props.state.tasks} mastery={props.state.mastery} budget={props.state.budget} moodHistory={props.state.moodHistory} onMood={props.onMood} onToggleTask={props.onToggleTask} onDeleteTask={props.onDeleteTask} studySubjects={props.state.studySubjects} studyTimer={props.state.studyTimer} onAddSubject={props.onAddSubject} onAddTopic={props.onAddTopic} onToggleTopic={props.onToggleTopic} onMoveTopic={props.onMoveTopic} onStartPause={props.onStartPause} onResetTime={props.onResetTime} onClose={()=>setDrawer(null)}/>
    </div>
    {drawer&&<div className="drawer-scrim active" onClick={()=>setDrawer(null)} aria-hidden="true"/>}
    {drawer&&<style>{`@media(max-width:760px){.app-sidebar{display:${drawer==='left'?'flex':'none'}!important;position:fixed;left:0;top:74px;bottom:0;width:min(310px,88vw);z-index:46;box-shadow:12px 0 65px #0005}.app-progress{display:${drawer==='right'?'block':'none'}!important;position:fixed;right:0;top:74px;bottom:0;width:min(360px,92vw);z-index:46;box-shadow:-12px 0 65px #0005}} @media(min-width:761px) and (max-width:1250px){.app-progress{display:${drawer==='right'?'block':'none'}!important;position:fixed;right:0;top:74px;bottom:0;width:min(360px,92vw);z-index:46;box-shadow:-12px 0 65px #0005}}`}</style>}
  </>;
}

```

---

## `src/pages/LandingPage.jsx`

```jsx
import React,{useState} from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Check, ShieldCheck, LockKeyhole, LifeBuoy, Sparkles, Menu, X, Moon, Sun, Zap, ChevronRight, MessageCircle, CheckCircle2, Clock3, BrainCircuit, CalendarClock, PenTool, ChartNoAxesCombined, Gauge } from 'lucide-react';
import { AREAS, FEATURE_CARDS } from '../data/mockData';
import Logo from '../components/Logo';
import AreaArt from '../components/AreaArt';
import Modal from '../components/Modal';
const featureIcons={BrainCircuit,ShieldCheck,CalendarClock,PenTool,ChartNoAxesCombined,Gauge};
const entrance={initial:{opacity:0,y:18},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.15},transition:{duration:.48}};
export default function LandingPage({onStart,theme,onTheme}){
  const [demo,setDemo]=useState(false),[menu,setMenu]=useState(false);
  return <><div className="bg-ambient"/><div className="min-h-screen">
    <nav className="nav-shell"><div className="container-app flex items-center justify-between gap-4 h-[76px]">
      <a href="#home" aria-label="Ops Flow AI home"><Logo/></a>
      <div className="hidden md:flex items-center gap-7 text-[13px] font-semibold muted"><a className="hover:text-violet" href="#features">Features</a><a className="hover:text-violet" href="#areas">Life Areas</a><a className="hover:text-violet" href="#how">How it works</a><a className="hover:text-violet" href="#pricing">Pricing</a></div>
      <div className="flex items-center gap-2"><button title="Toggle theme" className="icon-btn" onClick={onTheme} aria-label="Toggle dark or light theme">{theme==='dark'?<Sun size={19}/>:<Moon size={19}/>}</button><button className="btn btn-ghost btn-small hidden sm:inline-flex" onClick={onStart}>Sign in</button><button className="btn btn-primary btn-small glow-btn" onClick={onStart}>Get started <ArrowRight size={15}/></button><button className="icon-btn md:hidden" onClick={()=>setMenu(!menu)} aria-label="Open navigation menu">{menu?<X/>:<Menu/>}</button></div>
    </div>{menu&&<div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm"><a onClick={()=>setMenu(false)} href="#features">Features</a><a onClick={()=>setMenu(false)} href="#areas">Life Areas</a><a onClick={()=>setMenu(false)} href="#how">How it works</a><a onClick={()=>setMenu(false)} href="#pricing">Pricing</a></div>}</nav>
    <main>
      <section id="home" className="container-app grid lg:grid-cols-[.95fr_1.05fr] gap-10 items-center pt-16 pb-24 lg:pt-28 lg:pb-36 relative">
        <motion.div {...entrance} className="relative z-10">
          <div className="tag mb-7 text-xs" style={{color:'#B7A9FF',borderColor:'rgba(124,92,255,.3)'}}><Sparkles size={14}/> YOUR PERSONAL OPERATIONS COPILOT <span className="text-amber">✦</span></div>
          <h1 className="heading-lg max-w-[670px]">Turn any instruction into <span className="gradient-text">a plan that works.</span></h1>
          <p className="text-[17px] leading-[1.8] muted max-w-[550px] mt-7 mb-9">From exam weeks to work projects and everyday habits. One beautiful space to turn ideas into tasks, reminders, workflows and real progress.</p>
          <div className="flex flex-wrap gap-3"><button className="btn btn-primary glow-btn px-7 py-4" onClick={onStart}>Start free <ArrowRight size={18}/></button><button className="btn btn-ghost px-6 py-4" onClick={()=>setDemo(true)}><Play size={17}/> Watch demo</button></div>
          <div className="flex flex-wrap items-center gap-5 mt-10 text-xs muted"><span className="flex items-center gap-2"><Check size={16} className="success"/> No credit card</span><span className="flex items-center gap-2"><Check size={16} className="success"/> Private browser prototype</span><span className="flex items-center gap-2"><Check size={16} className="success"/> No setup</span></div>
        </motion.div>
        <motion.div {...entrance} transition={{delay:.14,duration:.55}} className="hero-illustration relative pt-6 lg:pt-0">
          <div className="gradient-orb w-[230px] h-[230px] bg-violet/20 left-1/4 top-2"/>
          <div className="glass rounded-3xl landing-mock p-4 sm:p-6 max-w-[590px] mx-auto relative overflow-hidden">
            <div className="flex justify-between items-center pb-4 dash-line border-t-0" style={{borderBottom:'1px solid var(--line)'}}><div className="flex items-center gap-3"><Logo compact/><div><p className="text-[13px] font-bold mb-0">Ops Flow AI</p><p className="text-[11px] muted mb-0">Instruction → Outcome</p></div></div><span className="tag"><span className="w-2 h-2 rounded-full bg-emerald"/> Live preview</span></div>
            <div className="mt-6 flex justify-end"><div className="max-w-[85%] gradient-bg rounded-[16px_16px_4px_16px] text-sm px-4 py-3">Plan my Java test, submit my report and fit in 4 gym sessions.</div></div>
            <div className="flex items-center gap-2 text-xs muted mt-5 mb-3"><Sparkles size={15} className="text-violet"/> Working through your goals...</div>
            <div className="surface rounded-2xl p-4"><div className="flex items-center justify-between mb-3"><h3 className="mb-0 text-sm font-bold">Your action plan</h3><span className="tag text-emerald">4 tasks</span></div>
              {[['Revise Java concepts','Fri','Education'],['Finish status report','Mon','Work'],['Gym · Strength','Tue','Fitness'],['Gym · Cardio + mobility','Thu','Fitness']].map(([title,date,area],i)=><motion.div initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} transition={{delay:.25+i*.15}} key={title} className="flex items-center gap-3 py-3" style={{borderTop:i?'1px solid var(--line)':'none'}}><span className="w-5 h-5 rounded-md border border-violet/70 grid place-items-center text-violet"><Check size={12}/></span><div className="flex-1 min-w-0"><p className="text-xs font-semibold mb-0 truncate">{title}</p><span className="text-[10px] muted">{area}</span></div><span className="text-[11px] muted">{date}</span></motion.div>)}
              <button onClick={onStart} className="btn w-full btn-primary btn-small mt-3">Review & approve plan <ArrowRight size={14}/></button>
            </div>
            <div className="flex justify-between items-center text-[11px] muted pt-4"><span className="flex items-center gap-1"><ShieldCheck size={13}/> You stay in control</span><span className="flex items-center gap-1"><Clock3 size={13}/> Simulated in seconds</span></div>
          </div>
          <div className="absolute -left-2 top-2 hidden xl:flex items-center gap-2 glass rounded-2xl px-3 py-2 text-xs"><Zap size={16} className="text-amber"/> <b>3-day streak!</b></div>
        </motion.div>
      </section>
      <section id="features" className="container-app section-pad"><motion.div {...entrance} className="text-center max-w-[610px] mx-auto mb-14"><p className="eyebrow">ONE IDEA. REAL MOMENTUM.</p><h2 className="section-title mb-4">Less juggling. <span className="gradient-text">More doing.</span></h2><p className="muted leading-7">Smart structure that turns intentions into the next right action.</p></motion.div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{FEATURE_CARDS.map(([icon,title,description],i)=>{const Icon=featureIcons[icon];return <motion.div key={title} {...entrance} transition={{duration:.38,delay:(i%3)*.07}} className="glass rounded-3xl p-6 lift"><span className="w-12 h-12 rounded-2xl grid place-items-center mb-5" style={{background:'rgba(124,92,255,.15)',color:'#9C8DFF'}}><Icon size={23}/></span><h3 className="text-lg font-bold mb-2">{title}</h3><p className="muted text-sm leading-7 mb-0">{description}</p></motion.div>})}</div></section>
      <section id="areas" className="section-pad" style={{background:'linear-gradient(180deg, transparent,rgba(124,92,255,.04),transparent)'}}><div className="container-app"><motion.div {...entrance} className="mb-12"><p className="eyebrow">FOR EVERY SIDE OF YOU</p><h2 className="section-title mb-4">One home for all your <span className="gradient-text">life areas.</span></h2><p className="muted max-w-[570px]">Choose a space. Your assistant adapts the plan and the progress tracker to what matters there.</p></motion.div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{AREAS.map((a,i)=><motion.button type="button" {...entrance} key={a.id} onClick={()=>onStart(a.id)} className="glass rounded-3xl p-5 text-left lift group"><div className="flex justify-between items-start"><AreaArt area={a.id} color={a.color}/>{i>=6?<span className="tag text-[10px]">Coming soon</span>:null}</div><h3 className="text-lg font-bold mt-3 mb-2">{a.id}</h3><p className="text-[13px] muted min-h-[62px] leading-6">{a.description}</p><span className="inline-flex items-center gap-1 text-xs font-bold" style={{color:a.color}}>Explore <ChevronRight size={14} className="group-hover:translate-x-1 transition"/></span></motion.button>)}</div></div></section>
      <section id="how" className="container-app section-pad"><motion.div {...entrance} className="text-center mb-14"><p className="eyebrow">YOUR WORKFLOW, SIMPLIFIED</p><h2 className="section-title">From thought to <span className="gradient-text">done.</span></h2></motion.div><div className="grid md:grid-cols-4 gap-5 relative"><div className="hidden md:block absolute h-[2px] top-[35px] left-[13%] right-[13%]" style={{background:'linear-gradient(90deg,#7C5CFF,#22D3EE)'}}/>{[['01','Describe','Tell Ops Flow AI what you need.'],['02','Review draft','Check deadlines, dependencies and priorities.'],['03','Approve','Choose what gets saved to your dashboard.'],['04','Track progress','Celebrate real progress as tasks get done.']].map(([n,t,txt])=><motion.div {...entrance} key={n} className="relative text-center"><div className="gradient-outline relative mx-auto rounded-2xl w-[70px] h-[70px] grid place-items-center text-xl font-display font-bold mb-5">{n}</div><h3 className="font-bold text-lg mb-2">{t}</h3><p className="muted text-sm leading-6">{txt}</p></motion.div>)}</div></section>
      <section className="container-app pb-24"><div className="glass rounded-3xl p-7 md:p-10"><div className="grid md:grid-cols-3 gap-8">{[[ShieldCheck,'Guidance, not diagnosis','Not a doctor or financial advisor. Verify important decisions with a professional.'],[LockKeyhole,'Private by default','This demo saves locally in your browser. There is no server or account.'],[LifeBuoy,'Support when it matters','Sensitive messages pause planning and offer a link to support resources.']].map(([Icon,t,d])=><div key={t}><Icon className="text-cyan mb-4" size={23}/><h3 className="text-base font-bold mb-2">{t}</h3><p className="muted text-xs leading-6 mb-0">{d}</p></div>)}</div></div></section>
      <section id="pricing" className="container-app pb-24"><div className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden" style={{background:'linear-gradient(120deg,rgba(124,92,255,.22),rgba(34,211,238,.12))',border:'1px solid rgba(124,92,255,.34)'}}><p className="eyebrow">PRICING</p><h2 className="section-title">Your fresh start costs <span className="gradient-text">nothing.</span></h2><p className="muted mt-4 mb-6">Free prototype · no payment details · start planning right away.</p><button onClick={onStart} className="btn btn-primary glow-btn">Open Ops Flow AI <ArrowRight size={18}/></button></div></section>
    </main>
    <footer className="container-app py-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{borderColor:'var(--line)'}}><Logo/><p className="text-xs muted mb-0">Made for the hackathon · Built to turn ideas into action</p><div className="flex flex-wrap gap-4 text-xs muted"><a href="#features">Features</a><a href="#areas">Life Areas</a><a href="#pricing">Pricing</a><span>© {new Date().getFullYear()} Ops Flow AI</span></div></footer>
  </div>
  {demo&&<Modal title="Watch the 45-second demo — interactive version" onClose={()=>setDemo(false)}><p className="muted text-sm leading-7">The demo turns a single goal into a reviewable task plan, saves it after approval and tracks progress in the right panel. Since this is a front-end prototype, you can try the complete experience directly.</p><div className="surface rounded-2xl p-5 flex flex-col gap-4"><p className="text-sm font-semibold">1. Type “Plan my Java test on Friday”</p><p className="text-sm font-semibold">2. Review the generated task cards</p><p className="text-sm font-semibold">3. Approve → tasks appear in Today</p><p className="text-sm font-semibold">4. Ask for a Java quiz to increase mastery</p></div><button className="btn btn-primary w-full mt-5" onClick={()=>{setDemo(false);onStart();}}>Try the live demo <ArrowRight size={16}/></button></Modal>}
  </>;
}

```

---

## `src/styles/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
:root{font-family:Inter,sans-serif;color-scheme:dark;--base:#0B1020;--surface:#121A2F;--raised:#1A2442;--text:#E6EAF5;--muted:#A4AEC9;--line:rgba(172,190,236,.14);--glass:rgba(18,26,47,.81);--shadow:0 25px 75px rgba(0,0,0,.25)}
:root.light{color-scheme:light;--base:#F1F4FC;--surface:#FFFFFF;--raised:#EAF0FB;--text:#15203A;--muted:#53617B;--line:rgba(38,54,90,.14);--glass:rgba(255,255,255,.85);--shadow:0 20px 55px rgba(57,66,100,.09)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-height:100vh;background:var(--base);color:var(--text);transition:background .25s,color .25s}button,input,textarea,select{font:inherit}button{cursor:pointer}button:disabled{cursor:not-allowed;opacity:.5}a{color:inherit;text-decoration:none}h1,h2,h3,h4{font-family:'Space Grotesk',sans-serif;letter-spacing:-.025em}h1,h2,h3,h4,p{margin-top:0}::selection{background:#7964f4;color:white}:focus-visible{outline:2px solid #22D3EE!important;outline-offset:3px}
#root{min-height:100vh}.bg-ambient{position:fixed;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(ellipse 35% 25% at 20% 9%,rgba(124,92,255,.15),transparent),radial-gradient(ellipse 30% 25% at 87% 50%,rgba(34,211,238,.07),transparent),linear-gradient(var(--base),var(--base))}.bg-ambient:after{content:"";position:absolute;inset:0;opacity:.13;background-image:linear-gradient(rgba(122,149,214,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(122,149,214,.15) 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(to bottom,black,transparent 85%)}
.glass{background:var(--glass);border:1px solid var(--line);box-shadow:var(--shadow);backdrop-filter:blur(18px)}.surface{background:var(--surface);border:1px solid var(--line)}.raised{background:var(--raised);border:1px solid var(--line)}.muted{color:var(--muted)}.gradient-text{background:linear-gradient(105deg,#B3A4FF,#8E8CFF 55%,#22D3EE);-webkit-background-clip:text;background-clip:text;color:transparent}.gradient-bg{background:linear-gradient(115deg,#6445D6,#554BC5 45%,#316D9B);color:#fff}.glow-btn{box-shadow:0 10px 28px rgba(106,88,255,.28);transition:transform .2s,box-shadow .2s}.glow-btn:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(106,88,255,.48)}.lift{transition:transform .22s,border-color .22s,box-shadow .22s}.lift:hover{transform:translateY(-4px);border-color:rgba(124,92,255,.55);box-shadow:0 20px 40px rgba(36,36,90,.14)}.btn{display:inline-flex;align-items:center;justify-content:center;gap:.6rem;border-radius:13px;padding:.75rem 1.15rem;font-weight:700;line-height:1.2;border:1px solid transparent;white-space:nowrap}.btn-primary{background:linear-gradient(110deg,#6445D6,#3467AC);color:#fff}.btn-quiet{border:1px solid var(--line);background:var(--raised);color:var(--text)}.btn-ghost{border:1px solid var(--line);color:var(--text)}.btn-small{padding:.52rem .75rem;border-radius:10px;font-size:.78rem}.icon-btn{display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;background:transparent;color:var(--muted);width:36px;height:36px;border-radius:11px}.icon-btn:hover,.icon-btn.active{background:var(--raised);color:var(--text);border-color:var(--line)}.icon-btn.active{box-shadow:0 0 0 4px rgba(244,63,94,.14)}.field{background:var(--raised);border:1px solid var(--line);border-radius:12px;color:var(--text);padding:.72rem .85rem;width:100%;outline:0}.field:focus{border-color:#7C5CFF}.field::placeholder{color:var(--muted);opacity:.8}.tag{display:inline-flex;align-items:center;gap:.35rem;font-size:.72rem;border:1px solid var(--line);border-radius:999px;padding:.3rem .64rem;color:var(--muted)}.eyebrow{color:#AC9CFF;letter-spacing:.13em;text-transform:uppercase;font-size:.69rem;font-weight:800}.heading-lg{font-size:clamp(2.5rem,5.4vw,5.2rem);line-height:1.05;font-weight:700}.section-title{font-size:clamp(1.9rem,3.3vw,3rem);line-height:1.12;font-weight:700}.dash-line{border-top:1px solid var(--line)}.progress-track{background:var(--raised);border-radius:999px;height:7px;overflow:hidden}.progress-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#7C5CFF,#22D3EE);transition:width .65s ease}.nav-shell{position:sticky;top:0;z-index:35;border-bottom:1px solid var(--line);background:var(--glass);backdrop-filter:blur(24px)}.container-app{max-width:1440px;margin:auto;padding-left:24px;padding-right:24px}.section-pad{padding-top:108px;padding-bottom:108px}.app-grid{display:grid;grid-template-columns:260px minmax(0,1fr) 310px;height:calc(100dvh - 74px);min-height:520px;max-width:1750px;margin:0 auto;gap:1px}.app-sidebar{overflow:auto;border-right:1px solid var(--line);background:var(--glass)}.app-chat{min-width:0;display:flex;flex-direction:column;overflow:hidden;position:relative}.app-progress{overflow:auto;border-left:1px solid var(--line);background:var(--glass)}.messages-scroll{overflow:auto;min-height:0;flex:1;scroll-behavior:smooth}.chat-composer{border-top:1px solid var(--line);padding:16px 22px 20px;background:var(--glass)}.chat-bubble-user{background:linear-gradient(110deg,#6857DC,#506EE9);border:1px solid rgba(255,255,255,.12);color:#fff;border-radius:19px 19px 5px 19px;max-width:min(84%,600px);padding:13px 17px}.chat-bubble-ai{background:var(--glass);border:1px solid var(--line);border-radius:19px 19px 19px 5px;max-width:min(93%,710px);padding:18px;box-shadow:0 8px 20px rgba(0,0,0,.04)}.task-mini{background:var(--raised);border:1px solid var(--line);padding:12px 14px;border-radius:14px}.typing span{width:7px;height:7px;background:#A9A1FB;border-radius:50%;display:inline-block;margin:0 3px;animation:bounce 1.15s ease-in-out infinite}.typing span:nth-child(2){animation-delay:.16s}.typing span:nth-child(3){animation-delay:.32s}@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}.gradient-outline{background:linear-gradient(var(--surface),var(--surface)) padding-box,linear-gradient(110deg,#7C5CFF,#22D3EE) border-box;border:1px solid transparent}.modal-backdrop{position:fixed;inset:0;z-index:80;background:rgba(3,8,21,.76);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px}.modal-panel{background:var(--surface);border:1px solid var(--line);border-radius:24px;box-shadow:0 30px 80px rgba(0,0,0,.45);width:min(100%,640px);max-height:min(90dvh,900px);overflow:auto}.landing-mock{box-shadow:0 50px 110px rgba(0,0,0,.35),0 0 75px rgba(124,92,255,.12)}.gradient-orb{position:absolute;border-radius:999px;filter:blur(54px);pointer-events:none}.hero-illustration{background:radial-gradient(circle at 50% 36%,rgba(124,92,255,.24),transparent 66%)}.danger{color:#F43F5E}.success{color:#10B981}.safe-note{background:rgba(245,158,11,.09);border:1px solid rgba(245,158,11,.23);border-radius:12px;padding:10px 12px;color:var(--text);font-size:.77rem}.drawer-scrim{display:none}.streak-cell{height:35px;flex:1;min-width:0;border-radius:8px}.side-nav-item{border-radius:13px;display:flex;align-items:center;gap:10px;padding:12px;cursor:pointer;border:1px solid transparent;color:var(--muted);width:100%;text-align:left}.side-nav-item:hover,.side-nav-item.selected{color:var(--text);background:var(--raised);border-color:var(--line)}.work-step{position:relative;flex:1;min-width:140px}.work-step:not(:last-child):after{content:'→';position:absolute;right:-19px;top:25px;color:#9B8CFF}.svg-ring{transform:rotate(-90deg);transform-origin:center}.quiz-ring{transition:stroke-dashoffset .45s,stroke .4s}.option{border:1px solid var(--line);background:var(--raised);border-radius:12px;padding:11px 12px;text-align:left;width:100%;display:flex;align-items:center;gap:10px}.option:hover{border-color:#7C5CFF}.option.correct{border-color:#10B981;background:rgba(16,185,129,.12)}.option.incorrect{border-color:#F43F5E;background:rgba(244,63,94,.11)}.soft-scroll::-webkit-scrollbar{width:7px}.soft-scroll::-webkit-scrollbar-thumb{background:rgba(141,146,186,.25);border-radius:8px}.doodle-canvas{background:#F9FAFD;touch-action:none;cursor:crosshair;width:100%;height:280px;border-radius:13px;border:1px solid #CAD3E9}.surface-label{font-size:.71rem;color:var(--muted);letter-spacing:.08em;text-transform:uppercase;font-weight:800}
@media(max-width:1250px){.app-grid{grid-template-columns:230px minmax(0,1fr)}.app-progress{display:none}.app-progress.panel-open{display:block;position:fixed;right:0;top:74px;bottom:0;width:min(360px,92vw);z-index:45;box-shadow:-12px 0 65px #0004}.work-step{min-width:130px}}
@media(max-width:760px){.app-grid{display:block;height:calc(100dvh - 65px)}.app-sidebar{display:none}.app-sidebar.panel-open{display:block;position:fixed;left:0;top:74px;bottom:0;width:min(310px,88vw);z-index:45;box-shadow:12px 0 65px #0005}.app-progress.panel-open{top:74px}.drawer-scrim.active{display:block;position:fixed;inset:74px 0 0;z-index:43;background:rgba(0,0,0,.6)}.app-chat{height:100%}.chat-composer{padding:11px 12px 16px}.container-app{padding-left:18px;padding-right:18px}.section-pad{padding-top:75px;padding-bottom:75px}.chat-bubble-ai{max-width:97%}.chat-bubble-user{max-width:90%}.work-step:after{display:none}.top-modes{overflow:auto;max-width:100%}.mobile-hide{display:none!important}}
@media(min-width:761px) and (max-width:1250px){.tablet-progress-button{display:inline-flex}}
@media(min-width:1251px){.tablet-progress-button{display:none}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}}
.reduce-motion *, .reduce-motion *::before,.reduce-motion *::after{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}

```

---

## `src/utils/engine.js`

```javascript
import { SAMPLE_PLAN, JAVA_QUESTIONS } from '../data/mockData.js';
// These deterministic local response rules are the five future integration points.
export const uid = () => globalThis.crypto?.randomUUID?.() || `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const fmtDate = (date) => date && !Number.isNaN(new Date(`${date}T12:00:00`).getTime()) ? new Date(`${date}T12:00:00`).toLocaleDateString(undefined,{month:'short',day:'numeric'}) : 'No date';
export const today = () => {const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export const isCrisis = (message) => /\b(suicid(?:e|al)|self[-\s]?harm|kill myself|end my life|want to die|hurt myself|take my life|don't want to live)\b/i.test(message);
export function detectArea(text, fallback='Education'){
  if(/budget|money|finance|spend|saving|expense|invest|debt/i.test(text))return 'Finance';
  if(/exercise|gym|fitness|workout|cardio|strength/i.test(text))return 'Fitness';
  if(/meeting|report|project|client|employee|manager|work|deadline/i.test(text))return 'Work';
  if(/mood|anxious|stress|overwhelm|sad|feel down|mental/i.test(text))return 'Mental support';
  if(/sleep|water|habit|hydration/i.test(text))return 'Health habits';
  if(/motivat|productive|inspir/i.test(text))return 'Motivation';
  if(/clean|errand|personal|shopping/i.test(text))return 'Personal life';
  if(/java|exam|study|quiz|learn|subject|concept|revision|test/i.test(text))return 'Education';
  return fallback;
}
const later=(days)=>{const d=new Date(); d.setDate(d.getDate()+days);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
// REPLACE #1/#2: call your LLM on the server to generate replies and plan drafts.
export function generateReply(input, area, speed){
  const t=input.toLowerCase();
  const note=(area==='Finance'||area==='Health habits'||area==='Fitness'||area==='Mental support')?'General guidance only. Please consult a qualified professional.':null;
  if(/quiz|test me|questions|practice questions/i.test(t)) return {kind:'quiz',text:'Let’s check your Java foundations. Ten questions, three formats, and feedback as you go.',questions:JAVA_QUESTIONS};
  if(/workflow|meeting notes|steps|doodle|process|pipeline/i.test(t)) return {kind:'workflow',text:'Here is a proposed workflow. Each step builds on the previous one.',steps:[{name:'Collect inputs',detail:'Gather requirements & notes'},{name:'Prioritize',detail:'Sort by impact & deadline'},{name:'Execute',detail:'Work through action items'},{name:'Review & share',detail:'Verify and communicate'}],note};
  if(/plan|schedule|remind|task|week|budget|gym|report|study|prepare|revision|exam|friday|monday|todo|to-do/i.test(t)){
    let items;
    if(/java.+report|report.+gym|gym.+java/i.test(t) || (t.includes('java')&&t.includes('report')))items=SAMPLE_PLAN;
    else if(area==='Fitness')items=['Warm-up and mobility','Strength circuit','Cardio session','Recovery and stretch'].map((title,i)=>({title,due:later(i+1),priority:i===0?'High':'Medium',minutes:35,area}));
    else if(area==='Finance')items=['List fixed expenses','Categorize flexible spending','Set weekly spending limit','Review saving goal'].map((title,i)=>({title,due:later(i+1),priority:'Medium',minutes:20,area}));
    else if(area==='Work')items=['Clarify the outcome','Collect required inputs','Draft the deliverable','Review and submit'].map((title,i)=>({title,due:later(i+1),priority:i===3?'High':'Medium',minutes:45,area}));
    else if(area==='Mental support')items=['Check in with your mood','Take a short calming break','Choose one manageable step'].map((title,i)=>({title,due:later(i),priority:'Low',minutes:10,area}));
    else items=['Review Java variables','Practise loops and arrays','Learn OOP fundamentals','Take a Java knowledge quiz'].map((title,i)=>({title,due:later(i+1),priority:i===3?'High':'Medium',minutes:30+i*5,area:'Education'}));
    return {kind:'plan',text:`I've drafted ${items.length} clear steps for your ${area.toLowerCase()} goal. Review before anything is added to your tracker.`,items,note};
  }
  const quick = speed==='Fast'?'Here’s a quick starting point: ':speed==='Deep'?'Here’s a thoughtful way to approach this: ':'Here’s a practical next step: ';
  return {kind:'text',text:quick + ({'Education':'break the topic into small lessons and practise one at a time. Ask for a quiz or study plan.', 'Work':'define the desired result, then list deadlines, owners and action items. Ask for a workflow.', 'Fitness':'choose manageable sessions and focus on consistency. Ask for a weekly workout plan.', 'Finance':'track your income and spending before deciding on a budget. Ask for a monthly budget plan.', 'Mental support':'notice what you need right now and consider one gentle next step. You can also use the mood check-in.', 'Health habits':'start with a small routine you can repeat. Ask for a habit schedule.'}[area] || 'describe a specific goal and I can break it into steps.'),note};
}

```

---

## `src/utils/storage.js`

```javascript
const KEY='ops-flow-ai-prototype-v1';
export function loadState(){
  try { const raw=localStorage.getItem(KEY); return raw?JSON.parse(raw):null; }catch{return null;}
}
export function saveState(state){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{ /* private browsing may block storage */ }}
export function clearState(){try{localStorage.removeItem(KEY);}catch{}}

```

---

## `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B1020', slateCard: '#121A2F', slateRaised: '#1A2442',
        violet: '#7C5CFF', cyan: '#22D3EE', amber: '#F59E0B',
        emerald: '#10B981', rose: '#F43F5E', muted: '#8A94B3'
      },
      fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Space Grotesk', 'sans-serif'] },
      borderRadius: { '2xl': '20px', '3xl': '24px' }
    }
  },
  plugins: []
};

```

---

## `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative asset paths make the build work in GitHub Pages subfolders.
export default defineConfig({ plugins: [react()], base: './' });

```
