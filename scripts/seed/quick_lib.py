import json, os
OUT = os.path.join(os.path.dirname(__file__), "../../src/features/quick/data")

def L(*items): return ("l", list(items))
def OL(*items): return ("ol", list(items))
def C(lang, code): return ("c", lang, code)
def N(text, variant="tip"): return ("n", text, variant)

def block(p):
    if isinstance(p, str): return {"type": "text", "value": p}
    k = p[0]
    if k == "l": return {"type": "list", "items": p[1]}
    if k == "ol": return {"type": "list", "ordered": True, "items": p[1]}
    if k == "c": return {"type": "code", "language": p[1], "value": p[2].strip("\n")}
    if k == "n": return {"type": "note", "variant": p[2], "value": p[1]}

def build(slug, title, subtitle, qs):
    out = []
    for i, (pr, df, q, *parts) in enumerate(qs, 1):
        out.append({"id": f"{slug}-q{i}", "q": q, "difficulty": df, "priority": pr,
                    "answer": [block(p) for p in parts]})
    data = {"schemaVersion": 1, "topic": {"slug": slug, "title": title, "subtitle": subtitle}, "questions": out}
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, f"{slug}.json"), "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(slug, len(out))
