import { last, reverse, values } from "ramda";
import { RawTile } from "./input";

// For a given edge, return the equivalent values for the edge and reverse edge respectively
export const edgeToNums = (edge: string[]): [number, number] => {
  const binArr = edge.map(c => c === "." ? 0 : 1);
  return [
    parseInt(binArr.join(""), 2),
    parseInt(reverse(binArr).join(""), 2)
  ];
};

// So that all edges match regardless of rotation, the direction of
// the bottom and left will be the reverse direction of the top
// and right respectively
export const createTile = ({id, tile}: RawTile): Tile => {
  const top = tile[0].split("");
  const bottom = reverse(last(tile)!.split(""));
  const right = tile.map(l => last(l)!);
  const left = reverse(tile.map(l => l[0]));
  return {
    id,
    edges: {
      top: edgeToNums(top),
      right: edgeToNums(right),
      bottom: edgeToNums(bottom),
      left: edgeToNums(left),
    },
    neighbors: []
  };
};

// enum Dir {
//   TOP = "top",
//   BOTTOM = "bottom",
//   RIGHT = "right",
//   LEFT = "left"
// }

type Tile = {
  id: number;
  edges: {
    top: [number, number];
    bottom: [number, number];
    right: [number, number];
    left: [number, number];
  }
  neighbors: Tile[]
};

export const buildRegistry = (tiles: Tile[]) => {
  const tileRegistry = new Map<number, Tile[]>();
  for (let tile of tiles) {
    for (let [a, b] of values(tile.edges)) {
      let tileArray: Tile[] = tileRegistry.get(a) || [];
      tileArray.push(tile);
      tileRegistry.set(a, tileArray);
      tileRegistry.set(b, tileArray);
    }
  }
  return tileRegistry;
};
