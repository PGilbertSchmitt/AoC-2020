import input from "./input";
import { newList, newNodeMap } from './linkedlist';
import { iterate } from "./a";
import { concat, range } from "ramda";

const main = () => {
  console.log("Generating new input...");
  const newInput = concat(input, range(10, 1_000_001));
  console.log(`New input of length ${newInput.length} generated!`);

  console.log("Generating list...")
  const node = newList(newInput);
  console.log("New linked list generated!");

  console.log("Generating list map...");
  const map = newNodeMap(node);
  console.log("New list map generated!");

  let start = node.value;
  for (let i = 0; i < 10_000_000; i++) {
    if (i % 500_000 === 0) {
      console.log(`Calculated ${i} iterations...`);
    }
    start = iterate(start, map, 1_000_000); 
  }

  const one = map.get(1)!;
  const afterOne = one.next;
  const afterAfterOne = afterOne.next;

  console.log(`Solution from ${afterOne.value} and ${afterAfterOne.value}: ${afterOne.value * afterAfterOne.value}`);
};

main();
