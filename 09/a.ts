import { slice } from "ramda";
import { codes, preamble } from "./input";

const pairFound = (sum: number, space: Set<number>): boolean => {
  for (let item of space) {
    let other = sum - item
    // All we need to do is check if the sum minus the current number exists in the set. If so, a pair exists
    // inside the set (our moving window)
    if (other !== item && space.has(other)) {
      return true;
    }
  }

  return false;
};

const main = () => {
  // A rolling set for optimizal search space creation
  const set = new Set(slice(0, preamble, codes));

  for (let i = preamble; i < codes.length; i++) {
    if (!pairFound(codes[i], set)) {
      console.log(`Found a number without a pair: ${codes[i]}`);
      return;
    }
    
    // Update search space by deleting the last element added and adding the new one,
    // creating a moving window that's easily searchable
    set.delete(codes[i-preamble]);
    set.add(codes[i]);
  }
};

main();
