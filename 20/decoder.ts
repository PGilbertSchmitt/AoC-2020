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
    neighbors: [],
    data: tile
  };
};

export enum Dir {
  TOP = "top",
  BOTTOM = "bottom",
  RIGHT = "right",
  LEFT = "left"
}

export type Tile = {
  id: number;
  edges: {
    [key in Dir]: [number, number];
  }
  neighbors: Tile[],
  data: string[]
};

export type Registry = Map<number, Tile[]>;

export const buildRegistry = (tiles: Tile[]) => {
  const tileRegistry: Registry = new Map();
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

// Gets the complement of an edge number;
export const complement = (edge: number) => {
  const binStr = edge.toString(2).padStart(10, "0");
  return parseInt(reverse(binStr), 2);
};
