import { take, drop } from "ramda";

export enum Cardinal {
  NORTH = "N",
  WEST = "W",
  EAST = "E",
  SOUTH = "S"
}

export enum Relative {
  FORWARD = "F",
  RIGHT = "R",
  LEFT = "L"
}

export interface Ins {
  move: Cardinal | Relative;
  value: number;
}

export type Location = {
  [key in Cardinal]: number;
}

export type NavMap = {
  face: Cardinal;
  loc: Location;
}

export const RIGHT_TURN = [
  Cardinal.EAST,
  Cardinal.SOUTH,
  Cardinal.WEST,
  Cardinal.NORTH,
];

export const LEFT_TURN = [
  Cardinal.EAST,
  Cardinal.NORTH,
  Cardinal.WEST,
  Cardinal.SOUTH,
];

export const newLoc = (): Location => ({
  [Cardinal.NORTH]: 0,
  [Cardinal.EAST]: 0,
  [Cardinal.SOUTH]: 0,
  [Cardinal.WEST]: 0,
});

export const newMap = (): NavMap => ({
  face: Cardinal.EAST,
  loc: newLoc()
});

export const getInstructions = (doc: string[]): Ins[] => {
  return doc.map(ins => {
    const move = take(1, ins) as (Cardinal | Relative);
    const value = parseInt(drop(1, ins));
    return { move, value };
  });
};
