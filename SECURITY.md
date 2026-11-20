# Security — course row recorder

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Required lesson missing from `done` | refused |
| Duplicate learner+course | refused |
| Bad name / capital course id | refused |
| More than 20 existing rows on input | refused before lesson check |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Auth | Who may record must be constrained on chain |
| `done` list | Client-supplied progress is not proof |
| Mint / VC | This lab never mints or signs |

## Attack angles

1. Passing `done: ["intro"]` without the learner completing intro.  
2. Re-recording the same course under a slightly different course id.  
3. Calling the returned array a verifiable credential.

## Honesty limits

No network. No wasm. No mint. [docs.wax.io](https://docs.wax.io/) · [verifiable-credential patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns).
