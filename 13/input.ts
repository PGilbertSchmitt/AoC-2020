import input from "../util/input";

interface Notes {
  time: number;
  busses: number[];
};

const test: Notes = {
  time: 939,
  busses: [7,13,0,0,59,0,31,19]
};

const actual: Notes = {
  time: 1005162,
  busses: [19,0,0,0,0,0,0,0,0,41,0,0,0,0,0,0,0,0,0,823,0,0,0,0,0,0,0,23,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,0,29,0,443,0,0,0,0,0,37,0,0,0,0,0,0,13]
};

const a: Notes = {
  time: 0,
  busses: [67,7,59,61]
};

const b: Notes = {
  time: 0,
  busses: [67,0,7,59,61]
};

const c: Notes = {
  time: 0,
  busses: [67,7,0,59,61]
};

const d: Notes = {
  time: 0,
  busses: [1789,37,47,1889]
};


export default input({ test, actual, a, b, c, d }) as Notes;