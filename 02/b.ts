import { max } from "ramda";
import input from "./input";

interface IRule {
  posA: number,
  posB: number,
  element: string,
  password: string
}

const ruleRegex = /(\d+)-(\d+)\s+(\w):\s+(\w+)/;

const parseLine = (line: string): IRule => {
  const match = line.match(ruleRegex);
  if (match === null) {
    throw `Failed match for rule ${line}`
  }

  const posA = match[1];
  const posB = match[2];
  const element = match[3];
  const password = match[4];
  return {
    // subtract 1 since positions are 1-indexed, but I need 0-index positions
    posA: parseInt(posA) - 1,
    posB: parseInt(posB) - 1,
    element,
    password
  };
}

const isPasswordValid = ({posA, posB, element, password}: IRule): boolean => {
  return (password[posA] === element) !== (password[posB] === element);
};

const main = () => {
  const lines = input;
  const valid = lines.reduce(
    (total, line) => total + (isPasswordValid(parseLine(line)) ? 1 : 0),
    0
  );
  console.log(`Total: ${valid}`);
};

main();
