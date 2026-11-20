# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | WAX context |
| [learning-path visualizer](https://github.com/pixel-journey/wax-on-chain-learning-path-visualizer) | Lesson ready / locked |
| [verifiable-credential patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns) | Salted disclosure (different product) |
| [quest log](https://github.com/pixel-journey/wax-on-chain-quest-log) | Id list with a harder 20-cap |

## Product facts locked by tests

- Record when `done` contains `course.requires` only (not the course id itself).
- Learner: Antelope-style name length 1..12.
- Course id / requires: lowercase slug starting with a letter.
- Duplicate learner+course refused.
- Input **> 20** existing rows refused; input of **20** may become **21**.
- Nothing is minted or signed.
