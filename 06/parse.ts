import { uniq, intersection, drop } from "ramda";

export const getGroups = (doc: string) => doc.split("\n\n").map(g => g.trim());

export const getAnswerCount = (group: string) => uniq(group.split("").filter(s => s !== "\n")).length;

// TOTAL-ly different, see!
export const getAnswerTotal = (group: string) => {
  const answers = group.split("\n");
  let total = answers[0].split("");
  drop(1, answers).forEach(answer => total = intersection(total, answer.split("")));
  return total.length;
};
