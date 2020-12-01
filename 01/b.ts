import { input, test } from "./input"
import { sort } from "ramda";

interface output {
  first: number,
  sec: number,
  third: number,
  total: number
}

const run = (list: number[], set: Set<number>): output | null => {
  if (list.length === 0) {
    return null;
  }

  const [ first, ...rest ] = list;
  for (let sec of rest) {
    const sum = first + sec;

    // If we start out sorted, we will eventually get to a point where we can stop prematurely and move on to the next iteration
    if (sum >= 2020) {
      break;
    }

    const third = 2020 - sum;
    if (set.has(third)) {
      return {
        first,
        sec,
        third,
        total: first * sec * third
      };
    }
  }

  return run(rest, set);
};

const comp = (a: number, b: number) => a - b;

const main = (expenses: number[]) => {
  const numSet = new Set(expenses);
  console.log(run(sort(comp, expenses), numSet));
};

// main(test);
main(input);
