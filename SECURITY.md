# Security — course row recorder

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Required lesson missing from `done` | refused |
| Duplicate learner+course | refused |
| Bad name / capital course id | refused |
| More than 20 existing rows on input | refused before lesson check |
| Exactly 20 rows | can become 21 (unlike quest log hard stop) |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Auth | Who may record must be constrained on chain |
| `done` list | Client-supplied progress is not proof |
| Mint / VC | This lab never mints or signs |
| Persistence | Returns a new array; does not write a table |

## Attack angles

1. Passing `done: ["intro"]` without the learner completing intro.  
2. Re-recording the same course under a slightly different course id.  
3. Calling the returned array a verifiable credential.  
4. Confusing this with [quest log](https://github.com/pixel-journey/wax-on-chain-quest-log) (hard stop at 20 vs 20→21 here).  
5. Treating prerequisite pass as on-chain completion proof.

## Honesty limits

No network. No wasm. No mint. Prerequisite check only.

| Sibling | Distinction |
| --- | --- |
| [quest log](https://github.com/pixel-journey/wax-on-chain-quest-log) | Id append, hard stop 20 |
| [learning path](https://github.com/pixel-journey/wax-on-chain-learning-path-visualizer) | Cycle refusal, ready/locked |
| [VC patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns) | Salted disclosure sketches |

[docs.wax.io](https://docs.wax.io/).
