import input, { toStr, toVec, init, SeatMap, Status } from "./input";
import { all, reduce } from "ramda";

// Given a position and a map, can the sitter see an occupied in a given direction
const seeTaken = ([x, y]: [number, number], map: SeatMap) => ([a, b]: [number, number]): boolean => {
  let curX = x + a;
  let curY = y + b;
  let curPos = map.get(toStr([curX, curY]));
  while (curPos === Status.FLOOR) {
    curX = curX + a;
    curY = curY + b;
    curPos = map.get(toStr([curX, curY]));
  }
  return curPos === Status.TAKEN;
};

const countNeighbors = (coor: string, map: SeatMap) => {
  const [ x, y ] = toVec(coor);
  const seeFunc = seeTaken([x, y], map);
  const sightlines = [
    seeFunc([0, 1]),
    seeFunc([0, -1]),
    seeFunc([1, 0]),
    seeFunc([-1, 0]),
    seeFunc([1, 1]),
    seeFunc([1, -1]),
    seeFunc([-1, 1]),
    seeFunc([-1, -1]),
  ];
  // console.log(`For ${coor}, see ${sightlines}`);
  return reduce(
    (acc, stat) => acc + (stat ? 1 : 0),
    0,
    sightlines
  );
};

const printChar = (st: Status | undefined) => {
  switch (st) {
    case Status.EMPTY: return "L";
    case Status.FLOOR: return ".";
    case Status.TAKEN: return "#";
    default: return "?"
  }
}

const printSeating = (map: SeatMap) => {
  for (let i = 0; i < input.length; i++) {
    console.log(input[i].split("").map((_, j) => printChar(map.get(toStr([i, j])))).join(""));
  }
  console.log();
};

// Second element of tuple indicates if the iteration updated any position
const iterate = (map: SeatMap): [SeatMap, boolean] => {
  const newMap: SeatMap = new Map();
  let updated = false;

  for (let [key, status] of map) {
    switch (status) {
      case Status.FLOOR:
        newMap.set(key, Status.FLOOR);
        break;
      case Status.EMPTY:
        const taken = countNeighbors(key, map) === 0;
        updated ||= taken;
        newMap.set(key, taken ? Status.TAKEN : Status.EMPTY);
        break;
      case Status.TAKEN:
        const empty = 5 <= countNeighbors(key, map)
        updated ||= empty;
        newMap.set(key, empty ? Status.EMPTY : Status.TAKEN);
        break;
    }
  }

  return [newMap, updated];
};

const main = () => {
  let map = init(input);
  let iterating = true;


  let passes = 0;
  while (iterating) {
    // printSeating(map); // For debugging
    [map, iterating] = iterate(map);
    passes++;
  }

  console.log("done");
  const total = reduce(
    (acc, val): number => acc + (val === Status.TAKEN ? 1 : 0),
    0,
    Array.from(map.values())
  );
  console.log(`Counted ${total} taken seats after stabilization (${passes} passes)`);
};

main();
