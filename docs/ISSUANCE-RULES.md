# Issuance Rules

**Trust label:** `educational-reference`  
**Repo:** `wax-on-chain-education-credential-issuer`

---

## Purpose

Document the pure eligibility and local-record rules. **Nothing is minted.** Lists are arguments. Expiry, salted disclosure, and on-chain submission live elsewhere.

---

## Types

```ts
type Course = { id: string; requires: string };
type Recorded = { learner: string; course: string };
```

- `id` / `requires` — short lowercase slugs (`/^[a-z][a-z0-9-]{0,23}$/`)
- `learner` — Antelope name pattern (no `..`, length/charset limits)

---

## `decide(learner, course, done)`

| Step | Rule |
|------|------|
| 1 | Reject invalid learner name → `learner must be an Antelope name` |
| 2 | Reject invalid course id or requires slug → `course id and requires must be short lowercase slugs` |
| 3 | Require `course.requires` ∈ `done` → else `the required lesson is not done` |
| 4 | Success → `{ ok: true, learner, course: course.id }` |

---

## `record(existing, learner, course, done)`

| Step | Rule |
|------|------|
| 1 | Reject if `existing.length > 20` |
| 2 | Run `decide(...)`; propagate failure |
| 3 | Reject if same learner+course already in `existing` → `that learner already has this course` |
| 4 | Success → append `{ learner, course }` to a new rows array |

Recording is **local list mutation in memory for teaching** — not an AtomicAssets mint and not a chain write.

---

## Canonical story (unit-tested)

- Course: `{ id: "wax-101", requires: "intro" }`
- Alice with `done = ["intro"]` → recorded
- Bob with `done = []` → refused (required lesson not done)
- Second record of alice + wax-101 → refused (duplicate)

---

## What this is not

| Non-claim | Neighbor / reason |
|-----------|-------------------|
| NFT mint | No mint path in this package |
| Hash / salted disclosure | `wax-verifiable-credential-patterns` |
| Term timers / advanced tools | `wax-advanced-education-and-credential-tools` |
| Learning-path UI | `wax-on-chain-learning-path-visualizer` |

---

## Classroom prompts

1. Why separate `decide` from `record`?
2. What would change if `done` were loaded from chain — and why is that out of scope here?
3. How do explicit refusal reason strings improve educational demos?

---

*Pixel Journey — Gate the credit; do not invent the mint.*
