import { compute } from "./comp";
import { parseInstruction } from "./parse";
import input from "./input";

const main = () => {
  const ops = input.map(parseInstruction);

  const [ acc, _ ] = compute(ops);  
  console.log(acc);
};

main();
