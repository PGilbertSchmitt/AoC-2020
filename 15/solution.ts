import { dropLast, last } from "ramda";

// So like, 30_000_000 pairs (upper bound) of 32-bit numbers isn't actually that much memory to store.
// Like, this program takes a few megs of RAM for about 5-10 seconds on my laptop, give or take. I'm guessing
// it was expected that some people would use less efficient means of finding the last spoken number
// for part 1, which would them become untennable, but this doesn't seem all that difficult to get
// around. Maybe there's a super cool solution I don't know about involving calculus and chemistry,
// but this function here is more than adequate at this scale.

export const solution = (input: number[], turns: number) => {
  const turnTracker = new Map<number, number>();

  let turn = 1;
  for (let n of dropLast(1, input)) {
    turnTracker.set(n, turn++);
  }

  let lastSaid = last(input)!;
  while (turn < turns) {
    const lastVal = turnTracker.get(lastSaid);
    if (lastVal !== undefined) {
      const nextVal = turn - lastVal;
      turnTracker.set(lastSaid, turn++);
      lastSaid = nextVal;
    } else {
      turnTracker.set(lastSaid, turn++);
      lastSaid = 0;
    }
  }

  return lastSaid;
};
