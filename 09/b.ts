import { codes, answer } from "./input";
import { slice, last } from "ramda";

const main = () => {
  // Tracking indices
  let low = 0;
  let high = 1;

  let sum = codes[low] + codes[high];

  while (sum !== answer && high < codes.length) {
    if (sum < answer) {
      high++;
      sum += codes[high];
    } else {
      sum -= codes[low];
      low++;
    }
  }

  const window = slice(low, high+1, codes).sort();

  console.log(`Sum of lowest and highest in window are ${window[0] + last(window)!}`);
};

main();
