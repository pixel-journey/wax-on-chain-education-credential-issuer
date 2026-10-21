import { ATOMIC_ORIGIN } from "./api";
import { record } from "./issue";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const alice = record([], "alice", { id: "wax-101", requires: "intro" }, ["intro"]);
if (!alice.ok) throw new Error(alice.reason);
const issued = alice.rows;

export const USE_CASES: UseCase[] = [
  {
    title: "A template is not a certificate",
    detail: "alice is recorded locally. The template request is not sent.",
    request: { method: "GET", url: `${ATOMIC_ORIGIN}/atomicassets/v1/templates/pixeljourney/1`, executed: false },
    transaction: null,
  },
  {
    title: "An asset id is not a learner",
    detail: "No mint action is built.",
    request: { method: "GET", url: `${ATOMIC_ORIGIN}/atomicassets/v1/assets/1`, executed: false },
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (issued.length !== 1) throw new Error("issue");
}
