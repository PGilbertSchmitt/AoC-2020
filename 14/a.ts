import ops from "./input";
import { reduce } from "ramda";

// The first returned bigint is the normal mask, the second is the and-mask, to be
// and'ed with the value first.
const toMasks = (maskStr: string): [bigint, bigint] => {
  let mask = 0n;
  let andMask = 0n;

  let pos = 35n;
  for (let i = 0; i < maskStr.length; i++) {
    const bit = maskStr[i];
    andMask |= ((bit === "X" ? 0n : 1n) << pos);
    mask |= ((bit === "1" ? 1n : 0n) << pos);
    pos--;
  }

  return [mask, andMask];
}

export const maskValue = (value: bigint, maskStr: string): bigint => {
  const [ mask, andMask ] = toMasks(maskStr);
  return (value - (value & andMask)) + mask;
}

const main = () => {
  const store = new Map<bigint, bigint>();

  // Will be overwritten by the first instruction
  let curMask = "";

  for (let line of ops) {
    line.type === "MASK"
      ? curMask = line.mask
      : store.set(line.addr, maskValue(line.value, curMask));
  }

  // Ramda's sum function doesn't support bitint
  const total = reduce(
    (acc, val) => acc + val,
    0n,
    Array.from(store.values())
  );

  console.log(`Memory sum after port initialization is ${total}`)
};

main();
