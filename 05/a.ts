import { max } from "ramda";
import input from "./input";
import { getSeatID } from "./parse";

const main = () => {
  const passes = input();

  let highest = 0;
  for (let pass of passes) {
    highest = max(highest, getSeatID(pass));
  }

  console.log(highest);
};

main();
