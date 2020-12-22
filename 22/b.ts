import { path, reduce, take, reverse } from "ramda";
import input from "./input";

const DEBUG = false;

const log = (str: string) => {
  DEBUG && log(str);
}

type Deck = number[];

type Trie = {
  end?: boolean;
  next?: Trie;
  [key: number]: Trie;
}

const triePath = (a: Deck, b: Deck): (number | "next")[] => [...a, "next", ...b];

const trieHas = (trie: Trie, a: Deck, b: Deck): boolean => {
  return !!path<Trie>(triePath(a, b), trie)?.end;
};

const setTrie = (trie: Trie, a: Deck, b: Deck) => {
  let ref: Trie | undefined = trie;
  for (let key of triePath(a, b)) {
    if (ref[key] === undefined) { ref[key] = {} }
    ref = ref[key]!; // Forcing here because the last line will ensure a new Trie exists
  }
  ref["end"] = true;
};

const winA = ([a, ...aRest]: Deck, [b, ...bRest]: Deck): [Deck, Deck] =>
  [ [...aRest, a, b], bRest ];
const winB = ([a, ...aRest]: Deck, [b, ...bRest]: Deck): [Deck, Deck] =>
  [ aRest, [...bRest, b, a] ];

const main = () => {
  let gameNumCounter = 1;

  const playRound = (a: Deck, b: Deck, gameNum: number): [Deck, Deck] => {
    const [aTop, ...aRest] = a;
    const [bTop, ...bRest] = b;

    // Do we recurse or not?
    if (aTop <= aRest.length && bTop <= bRest.length) {
      log("Playing a sub-game to determine the winner...");
      const [newA, newB] = playGame(take(aTop, aRest), take(bTop, bRest), ++gameNumCounter);
      log(`\n...anyway, back to game ${gameNum}`);
      return newA.length > 0 ? winA(a, b) : winB(a, b);
    }
    log(`Player 1 plays: ${aTop}`);
    log(`Player 2 plays: ${bTop}`);
    const aWin = aTop > bTop;
    log(`Player ${aWin ? 1 : 2} wins!`);
    return aTop > bTop ? winA(a, b) : winB(a, b);
  };

  const playGame = (a: Deck, b: Deck, gameNum: number): [Deck, Deck] => {
    log(`\n== Game ${gameNum} ==\n`);

    let curA = a;
    let curB = b;
    let i = 1;
    const trie: Trie = {};
    while (curA.length > 0 && curB.length > 0) {
      log(`\n-- Round ${i++} (Game ${gameNum})`);
      log(`Player 1's deck: ${curA.join(", ")}`);
      log(`Player 2's deck: ${curB.join(", ")}`);

      if (trieHas(trie, curA, curB)) {
        log(`Discovered an old round in this game with path ${triePath(curA, curB)}`);
        return [[0], []]; // Just send garbage, A wins as long as the first array is not empty
      }
      setTrie(trie, curA, curB);

      [curA, curB] = playRound(curA, curB, gameNum);
    }
    return [curA, curB];
  };

  const [deckA, deckB] = playGame(input.deckA, input.deckB, 1);
  const winner = deckA.length > 0 ? deckA : deckB;
  
  let mult = 1;
  const score = reduce(
    (acc, elem) => acc + (elem * mult++),
    0,
    reverse(winner)
  );

  console.log(`The dang crab won again with a total score of ${score}`);
};

main();