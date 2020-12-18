import { sum } from "ramda";
import input from "./input";
import { consumer, tokenizer } from "./parse";

const main = () => {
  const results = input.map(line => consumer(tokenizer(line)));
  console.log(sum(results));
};

main();
