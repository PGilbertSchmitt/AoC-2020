import input from "./input";

const SUBJECT_NUMBER = 7;
const MOD_NUMBER = 20201227;

export const findLoops = ([a, b]: [number, number]): [number, number] => {
  let loop = 0;
  let key = 1;

  let aLoop = 0;
  let bLoop = 0;

  while (aLoop === 0 || bLoop === 0) {
    loop++;
    key = transform(key, SUBJECT_NUMBER);
    if (aLoop === 0 && a === key) { aLoop = loop; }
    if (bLoop === 0 && b === key) { bLoop = loop; }
  }

  return [aLoop, bLoop];
};

export const transform = (key: number, subject: number): number => (key * subject) % MOD_NUMBER;
