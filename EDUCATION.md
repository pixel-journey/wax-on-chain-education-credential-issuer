# Education — a row, not a credential

> **Rung:** `npm test` passes. Nothing is minted, hashed, or submitted.  
> **The test is the rule.** Lesson status, which this file does not compute, is [wax-on-chain-learning-path-visualizer](https://github.com/pixel-journey/wax-on-chain-learning-path-visualizer). Salted disclosure, which this file does not do, is [wax-verifiable-credential-patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns).

## Predict, then run

`record` appends `{ learner, course }` when `done` contains `course.requires`. It does not check that the course id itself is in `done`. `alice` with `["intro"]` is enough for `wax-101`.

| Call | Locked result |
| --- | --- |
| empty rows, `alice`, requires `intro`, done `["intro"]` | one row, course `wax-101` |
| `bob` with an empty done list | not ok. Reason: `the required lesson is not done` |
| the same alice row again | not ok. Reason: `that learner already has this course` |
| learner of 12 `a` characters | ok |
| learner of 13 `a` characters | not ok |
| course id `Wax` | not ok |
| 20 existing rows, then `bob` | ok, and the list is 21 rows. The cap is the length you pass, not the length you return. |
| 21 existing rows | not ok. Reason: `pass at most 20 existing rows`. The lesson check does not run. |

An Antelope name is at most 12 characters. `Wax` is not a lowercase slug. Twenty existing rows can still accept a new one. Twenty-one cannot.
