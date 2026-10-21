/**
 * Whether a learner may be recorded for a course.
 * The lists are arguments. Nothing is minted.
 */

export type Course = { id: string; requires: string };
export type Recorded = { learner: string; course: string };

const NAME = /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-z1-5.]{1,12}$/;
const ID = /^[a-z][a-z0-9-]{0,23}$/;

export function decide(learner: string, course: Course, done: readonly string[]): { ok: false; reason: string } | { ok: true; learner: string; course: string } {
  if (!NAME.test(learner)) return { ok: false, reason: "learner must be an Antelope name" };
  if (!ID.test(course.id) || !ID.test(course.requires)) return { ok: false, reason: "course id and requires must be short lowercase slugs" };
  if (!done.includes(course.requires)) return { ok: false, reason: "the required lesson is not done" };
  return { ok: true, learner, course: course.id };
}

export function record(existing: readonly Recorded[], learner: string, course: Course, done: readonly string[]): { ok: false; reason: string } | { ok: true; rows: Recorded[] } {
  if (existing.length > 20) return { ok: false, reason: "pass at most 20 existing rows" };
  const choice = decide(learner, course, done);
  if (!choice.ok) return choice;
  if (existing.some((row) => row.learner === choice.learner && row.course === choice.course)) {
    return { ok: false, reason: "that learner already has this course" };
  }
  return { ok: true, rows: [...existing, { learner: choice.learner, course: choice.course }] };
}
