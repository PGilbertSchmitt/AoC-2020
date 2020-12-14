import { concat, reduce } from "ramda";
import ops from "./input";

// Creates some special masks for bitwise operations
// The first is a 0'd mask to be ORed with the value
// The second is an X mask to be ANDed with the previous outcome
const createMasks = (maskStr: string): [bigint, bigint] => {
  let zeroMask = 0n;
  let xMask = 0n;

  let pos = BigInt(maskStr.length - 1);
  for (let i = 0; i < maskStr.length; i++) {
    const bit = maskStr[i];
    zeroMask |= ((bit === "1" ? 1n : 0n) << pos);
    xMask |= ((bit === "X" ? 1n : 0n) << pos);
    pos--;
  }

  return [zeroMask, xMask];
}

const floatMasks = (maskStr: string): bigint[] => {
  let perms: bigint[] = [0n];

  let pos = BigInt(maskStr.length - 1);
  for (let i = 0; i < maskStr.length; i++) {
    if (maskStr[i] === "X") {
      perms = concat(perms, perms.map(p => p | (1n << pos)));
    }
    pos--;
  }

  return perms;
};

const main = () => {
  let store = new Map<bigint, bigint>();

  // Will all be overwritten since the first op always sets the mask
  let zeroMask: bigint = 0n;
  let xMask: bigint = 0n;
  let perms: bigint[] = [];

  for (let line of ops) {
    if (line.type === "MASK") {
      [zeroMask, xMask] = createMasks(line.mask);
      perms = floatMasks(line.mask);
    } else {
      const baseMask = (line.addr | zeroMask) - (line.addr & xMask)
      const addrs = perms.map(p => p | baseMask);
      for (let addr of addrs) {
        store.set(addr, line.value);
      }
    }
  }

  // Ramda's sum function doesn't support bitint
  const total = reduce(
    (acc, val) => acc + val,
    0n,
    Array.from(store.values())
  );

  console.log(total);
};

main();
