import input from "./input";
import { reverse } from "ramda";

interface Counter {
  [key: number]: number;
}

const computeCounts = (queue: number[], map: Counter): Counter => { 
  if (queue.length === 0) {
    return map;
  }
  const [n, ...rest] = queue;
  
  // Calculate this node's path count by adding its previous path counts
  const [a, b, c] = [map[n+1], map[n+2], map[n+3]].map(x => x || 0);
  map[n] = a + b + c;

  return computeCounts(rest, map);
};

const main = () => {
  const list = reverse(input);
  const first = list[0];
  const device = first + 3;
  const inputMap: Counter = {};
  inputMap[device] = 1;

  const map = computeCounts(
    [...list, 0],
    inputMap
  );

  console.log(`Number of combinations: ${map[0]}`);
};

main();
