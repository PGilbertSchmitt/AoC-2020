import { reduce } from "ramda";
import input from "./input";

export const isTree = (pos: number, row: string) => {
  return row[pos % row.length] === "#";
}

const main = () => {
  const rows = input(process.argv[2]);
  let curPos = 0;

  const treeTotal = reduce(
    (trees, row) => {
      const res = isTree(curPos, row);
      curPos += 3;
      return trees + (res ? 1 : 0);
    },
    0,
    rows
  );

  console.log(treeTotal);
}

main();
