import input from "./input";
import { parseRules, buildRegex } from "./parse";

const main = () => {
  console.log("Parsing rules...");
  const ruleBook = parseRules(input.rules);
  console.log("Building regex...");
  const regex = new RegExp(buildRegex(ruleBook));

  console.log("Beginning matching");
  let matches = 0;
  for (let message of input.messages) {
    const valid = !!message.match(regex);
    valid && matches++;
    console.log(`${valid} => ${message}`);
  }
  console.log(`\nFound ${matches} matches\n`);
};

main();
