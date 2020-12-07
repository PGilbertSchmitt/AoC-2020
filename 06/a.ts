import { reduce } from "ramda";

import input from "./input";
import { getGroups, getAnswerCount } from "./parse";

const main = () => {
  const doc = input();
  const groups = getGroups(doc);
  const total = reduce(
    (answers, group) => answers + getAnswerCount(group),
    0,
    groups
  );

  console.log(total);
}

main();
