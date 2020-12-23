import { reverse } from "ramda";

export type ListNode = {
  value: number;
  last: ListNode;
  next: ListNode;
};

// There's a bunch of force casting here, but only because I don't want to deal with optionals
// or intermediate types
export const newList = (nums: number[]): ListNode => {
  const [value, ...rest] = nums;
  const lastNode: ListNode = {
    value
  } as ListNode;

  let workingNode = lastNode;
  for (let value of reverse(rest)) {
    const previousNode = {
      value,
      next: workingNode
    }
    workingNode.last = previousNode as ListNode;
    workingNode = previousNode as ListNode;
  }

  lastNode.next = workingNode;
  workingNode.last = lastNode;

  return lastNode;
}

export const newNodeMap = (node: ListNode) => {
  const nodeMap = new Map<number, ListNode>();
  const firstValue = node.value;
  nodeMap.set(firstValue, node);
  let nextNode = node.next;
  while (nextNode.value !== firstValue) {
    nodeMap.set(nextNode.value, nextNode);
    nextNode = nextNode.next;
  }
  return nodeMap;
};

export const printList = (node: ListNode) => {
  const firstValue = node.value;
  let nextNode = node.next;
  const values: number[] = [firstValue];
  while (nextNode.value !== firstValue) {
    values.push(nextNode.value);
    nextNode = nextNode.next;
  }
  console.log(values.join(" "));
};
