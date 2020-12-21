export interface Group {
  ingredients: string[];
  allergens: string[];
}

export const parse = (recipe: string) => {
  const matches = recipe.match(/((\w+ )+)\(contains ((\w+, )*\w+)/);
  if (matches === null) {
    throw `Couldn't parse ${recipe}`;
  }
  const ingredients = matches[1].trim().split(" ");
  const allergens = matches[3].split(", ");
  return {
    ingredients,
    allergens
  }
};
