import { sum } from "ramda";
import input from "./input";
import { evaluate } from "./parse-b";

const main = () => {
  const results = input.map(evaluate);
  console.log(sum(results));
};

main();
