# Worked Examples

**Trust label:** `educational-reference`  
**Repo:** `wax-on-chain-education-credential-issuer`

---

## Setup

```ts
const course = { id: "wax-101", requires: "intro" };
```

---

## Example A — Alice recorded (unit-tested)

```ts
record([], "alice", course, ["intro"])
// { ok: true, rows: [{ learner: "alice", course: "wax-101" }] }
```

---

## Example B — Bob refused (unit-tested)

```ts
record([], "bob", course, [])
// { ok: false, reason: "the required lesson is not done" }
```

---

## Example C — Duplicate refused (unit-tested)

```ts
const first = record([], "alice", course, ["intro"]);
// first.ok === true
record(first.rows, "alice", course, ["intro"])
// { ok: false, reason: "that learner already has this course" }
```

---

## Example D — Invalid learner name

```ts
decide("Alice", course, ["intro"]) // fails name pattern (uppercase)
```

---

## Example E — Invalid course slug

```ts
decide("alice", { id: "WAX 101", requires: "intro" }, ["intro"])
// course id must be short lowercase slug
```

---

## Reproduce

```ts
import { record, decide } from "../src/issue";
const course = { id: "wax-101", requires: "intro" };
console.log(record([], "alice", course, ["intro"]));
console.log(record([], "bob", course, []));
```

```bash
npm test
```

---

*Pixel Journey — Show the gate, then keep the claim small.*
