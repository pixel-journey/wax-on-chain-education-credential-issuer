"use client";

import { record } from "./issue";

const course = { id: "wax-101", requires: "intro" };

export function Demo() {
  const alice = record([], "alice", course, ["intro"]);
  const bob = record([], "bob", course, []);
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>Issue only after the required lesson</h1>
      <p className="lede">alice finished intro, so wax-101 can be recorded. bob has not, so he is refused. Nothing is minted.</p>
      <p>{alice.ok ? `alice: ${alice.rows[0].course}` : alice.reason}</p>
      <p>{bob.ok ? "bob recorded" : `bob: ${bob.reason}`}</p>
    </main>
  );
}
