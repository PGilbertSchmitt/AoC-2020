import input from "./input";
import HexStore from "./hex";

const main = () => {
  const tiles = new HexStore();

  // Initial config
  for (let route of input) {
    tiles.flip(route);
  }

  for (let day = 0; day < 100; day++) {
    tiles.generate();
  }

  console.log(`Got ${tiles.countBlack()} black tiles after 100 days`);
};

main();
