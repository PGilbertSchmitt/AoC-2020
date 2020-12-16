import { reduce, concat, range } from "ramda";

export interface Rule {
  name: string;
  valid: Set<number>;
}

export const parseRule = (rule: string): Rule => {
  const [name, ranges] = rule.split(": ");

  return {
    name,
    valid: new Set(reduce(
      (acc, str) => {
        const [l, h] = str.split("-").map(x => parseInt(x, 10));
        return concat(acc, range(l, h+1));
      },
      [] as number[],
      ranges.split(" or ")
    ))
  };
};
