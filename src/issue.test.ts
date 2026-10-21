import { describe, expect, it } from "vitest";
import { record } from "./issue";

const course = { id: "wax-101", requires: "intro" };

describe("credential record", () => {
  it("records alice and refuses bob and a duplicate", () => {
    const first = record([], "alice", course, ["intro"]);
    expect(first).toEqual({ ok: true, rows: [{ learner: "alice", course: "wax-101" }] });
    expect(record([], "bob", course, []).ok).toBe(false);
    if (!first.ok) throw new Error("alice");
    expect(record(first.rows, "alice", course, ["intro"]).ok).toBe(false);
  });
});
