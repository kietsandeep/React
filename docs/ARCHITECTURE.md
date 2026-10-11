# CodeCrest — how the site is wired

Everything visible (menu, footer, home sections, carousel, cards, hub pages) is read from JSON in `src/config/`.
Components call the getters in `src/config/registry.js`; they never import the JSON directly.

| I want to… | Do this |
|---|---|
| Rename the site | Edit `config/site.json` |
| Add a menu item | Add an entry to `config/navigation.json`. Use `"collection": "<id>"` to auto-build a dropdown from a collection |
| Add a footer column/link | Edit `config/footer.json` (`collection` columns fill themselves) |
| Reorder / add / remove a home section | Edit `sections` in `config/home.json` (types: hero, stats, cards, steps, cta) |
| Add a carousel slide | Add to `slides` in `config/home.json` (visual types: code, checklist, topics, tests, progress) |
| Add a **Quick Revision technology** | 1) add an item to `config/collections/quick.json` 2) add `features/quick/data/<slug>.json`. Card, hub entry, menu/footer link and route appear automatically |
| Add an **Interview Q&A topic** | Item in `collections/topics.json` + `features/topics/data/<slug>.json` |
| Add a **practice track** | Item in `collections/practice.json` + `features/practice/data/<slug>.json` (count is derived) |
| Add a whole new collection (new hub page) | Drop `config/collections/<id>.json` (meta.hubPath, meta.card …). The route and hub page are generated |
| New card style | Add a component to `CARD_COMPONENTS` in `features/home/components/CollectionSection` |
| New question type / workspace UI | Register it in `features/workspace/registry.js` and set `"kind"` in the problem JSON |

## Quick Revision data
`features/quick/data/<slug>.json`:
```json
{ "schemaVersion": 1,
  "topic": { "slug": "react", "title": "…", "subtitle": "…" },
  "questions": [ { "id": "react-q1", "q": "…", "difficulty": "easy|medium|hard",
                   "priority": "must|good", "answer": [ {"type":"text","value":"…"} ] } ] }
```
Answer blocks: `text`, `list` (`ordered`), `code` (`language`, `value`), `note`, `image`. Inline `**bold**` and `` `code` `` work in text/list/note.
`scripts/seed/*.py` generated the first content; after that the JSON is the source of truth.

## Later: backend
Services (`quickService`, `practiceService`, `topicService`, `registry`) are the only data entry points — swap them for API calls.
