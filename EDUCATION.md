# Education — a row, not a credential

> **Rung:** `npm test` passes. Nothing is minted, hashed, or submitted.  
> **The test is the rule.** Lesson status is [wax-on-chain-learning-path-visualizer](https://github.com/pixel-journey/wax-on-chain-learning-path-visualizer). Salted disclosure is [wax-verifiable-credential-patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns).

Official context: [docs.wax.io](https://docs.wax.io/). Contrast: [quest log](https://github.com/pixel-journey/wax-on-chain-quest-log) hard-stops at 20; this lab may return **21** from 20.

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Record alice when `intro` is done; refuse bob without it |
| Intermediate | Explain name vs course slug, and the 20-row input cap |
| Masterclass | Refuse to call the row a verifiable credential |

---

## Beginner — one scene

`record` appends `{ learner, course }` when `done` contains `course.requires`. It does **not** require the course id itself to be in `done`. `alice` with `["intro"]` is enough for `wax-101`.

| Call | Locked result |
| --- | --- |
| empty rows, `alice`, requires `intro`, done `["intro"]` | one row, course `wax-101` |
| `bob` with an empty done list | not ok. Reason: `the required lesson is not done` |
| the same alice row again | not ok. Reason: `that learner already has this course` |
| learner of 12 `a` characters | ok |
| learner of 13 `a` characters | not ok |
| course id `Wax` | not ok |
| 20 existing rows, then `bob` | ok, list becomes **21** rows |
| 21 existing rows | not ok. Reason: `pass at most 20 existing rows`. Prerequisite is not checked. |

```bash
npm test
```

---

## Intermediate — shapes and caps

| Field | Rule |
| --- | --- |
| learner | Antelope-style name: `a-z` / `1-5` / `.`, length 1..12, no leading/trailing/doubled `.` |
| course id / requires | `^[a-z][a-z0-9-]{0,23}$` |
| existing rows | at most **20** on input; a successful append may return 21 |
| duplicate | same learner + same course refused |

The name regex allows mid-name dots. [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit) is stricter. Do not merge without a test.

Prerequisite is **only** `requires`. Completing `wax-101` is not required to record `wax-101`.

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Bob without prereq | refused |
| Duplicate learner+course | refused |
| Require course id in done | **not** required |
| 21 rows already | refused before prereq check |
| Course id `Wax` | refused |

---

## Masterclass

### Common mistakes

1. Calling the row a W3C credential or an NFT mint.  
2. Requiring the course id in `done` as well as the prerequisite.  
3. Treating the 20-row rule like the quest log (quest log cannot grow past 20; this lab can return 21 from 20).  
4. Accepting `Wax` as a course slug.

### Exercises

1. Bob, done `[]`, course requires `intro` — reason? (`required lesson is not done`.)  
2. Can 20 rows become 21? (**Yes**.)  
3. Is `aaaaaaaaaaaa` (12) a valid learner? (**Yes**.)

---

## What this course will not teach

- Minting badges on AtomicAssets
- Salted selective disclosure (see verifiable-credential patterns)
- That a local row is accepted by an employer
