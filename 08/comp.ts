import { Ins } from "./parse";

// Runs the instructions, returning the last value of the accumulator before either termination
// or the detection of an infinite loop, and a boolean of whether it terminated (true) or was
// an infinite loop (false);
export const compute = (ops: Ins[]): [number, boolean] => {
  let acc = 0;
  let ip = 0;
  let ipSet = new Set<number>();

  while (true) {
    const [op, val] = ops[ip];
    ipSet.add(ip);

    switch (op) {
      case "nop":
        ip++;
        break;
      case "acc":
        acc+=val;
        ip++;
        break;
      case "jmp":
        ip+=val;
        break;
      default:
        console.error(`Unknown op '${op}'`);
        process.exit(1);
    }

    if (ipSet.has(ip)) {
      // If we've visited this instruction pointer before, we're in an infinite Loop
      return [acc, false]
    } else if (ops[ip] === undefined) {
      // Otherwise, if we're out of bounts on our instructions, we've terminated
      return [acc, true];
    }
    // If neither is true, continue executing
  }
};
