import { sum } from "ramda";
import input from "./input";
import { createMap, Bag, BagNode, bagString } from "./parse";

type Counter = [number, BagNode];

const getChildren = (m: ReturnType<typeof createMap>, bags: Bag[], mult: number): Counter[] => bags.map(bag => {
  const str = bagString(bag);
  const node = m.get(str);
  if (!node) {
    console.error(`Failed to get bag ${str}`);
    process.exit(4);
  }
  return [mult * bag.count, node];
});

const main = () => {
  const map = createMap(input());
  const start = map.get("shiny:gold");
    if (!start) {
    console.error("ERROR");
    process.exit(2);
  }

  // Queue for finding more children
  let q: Counter[] = [[1, start]];
  // Vector of processed bags that were removed from q
  const v: number[] = [];

  while (q.length > 0) {
    const [[mult, next], ...rest] = q;
    q = [...rest, ...getChildren(map, next.children, mult)];
    v.push(mult * next.head.count);
  }

  console.log(sum(v) - 1);
};

main();
