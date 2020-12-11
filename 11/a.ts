import input, { toStr, toVec, init, SeatMap, Status } from "./input";
import { all, reduce } from "ramda";

const neighbors = (coor: string) => {
  const [ x, y ] = toVec(coor);
  return [
    [x, y+1],
    [x, y-1],
    [x+1, y],
    [x-1, y],
    [x+1, y+1],
    [x+1, y-1],
    [x-1, y+1],
    [x-1, y-1],
  ].map(toStr);
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
        const taken = all(
          pos => map.get(pos) !== Status.TAKEN,
          neighbors(key)
        );
        updated ||= taken;
        newMap.set(key, taken ? Status.TAKEN : Status.EMPTY);
        break;
      case Status.TAKEN:
        const empty = 4 <= reduce(
          (acc, pos) => acc + (map.get(pos) === Status.TAKEN ? 1 : 0),
          0,
          neighbors(key)
        );
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
