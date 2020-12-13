import { reduce, clone, indexOf } from "ramda";
import input from "./input";
import {
  Cardinal,
  Relative,
  NavMap,
  Ins,
  newMap,
  getInstructions,
  LEFT_TURN,
  RIGHT_TURN
} from "./nav";

const operate = (map: NavMap, { move, value }: Ins): NavMap => {
  const outmap = clone(map);
  switch (move) {
    case Cardinal.NORTH:
    case Cardinal.EAST:
    case Cardinal.SOUTH:
    case Cardinal.WEST:
      outmap.loc[move] += value;
      break;
    case Relative.FORWARD:
      outmap.loc[outmap.face] += value;
      break;
    case Relative.LEFT:
      outmap.face = LEFT_TURN[(indexOf(outmap.face, LEFT_TURN) + (value / 90)) % 4];
      break;
    case Relative.RIGHT:
      outmap.face = RIGHT_TURN[(indexOf(outmap.face, RIGHT_TURN) + (value / 90)) % 4];
      break;
  }
  // console.log(`Executing ${move}${value} on ${JSON.stringify(map)} => ${JSON.stringify(outmap)}`);
  return outmap;
};

const main = () => {
  const endMap = reduce(
    (map, ins) => operate(map, ins),
    newMap(),
    getInstructions(input)
  );

  const { E, N, S, W } = endMap.loc
  console.log(`Manhattan distance of ${Math.abs(E - W) + Math.abs(N - S)}`);
};

main();
