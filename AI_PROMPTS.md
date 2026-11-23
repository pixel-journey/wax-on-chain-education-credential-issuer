# AI handoff — education credential issuer

## Non-negotiables

1. Record when `done` contains `course.requires` only — **not** the course id itself.
2. Learner is an Antelope-style name, length 1..12.
3. Course id and requires are lowercase slugs starting with a letter.
4. Duplicate learner+course is refused.
5. Input **> 20** existing rows is refused. Input of **20** may become **21**.
6. Nothing is minted or signed. Not the quest log (that one hard-stops at 20).
7. Salted disclosure lives in the verifiable-credential lab, not here.

## Prompt seeds

- "Learner finished requires but not the course id — record or refuse?"
- "20 existing rows plus one new — allowed here, refused in the quest log."
- "Refuse a duplicate learner+course."

## Do not

- Mint a credential or sign a VC in this pure lab.
- Copy the quest log's hard stop of 20 onto this book.
