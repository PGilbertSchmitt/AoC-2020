// So clearly this problem was based on the Chinese Remainder Theorem,
// but I couldn't get that solution to work. Not sure what I was doing

import { take } from "ramda";
import input from "./input";

const main = () => {
  const busses = input.busses;
  const modPairs: { offset: number, busId: number }[] = [];

  for (let i = 0; i < busses.length; i++) {
    if (busses[i] !== 0) {
      const busId = busses[i];
      modPairs.push({ busId, offset: i });
    }
  }

  const passList = modPairs.map(({ busId, offset }) => (time: number) => (time + offset) % busId === 0);

  let currentTime = 0;
  let currentLCM = modPairs[0].busId;
  for (let i = 1; i < modPairs.length; i++) {
    while (!passList[i](currentTime)) {
      currentTime += currentLCM;
    }
    console.log(`${currentTime} works for ${take(i+1, modPairs.map(p => p.busId))}`);
    currentLCM *= modPairs[i].busId;
  }
};

main();
