import input from "./input";
import { createMap, Bag, BagNode, bagString } from "./parse";

const printBag = ({count, color, strength}: Bag) => `{${count} ${strength} ${color}}`;

const main = () => {
  const map = createMap(input);

  const getParents = (bags: Bag[], s: Set<string>) => bags.map(bag => {
    const str = bagString(bag);
    const node = map.get(str);
    if (!node) {
      console.error(`Failed to get bag ${str}`);
      process.exit(3);
    }
    s.add(str);
    return node;
  })

  const start = map.get("shiny:gold");

  if (!start) {
    console.error("ERROR");
    process.exit(2);
  }

  let q = [start];

  const s = new Set<string>();

  while (q.length > 0) {
    const [next, ...rest] = q;
    const parents = getParents(next.parents, s);
    q = [...rest, ...parents];
  }
  console.log(s.size);
};

main();
