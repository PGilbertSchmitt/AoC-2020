import { reduce } from "ramda";
import input from "./input";
import { isTree } from "./a";

interface IPath {
  right: number;
  down: number;
}

const getLineTotal = (path: IPath, map: string[]) => {
  let curPos = 0;
  let curRow = 0;

  let treeTotal = 0;

  while (curRow < map.length) {
    const res = isTree(curPos, map[curRow]);
    treeTotal += (res ? 1 : 0);

    curRow += path.down;
    curPos += path.right;
  }

  return treeTotal;
};

const main = () => {
  const map = input;

  const paths = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  const multTotal = reduce(
    (acc, path) => {
      const trees = getLineTotal(path, map);
      console.log(`Going ${path.right} right and ${path.down} down: encountered ${trees} trees`);
      return acc * trees;
    },
    1,
    paths
  );

  console.log(`Total score: ${multTotal}`);
}

main();
