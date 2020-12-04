import { filter } from "ramda";
import { Passport, CID, keySet, getPassports, parsePassport, keys } from "./parse";
import input from "./input";

const isValid = (passport: Passport): boolean => {
  for (let key of keySet) {
    const val = passport[key];
    if (val === undefined && key !== CID) {
      console.log(`Missing ${key}`);
      return false;
    } else if (!validPair(key, val || "INVALID")) {
      console.log(`Failing on ${key}, ${val}`);
      return false;
    }
  }

  return true;
};

const between = (val: string, low: number, high: number) => {
  const num = parseInt(val);
  // If num is NaN, the comparisons will just return false anyways
  return low <= num && num <= high;
};

const validByr = (val: string) => {
  return val.length === 4 && between(val, 1920, 2002);
};

const validIyr = (val: string) => {
  return val.length === 4 && between(val, 2010, 2020);
};

const validEyr = (val: string) => {
  return val.length === 4 && between(val, 2020, 2030);
};

const validHgt = (val: string) => {
  const match = val.match(/(\d+)(in|cm)/);
  if (match === null) { return false; }
  if (match[2] === "in") {
    return between(match[1], 59, 76);
  } else {
    return between(match[1], 150, 193);
  }
};

const validHcl = (val: string) => {
  return !!val.match(/^#[\da-f]{6}$/);
};

const validEcl = (val: string) => {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val);
};

const validPid = (val: string) => {
  return !!val.match(/^\d{9}$/);
};

const validPair = (key: keys, val: string) => {
  switch (key) {
    case "cid":
      return true;
    case "byr":
      return validByr(val);
    case "iyr":
      return validIyr(val);
    case "eyr":
      return validEyr(val);
    case "hgt":
      return validHgt(val);
    case "hcl":
      return validHcl(val);
    case "ecl":
      return validEcl(val);
    case "pid":
      return validPid(val);
  }
};

const main = () => {
  const document = input();
  const passports = getPassports(document).map(parsePassport);

  console.log(filter(
    isValid,
    passports
  ).length);
};

main();
