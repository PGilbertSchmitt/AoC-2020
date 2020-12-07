import input from "./input";
import { getSeatID } from "./parse";

const main = () => {
  const passes = input();
  
  let seats = new Set<number>();
  for (let pass of passes) {
    seats.add(getSeatID(pass));
  }

  // Max seat ID is 1023
  for (let i = 0; i < 1024; i++) {
    if (!seats.has(i) && seats.has(i - 1) && seats.has(i + 1)) {
      console.log(`Found seat ${i} with two neighbors!`);
    }
  }
};

main();
