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
