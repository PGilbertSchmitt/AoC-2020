export interface Bag {
  count: number;
  strength: string;
  color: string;
}

export const bagString = (bag: Bag) => `${bag.strength}:${bag.color}`;

// It's a unidirectional graph, so no cycles, meaning no node is a parent of itself
export interface BagNode {
  parents: Bag[];
  head: Bag;
  children: Bag[];
}

type BagMap = Map<string, BagNode>;

const getRules = (doc: string) => doc.split("\n").filter(r => !!r.length);

const parseBag = (bag: string, head: boolean): Bag => {
  let count = 1;
  let strength, color, num;

  if (head) {
    [strength, color] = bag.split(" ");  
  } else {
    [num, strength, color] = bag.split(" ");
    count = parseInt(num);
  }

  return {
    count,
    strength,
    color
  };
};

const parseRule = (rule: string): BagNode => {
  const [head, childrenString] = rule.split(" contain ");
  const children = childrenString.split(", ");

  return {
    parents: [],
    head: parseBag(head, true),
    children: childrenString === "no other bags."
      ? []
      : children.map(child => parseBag(child, false))
  }
};

export const createMap = (doc: string): BagMap => {
  const bagMap: BagMap = new Map();
  for (let rule of getRules(doc)) {
    const bagNode = parseRule(rule);
    bagMap.set(bagString(bagNode.head), bagNode);
  }

  // Update the parent listings
  for (let [_, bagNode] of bagMap) {
    bagNode.children.forEach(child => {
      const key = bagString(child);
      const childNode = bagMap.get(key);
      if (!childNode) {
        console.error(`Couldn't find bag ${key} from ${child} in map`);
        process.exit(1);
      }

      bagMap.set(key, {
        ...childNode,
        parents: [bagNode.head, ...childNode.parents]
      });
    })
  }

  return bagMap;
}
