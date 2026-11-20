# wax-on-chain-education-credential-issuer

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** Educational pure-function reference + Deep documentation pass  
> **Catalog:** `wax-ecosystem-blueprint-catalog` (private index; not this public course)

**One-sentence goal:** Decide and record whether a learner may be credited for a course **only after** the required lesson is present in their completed list — with pure functions, no minting, and no on-chain submission from this package.

**Core rule (do not weaken):**  
Nothing is minted. The lists are arguments. `alice` finished `intro`, so `wax-101` can be recorded; `bob` has not, so he is refused. This repo does not hash and it does not submit transactions.

---

## Deep educational documentation

| Guide | What it teaches |
|-------|-----------------|
| [docs/ISSUANCE-RULES.md](docs/ISSUANCE-RULES.md) | decide/record steps, validation, duplicates, non-mint boundaries |
| [docs/WORKED-EXAMPLES.md](docs/WORKED-EXAMPLES.md) | Alice success, Bob refusal, duplicate refusal, invalid inputs |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Layers, honesty boundaries |

---

## 1. Overview & Goal

Isolates the **gating rule** for educational credits: required lesson must be done; duplicates refused; minting and hashing left to other layers and repos.

**Success metrics:**
- Unit tests lock alice recorded + bob/duplicate refused
- Request builders stay pure (`executed: false`)
- Docs never claim a mint or on-chain attestation from this package

---

## 2. Concepts

- Required-lesson gate (`course.requires` ∈ `done`)
- Duplicate refusal for same learner+course
- Argument-only `existing` and `done` lists
- Neighbors: advanced education tools, verifiable-credential patterns, learning-path visualizer

---

## 3. Design & pieces

| Piece | Role |
|-------|------|
| `src/issue.ts` | Pure `decide` / `record` |
| `src/issue.test.ts` | Alice / Bob / duplicate |
| `src/api.ts` / `usecases.ts` | Unsent builders |
| `docs/*` | Deep teaching guides |

---

## 4. Technical architecture

See **[ARCHITECTURE.md](ARCHITECTURE.md)** and **[docs/ISSUANCE-RULES.md](docs/ISSUANCE-RULES.md)**.

```
decide → validate → required lesson check
record → bound rows → decide → refuse duplicate → append
```

---

## 5. Examples

```ts
import { record } from "./src/issue";
const course = { id: "wax-101", requires: "intro" };

record([], "alice", course, ["intro"]); // ok: true
record([], "bob", course, []);          // ok: false
```

More: [docs/WORKED-EXAMPLES.md](docs/WORKED-EXAMPLES.md).

---

## 6. Demo & testing

```bash
npm install && npm test && npm run dev
```

See [VERIFICATION-LOG.md](VERIFICATION-LOG.md).

---

## 7. Roadmap

**Current (intentional):** pure decide/record, unsent builders, deep docs.  
**Non-goals:** minting, hashing, term timers, live endpoint parity.

---

## 8–10. Experience, related, license

Offline educational page. Related: advanced education tools, VC patterns, learning-path visualizer. MIT. Pixel Journey standards.

**This blueprint records only after the required lesson is done — and never mints.**

*Pixel Journey — Honest interfaces and honest documentation for public blockchain data.*

---

*Last updated: 2026-10-29 — Deep educational pass: ISSUANCE-RULES, WORKED-EXAMPLES, expanded architecture, verification log.*
