import input from "./input";
import { findLoops, transform } from "./decrypt";

const main = () => {
  const [card, door] = input;
  const [cardLoop, doorLoop] = findLoops([card, door]);

  let [subject, loop] = cardLoop < doorLoop ? [door, cardLoop] : [card, doorLoop];
  console.log(`Using subject ${subject} with loop ${loop}`);

  let key = 1;
  for (let i = 0; i < loop; i++) {
    key = transform(key, subject);
  }

  console.log(`Encryption key: ${key}`);
};

main();
