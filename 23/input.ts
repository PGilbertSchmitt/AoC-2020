import input from "../util/input";

const parse = (str: string) => str.split("").map(x => parseInt(x, 10));

const test = parse("389125467");

const actual = parse("952438716");

export default input({ test, actual });
