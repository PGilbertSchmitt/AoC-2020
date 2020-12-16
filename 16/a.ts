import input from "./input";
import { parseRule } from "./rules";
import { filter, none, sum } from "ramda";

const main = () => {
  const tickets = input.nearbyTickets;
  const rules = input.rules.map(parseRule);
  
  const invalidValues: number[] = [];

  for (let ticket of tickets) {
    invalidValues.push(...filter(
      val => none(r => r.valid.has(val), rules),
      ticket
    ));
  }

  console.log(sum(invalidValues));
};

main();
