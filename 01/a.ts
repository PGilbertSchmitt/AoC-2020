import input from "./input"

const doesSum = (a: number, b: number) => a + b === 2020;

interface output {
  first: number,
  sec: number,
  total: number
}

const run = (list: number[]): output | null => {
  if (list.length === 0) {
    return null;
  }

  const [ first, ...rest ] = list;
  for (let sec of rest) {
    if (doesSum(first, sec)) {
      return {
        first,
        sec,
        total: first * sec
      };
    }
  }

  return run(rest);
};

console.log(run(input));
