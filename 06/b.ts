import { reduce } from "ramda";

import input from "./input";
import { getGroups, getAnswerTotal } from "./parse";

const main = () => {
  const doc = input();
  const groups = getGroups(doc);
  const total = reduce(
    (answers, group) => answers + getAnswerTotal(group),
    0,
    groups
  );

  console.log(total);
}

main();
