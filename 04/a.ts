import { filter } from "ramda";
import { Passport, CID, keySet, getPassports, parsePassport } from "./parse";
import input from "./input";

const isValid = (passport: Passport): boolean => {
  for (let key of keySet) {
    if (!passport[key] && key !== CID) {
      return false;
    }
  }

  return true;
}

const main = () => {
  const document = input;
  const passports = getPassports(document).map(parsePassport);

  console.log(filter(
    isValid,
    passports
  ).length);
};

main();
