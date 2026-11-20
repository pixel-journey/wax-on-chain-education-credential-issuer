import { describe, expect, it } from "vitest";
import { record } from "./issue";

const course = { id: "wax-101", requires: "intro" };

describe("credential record", () => {
  it("records alice and refuses bob and a duplicate", () => {
    const first = record([], "alice", course, ["intro"]);
    expect(first).toEqual({ ok: true, rows: [{ learner: "alice", course: "wax-101" }] });
    expect(record([], "bob", course, [])).toEqual({
      ok: false,
      reason: "the required lesson is not done",
    });
    if (!first.ok) throw new Error("alice");
    expect(record(first.rows, "alice", course, ["intro"])).toEqual({
      ok: false,
      reason: "that learner already has this course",
    });
  });

  it("refuses a 13-character name, a capital course id, and a 21st row", () => {
    expect(record([], "aaaaaaaaaaaaa", course, ["intro"]).ok).toBe(false);
    expect(record([], "aaaaaaaaaaaa", course, ["intro"]).ok).toBe(true);
    expect(record([], "alice", { id: "Wax", requires: "intro" }, ["intro"]).ok).toBe(false);
    const twenty = Array.from({ length: 20 }, (_, index) => ({
      learner: "alice",
      course: `c${index}`,
    }));
    const added = record(twenty, "bob", course, ["intro"]);
    expect(added.ok).toBe(true);
    if (added.ok) expect(added.rows).toHaveLength(21);
    const full = Array.from({ length: 21 }, (_, index) => ({
      learner: "alice",
      course: `c${index}`,
    }));
    expect(record(full, "alice", course, ["intro"])).toEqual({
      ok: false,
      reason: "pass at most 20 existing rows",
    });
  });
});
