import { reduce, clone } from "ramda";
import input from "./input";
import {
  Cardinal,
  Relative,
  Location,
  Ins,
  newLoc,
  getInstructions,
  LEFT_TURN,
  RIGHT_TURN
} from "./nav";

type Nav = {
  ship: Location,
  way: Location
};

const operate = ({ ship, way }: Nav, { move, value }: Ins): Nav => {
  switch (move) {
    case Cardinal.NORTH:
    case Cardinal.SOUTH:
    case Cardinal.EAST:
    case Cardinal.WEST:
      way[move] += value;
      break;
    case Relative.FORWARD:
      ship.E += way.E * value;
      ship.N += way.N * value;
      ship.S += way.S * value;
      ship.W += way.W * value;
      break;
    case Relative.LEFT:
    case Relative.RIGHT:
      // Didn't do the math right, this is actually reversed
      const turnMap = move === Relative.RIGHT ? LEFT_TURN : RIGHT_TURN;
      const swapIndex = value / 90;
      const wayClone = clone(way);
      for (let i = 0; i < 4; i++) {
        way[turnMap[i]] = wayClone[turnMap[(i + swapIndex) % 4]];
      }
  }
  // console.log(`${move}${value} > ${JSON.stringify({ship, way})}`);
  return { ship, way };
};

const main = () => {
  const ship = newLoc();
  const way = newLoc();
  way[Cardinal.NORTH] = 1;
  way[Cardinal.EAST] = 10;
  const nav: Nav = {
    ship, way
  };

  const { E, W, N, S } = reduce(
    operate,
    nav,
    getInstructions(input)
  ).ship;

  console.log(`Ship is at manhattan distance of ${Math.abs(N - S) + Math.abs(E - W)}`);
};

main();
