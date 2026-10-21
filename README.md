# Issue only after the required lesson

**Trust label:** `educational-reference`  
**Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

alice finished intro, so wax-101 can be recorded. bob has not, so he is refused. Nothing is minted.

This repo was empty. It now contains one rule and two unsent queries.

## What is actually in the repo

| Piece | Role |
| --- | --- |
| `src/issue.ts` | The pure rules |
| `src/issue.test.ts` | The claims in the verification log |
| `src/usecases.ts` | HTTP requests, built and not sent |
| `src/api.ts` | The same unsent WAX query builders as the other educational repos |
| `src/Demo.tsx` | Offline page |

`npm test` runs the rules. `npm run dev` opens the page.

## Where the neighboring idea lives

Seconds left on a term live in `wax-advanced-education-and-credential-tools`. Salted disclosure lives in `wax-verifiable-credential-patterns`. This repo does not mint and it does not hash.

## Queries

`executed` is false. This repo did not call any host. No transaction is invented.
