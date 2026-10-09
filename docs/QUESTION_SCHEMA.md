# Question JSON schema (v1)

```
{ schemaVersion, topic{slug,title}, modules[ { id, order, slug, heading, introduction,
    questions[ { id, q, difficulty, tags?, description?[blocks], answer[blocks] } ] } ] }
```

| Field | Notes |
|---|---|
| `id` | Unique & stable, e.g. `react-m7-q3` (used for progress tracking / URLs later) |
| `q` | Question title, plain string |
| `difficulty` | `easy` \| `medium` \| `hard` |
| `description` | Optional blocks shown under the question (e.g. "predict the output" code) |
| `answer` | Array of blocks (below) |

## Block types
| type | fields |
|---|---|
| `text` | `value` — supports `**bold**` and `` `inline code` `` |
| `list` | `ordered` (bool), `items[]` |
| `code` | `language`, `value`, optional `title` (use `\n` for new lines) |
| `image` | `src` (file in `public/images/...`), `alt`, optional `caption` |
| `note` | `variant` (`tip` \| `warning`), `value` |

Images live in `public/images/<topic>/` and are referenced as `/images/<topic>/name.png`.
Later, the same JSON shape can be returned by the backend API unchanged.
