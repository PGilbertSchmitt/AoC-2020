import { Group } from "./parse";
import { union } from "./set";

type AllergenMap = Map<string, Set<string>>;

export const createAllergenMap = (groups: Group[]) => {
  const allergenMap: AllergenMap = new Map();
  for (let { ingredients, allergens } of groups) {
    for (let allergen of allergens) {
      const newSet = new Set(ingredients);
      const oldSet = allergenMap.get(allergen);
      if (oldSet) {
        allergenMap.set(allergen, union(oldSet, newSet));
      } else {
        allergenMap.set(allergen, new Set(ingredients));
      }
    }
  }
  return allergenMap;
};

export const passThroughSet = (map: AllergenMap, knownIngredients: Set<string>) => {
  for (let [ allergen, ingredients ] of map.entries()) {
    if (ingredients.size === 1) {
      const ingredient = Array.from(ingredients.keys())[0];
      knownIngredients.add(ingredient);
      map.delete(allergen);
      for (let otherSet of map.values()) {
        otherSet.delete(ingredient);
      }
    }
  }
};

export const passThroughMap = (map: AllergenMap, knownRelations: Map<string, string>) => {
  for (let [ allergen, ingredients ] of map.entries()) {
    if (ingredients.size === 1) {
      const ingredient = Array.from(ingredients.keys())[0];
      knownRelations.set(allergen, ingredient);
      map.delete(allergen);
      for (let otherSet of map.values()) {
        otherSet.delete(ingredient);
      }
    }
  }
};
