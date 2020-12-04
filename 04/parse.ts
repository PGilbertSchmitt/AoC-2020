import { flatten } from "ramda";

export const BYR = "byr"; // (Birth Year)
export const IYR = "iyr"; // (Issue Year)
export const EYR = "eyr"; // (Expiration Year)
export const HGT = "hgt"; // (Height)
export const HCL = "hcl"; // (Hair Color)
export const ECL = "ecl"; // (Eye Color)
export const PID = "pid"; // (Passport ID)
export const CID = "cid"; // (Country ID)

export const keySet = [BYR, IYR, EYR, HGT, HCL, ECL, PID, CID] as const;
export type keys = typeof keySet[number];

export type Passport = {
  [k in typeof keySet[number]]?: string;
}

export const getPassports = (doc: string) => doc.split("\n\n");

export const parsePassport = (passStr: string): Passport => {
  // If this fails at some point, try a regex?
  const partList = flatten(passStr.split("\n").map(line => line.split(" ")));
  const passport: Passport = {};

  for (let part of partList) {
    const [key, val] = part.split(":");
    if (keySet.includes(key as keys)) {
      // forced typing is okay due to conditional check. Not sure how to implicity get type by inclusion in tuple
      passport[key as keys] = val.trim();
    }
  }

  return passport;
};
