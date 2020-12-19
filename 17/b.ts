import input from "./input";
import { Pocket, iterate } from "./cube2";

const convert = (doc: string): Pocket => {
  const start: Pocket = new Pocket();

  const lines = doc.split("\n").map(l => l.split(""));
  for (let x = 0; x < lines.length; x++) {
    const line = lines[x];
    for (let y = 0; y < line.length; y++) {
      line[y] === '#' && start.add([ x, y, 0, 0 ]);
    }
  }

  return start;
}

const main = () => {
  let pocket = convert(input);

  console.log(pocket);

  for (let i = 0; i < 6; i++) {
    console.log(`Dealing with ${pocket.size()} cubes`);
    pocket = iterate(pocket); 
  }

  console.log(`Total: ${pocket.size()}`);
};

main();
