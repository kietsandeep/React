# InterviewDepth clone (React + Vite)

```bash
npm install
npm run dev          # http://localhost:5173
npm run build
```

## Adding your questions
1. `node scripts/convert-questions.mjs ./your-old-data.js src/features/topics/data/react.json react`
2. Add code/screenshots to answers in `react.json` (see docs/QUESTION_SCHEMA.md)
3. Put images in `public/images/react/` and reference as `/images/react/name.png`

`topicService` loads `<slug>.json`, falling back to `<slug>.sample.json`.
Routes: `/` home, `/topics/react` question list (`?module=<module-slug>` selects a module).
