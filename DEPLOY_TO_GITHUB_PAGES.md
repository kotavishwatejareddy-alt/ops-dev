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
