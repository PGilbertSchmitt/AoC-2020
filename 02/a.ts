import { max } from "ramda";
import input from "./input";

interface IRule {
  freq: [number, number],
  element: string,
  password: string
}

const ruleRegex = /(\d+)-(\d+)\s+(\w):\s+(\w+)/;

const parseLine = (line: string): IRule => {
  const match = line.match(ruleRegex);
  if (match === null) {
    throw `Failed match for rule ${line}`
  }

  const min = match[1];
  const max = match[2];
  const element = match[3];
  const password = match[4];
  return {
    freq: [parseInt(min, 10), parseInt(max, 10)],
    element,
    password
  };
}

const countElement = (element: string, password: string): number =>
  password.split("").reduce<number>((total, char) => total + (char === element ? 1 : 0), 0);

const isPasswordValid = ({freq: [min, max], element, password}: IRule): boolean => {
  const count = countElement(element, password);
  return min <= count && count <= max;
};

const main = () => {
  const lines = input(process.argv[2]);
  const valid = lines.reduce(
    (total, line) => total + (isPasswordValid(parseLine(line)) ? 1 : 0),
    0
  );
  console.log(`Total: ${valid}`);
};

main();
