# Architecture

**Trust label:** `educational-reference`  
**Repo:** `wax-on-chain-education-credential-issuer`

---

## Purpose

A local list of learner and course pairs gated by a required lesson. Expiry and salted disclosure are other repos. Nothing is minted; nothing is signed here.

---

## System overview

```
┌──────────────────────────────────────────────┐
│              Offline demo UI                  │
│              Demo.tsx · Cases.tsx             │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│         decide / record (pure)                │
│              issue.ts                         │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│         Unsent request builders               │
│         api.ts · usecases.ts                  │
└──────────────────────────────────────────────┘
```

---

## Layers

1. **Eligibility** — `decide` validates names/slugs and required lesson
2. **Local record** — `record` appends or refuses duplicates (≤20 rows)
3. **Builders** — Educational unsent API shapes
4. **Demo** — Same pure functions as tests

---

## Honesty boundaries

| Boundary | Enforcement |
|----------|-------------|
| No mint | No chain write path |
| No hash/VC | Neighbor repos |
| Argument-only done/existing lists | Pure functions |

---

## Deep docs

- [docs/ISSUANCE-RULES.md](docs/ISSUANCE-RULES.md)
- [docs/WORKED-EXAMPLES.md](docs/WORKED-EXAMPLES.md)
- [VERIFICATION-LOG.md](VERIFICATION-LOG.md)
- [README.md](README.md)

---

*Pixel Journey — Architecture that records eligibility, not NFTs.*
