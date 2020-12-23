import input from "./input";
import { newList, newNodeMap, ListNode } from './linkedlist';

export const iterate = (from: number, map: Map<number, ListNode>, maxNum: number): number => {
  const start = map.get(from)!;
  const a = start.next;
  const b = a.next;
  const c = b.next;
  const rest = c.next;

  const notDest = [a, b, c].map(x => x.value);
  let destNum = from - 1;
  while (notDest.includes(destNum) || destNum < 1) {
    destNum--;
    if (destNum < 1) {
      destNum = maxNum;
    }
  }
  const dest = map.get(destNum)!;
  const afterDest = dest.next;

  // Swapping time
  start.next = rest;
  rest.last = start;
  dest.next = a;
  a.last = dest;
  c.next = afterDest;
  afterDest.last = c;

  return rest.value;
} 

const main = () => {
  const node = newList(input);
  const map = newNodeMap(node);

  let start = node.value;
  for (let i = 0; i < 100; i++) {
    start = iterate(start, map, 9); 
  }

  let answerNode = map.get(1)!;
  const values = [];
  for (let i = 0; i < 8; i++) {
    answerNode = answerNode.next;
    values.push(answerNode.value);
  }
  console.log(`Solution: ${values.join("")}`);
};

main();
