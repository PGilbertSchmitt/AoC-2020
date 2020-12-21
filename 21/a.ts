import input from "./input";
import { parse } from "./parse";
import { sum } from "ramda";
import { createAllergenMap, passThroughSet } from "./ingredients";

const main = () => {
  const groups = input.map(parse);
  
  // This first step will create a map of allergens pointing to sets of all the ingredients that show up in
  // all recipes that contain that allergen
  const allergenMap = createAllergenMap(groups);

  // The next step is to go through all elements in the map, and for every allergen that has a set of size 1,
  // remove it and remove the only ingredient in that set from all other sets. Repeat until the old map is
  // empty. The new set will contain known ingredients. If we still need the relations later, we will get them
  // here. However, for now, only the allergenic ingredients matter.
  const knownIngredients = new Set<string>();
  while (allergenMap.size > 0) {
    passThroughSet(allergenMap, knownIngredients);
  }

  // Then just tallying. Create a map of all ingredients and their counts, excluding any known ingredients,
  // and sum up the remaining values
  const tallyMap = new Map<string, number>();
  for (let { ingredients } of groups) {
    for (let ingredient of ingredients) {
      if (!knownIngredients.has(ingredient)) {
        tallyMap.set(ingredient, (tallyMap.get(ingredient) || 0) + 1);
      }
    }
  }

  console.log(`The total instances of unknown ingredients is ${sum(Array.from(tallyMap.values()))}`);
};

main();
