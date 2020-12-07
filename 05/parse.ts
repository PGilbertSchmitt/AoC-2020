import { reduce, take, takeLast } from "ramda";

type digit = 0 | 1;
type digitArray = digit[];

const getBin = (zero: string) => (num: string) => {
  const binArray: digitArray = num.split("").map(n => n === zero ? 0 : 1);
  return parseInt(binArray.join(""), 2);
};

const getRow = getBin("F");
const getSeat = getBin("L");

export const getSeatID = (pass: string) => {
  const row = getRow(take(7, pass));
  const seat = getSeat(takeLast(3, pass));
  return row * 8 + seat;
};
