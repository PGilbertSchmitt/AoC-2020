import { reduce, reverse } from "ramda";
import input from "./input";

const iterate = (a: number[], b: number[]): [number[], number[]] => {
  const [ aTop, ...aRest ] = a;
  const [ bTop, ...bRest ] = b;

  return aTop > bTop
    ? [ [ ...aRest, aTop, bTop ], bRest ]
    : [ aRest, [ ...bRest, bTop, aTop ] ];
}

const main = () => {
  let { deckA, deckB } = input;
  while (deckA.length > 0 && deckB.length > 0) {
    [ deckA, deckB ] = iterate(deckA, deckB);
  }

  const winner = deckA.length > 0 ? deckA : deckB;

  let mult = 1;
  const score = reduce(
    (acc, elem) => acc + (elem * mult++),
    0,
    reverse(winner)
  );

  console.log(`Total winner's score: ${score}`);
};

main();
