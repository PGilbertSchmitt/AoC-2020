import input from "./input";
import { parse } from "./parse";
import { createAllergenMap, passThroughMap } from "./ingredients";

const main = () => {
  const groups = input.map(parse);
  const allergenMap = createAllergenMap(groups);

  const knownRelations = new Map<string, string>();
  while (allergenMap.size > 0) {
    passThroughMap(allergenMap, knownRelations);
  }
  const sortedByAllergen = Array.from(knownRelations.keys()).sort().map(allergen => knownRelations.get(allergen));

  console.log(sortedByAllergen.join(","));
};

main();
