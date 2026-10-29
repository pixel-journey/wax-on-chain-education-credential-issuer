# Verification log

**Trust label:** educational-reference  
**Updated:** 2026-10-29 (Deep educational pass)

| Claim | Evidence | State |
| --- | --- | --- |
| alice is recorded and a second record of the same pair is refused | `src/issue.test.ts` | verified (unit) |
| bob without required lesson is refused | `src/issue.test.ts` | verified (unit) |
| Requests are built and not sent | `src/usecases.test.ts` and `src/api.test.ts` | verified (unit) |
| Demo renders the same functions | `src/Demo.tsx` | partial (inspection) |
| Issuance rules documented | `docs/ISSUANCE-RULES.md` | verified (docs) |
| Worked examples documented | `docs/WORKED-EXAMPLES.md` | verified (docs) |
| Architecture documented | `ARCHITECTURE.md` | verified (docs) |
| A live endpoint matches this repo | none | untested |
| Mints or writes chain state | **not claimed** | permanent non-goal |
| Hash / salted disclosure | **not claimed** | neighbor repos |

```bash
npm test
```

## Deep-pass notes (2026-10-29)

- Added `docs/ISSUANCE-RULES.md` and `docs/WORKED-EXAMPLES.md`
- Expanded `ARCHITECTURE.md`
- Pure decide/record semantics unchanged
