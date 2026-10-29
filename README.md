# wax-on-chain-education-credential-issuer

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** Educational pure-function + unsent-query reference  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**One-sentence goal:** Decide and record whether a learner may be credited for a course **only after** the required lesson is present in their completed list — with pure functions, no minting, and no on-chain submission from this package.

**Core rule (do not weaken):**  
Nothing is minted. The lists are arguments. `alice` finished `intro`, so `wax-101` can be recorded; `bob` has not, so he is refused. This repo does not hash and it does not submit transactions.

---

## 1. Overview & Goal

On-chain education credentials are a common product idea. This blueprint isolates the **gating rule** so learners and builders can see:

- How a required-lesson check is expressed as pure data
- How duplicate issuance for the same learner/course pair is refused
- How to keep “may be recorded” logic separate from minting, hashing, and network effects

**Why it matters for WAX / Antelope:**
- Credential language is easy to overclaim when mixed with AtomicAssets mint paths or signed proofs.
- A small, testable decision function makes the educational contract explicit.
- Unsent request builders remain available for composition in other layers.

**Target users:**
- Developers designing education or badge flows
- Catalog authors who need a clean non-minting issuer primitive
- Anyone comparing this with term-timer or verifiable-credential pattern repos

**Success metrics for this educational repo:**
- Unit tests lock: alice is recorded; second identical pair is refused
- Request builders stay pure (`executed: false`)
- Documentation never claims a mint or on-chain attestation from this package

---

## 2. Concepts & Inspiration

### Core Concepts
- **Required lesson gate** — `course.requires` must appear in the learner’s `done` list.
- **Idempotent-style refusal** — Same learner + course already present → refuse.
- **Argument-only state** — Existing rows and completed lessons are inputs, not chain reads.
- **Unsent query builders** — Same educational pattern used across several catalog repos.
- **Neighbor separation** — Term remaining time lives in `wax-advanced-education-and-credential-tools`; salted disclosure / VC patterns live in `wax-verifiable-credential-patterns`. This repo does not mint and does not hash.

### User Pain Points Addressed
- “How do I express ‘only after the prerequisite’ without inventing a mint path?”
- “How do I refuse a duplicate educational credit in pure code?”

### Inspirations
- Educational credential flows that separate eligibility from issuance machinery
- Catalog discipline that prefers small correct claims

**Related Blueprints:**
- `wax-advanced-education-and-credential-tools`
- `wax-verifiable-credential-patterns`
- `wax-on-chain-learning-path-visualizer` (learning-path neighbor)

---

## 3. Design Specifications (Pixel Journey Standards)

### 3.1 Visual & Interaction Design
- Offline educational page (`src/Demo.tsx`)
- Clear presentation of decide/record outcomes and refusal reasons
- Cases that reinforce educational scenarios without implying minting

### 3.2 Key Pieces
| Piece | Role |
|-------|------|
| `src/issue.ts` | Pure `decide` and `record` |
| `src/issue.test.ts` | Locks alice success + duplicate refusal |
| `src/api.ts` | Validated, unsent WAX/Antelope request builders |
| `src/usecases.ts` | Example compositions |
| `src/api.test.ts` / `src/usecases.test.ts` | Prove requests are built and not sent |
| `src/Demo.tsx` / `src/Cases.tsx` | Offline educational surface |

### 3.3 Accessibility & Inclusive Design
- Plain language preferred; refusal reasons are explicit strings

### 3.4 Performance & Optimization Targets
- Pure functions only for the core claim
- No network dependency for the educational truth of the package

---

## 4. Technical Architecture

### 4.1 Core Tech Stack
- TypeScript (strict) + Vitest
- Next.js App Router for the offline demo shell

### 4.2 Decision Flow
```
decide(learner, course, done)
  → validate Antelope name + slug shapes
  → require course.requires ∈ done
  → { ok: true, learner, course } | { ok: false, reason }

record(existing, learner, course, done)
  → bound existing length
  → decide(...)
  → refuse if pair already present
  → append row on success
```

### 4.3 Request Builder Pattern (unsent)
Identical educational pattern to sibling repos: every builder returns `{ method, url, body?, executed: false }`.

### 4.4 Folder Structure (current)
```
app/
  layout.tsx
  page.tsx
  globals.css
src/
  issue.ts
  issue.test.ts
  api.ts
  api.test.ts
  usecases.ts
  usecases.test.ts
  Demo.tsx
  Cases.tsx
.github/workflows/ci.yml
VERIFICATION-LOG.md
ARCHITECTURE.md
PUBLIC-READINESS.md
spec.yaml
LICENSE
```

### 4.5 Security & Privacy Notes
- No private keys, no signing, no mint from this package
- Request builders only construct URLs and bodies

---

## 5. Implementation Examples & Code Snippets

### Decide eligibility
```ts
import { decide } from "./src/issue";

const course = { id: "wax-101", requires: "intro" };

decide("alice", course, ["intro"]); // { ok: true, learner: "alice", course: "wax-101" }
decide("bob", course, []);          // { ok: false, reason: "the required lesson is not done" }
```

### Record (and refuse duplicates)
```ts
import { record } from "./src/issue";

const course = { id: "wax-101", requires: "intro" };
const first = record([], "alice", course, ["intro"]);
// first.ok === true, first.rows has one entry

const second = record(first.ok ? first.rows : [], "alice", course, ["intro"]);
// second.ok === false — already has this course
```

### Build an unsent request
```ts
import { historyActions, HISTORY_ORIGIN } from "./src/api";

const req = historyActions(HISTORY_ORIGIN, "someaccount", "eosio.token:transfer", 20);
// req.executed === false
```

---

## 6. Demo & Testing Strategy

```bash
npm install
npm test          # issue, api, usecases
npm run dev       # offline educational page
```

- `src/issue.test.ts` verifies alice recorded + duplicate refused
- API / usecases tests verify unsent builders
- No test claims a mint or live credential issuance

See [VERIFICATION-LOG.md](VERIFICATION-LOG.md).

---

## 7. Roadmap & Development Phases

**Current state (intentional):**
- Pure decide/record rules with validation and unit tests
- Unsent request builders
- Offline demo and verification log

**Explicit non-goals:**
- Minting NFTs or writing chain state from this package
- Hashing / salted disclosure (see verifiable-credential patterns repo)
- Term timers or advanced education tooling (see advanced education tools repo)
- Claiming live endpoint parity

---

## 8. Visual References & Expected Experience

**Key screen:**  
Offline page showing decide/record outcomes for alice (allowed) and bob (refused), plus educational cases that do not execute network calls or mints.

---

## 9. Related Blueprints & Ecosystem Fit

- Advanced education tools: `wax-advanced-education-and-credential-tools`
- Verifiable credential / hash patterns: `wax-verifiable-credential-patterns`
- Learning path visualization: `wax-on-chain-learning-path-visualizer`
- Shares unsent-request-builder pattern with other catalog educational repos

---

## 10. License, Contributing & Credits

- MIT License
- Built to keep eligibility rules honest and separable from minting
- Pixel Journey Design System & Standards alignment
- See [VERIFICATION-LOG.md](VERIFICATION-LOG.md) and [PUBLIC-READINESS.md](PUBLIC-READINESS.md)

**This blueprint records only after the required lesson is done — and never mints.**

*Pixel Journey — Honest interfaces and honest documentation for public blockchain data.*

---

*Last updated: 2026-10-29 — README elevated to full educational blueprint standard while preserving the pure-function and non-mint claims.*
