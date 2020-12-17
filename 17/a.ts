import input from "./input";
import { iterate, Pocket, vecToStr } from "./cube";

const convert = (doc: string): Pocket => {
  const start: Pocket = new Set();

  const lines = doc.split("\n").map(l => l.split(""));
  for (let x = 0; x < lines.length; x++) {
    const line = lines[x];
    for (let y = 0; y < line.length; y++) {
      line[y] === '#' && start.add(vecToStr([ x, y, 0 ]));
    }
  }

  return start;
}

const main = () => {
  let pocket = convert(input);
  for (let i = 0; i < 6; i++) {
    const next = iterate(pocket, 3);
    pocket = next;     
  }

  console.log(pocket.size);
};

main();
