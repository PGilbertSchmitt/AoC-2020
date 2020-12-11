import { compute } from "./comp";
import { Ins, parseInstruction } from "./parse";
import input from "./input";

const swap = (op: string) => {
  return op === "nop" ? "jmp" : "nop";
};

const prepareIns = (ins: Ins[], flip: number) => {
  const newIns = [...ins];
  const [op, val] = newIns[flip];
  newIns[flip] = [swap(op), val];
  return newIns;
};

const main = () => {
  const instructions = input.map(parseInstruction);

  // Generate all possible locations to flip an instruction
  const flipQueue: number[] = [];
  instructions.forEach(([op, _], i) => {
    if (op !== "acc") {
      flipQueue.push(i);
    }
  });

  // Test each possible flip location until we terminate normally
  for (let flip of flipQueue) {
    const newIns = prepareIns(instructions, flip);
    const [acc, success] = compute(newIns);
    if (success) {
      console.log(`Found ${acc} when flipping ops[${flip}] ( op: ${instructions[flip]} )`);
      process.exit(0);
    }
  }
};

main();