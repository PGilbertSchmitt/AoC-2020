import input from "./input";
import HexStore from "./hex";

const main = () => {
  const tiles = new HexStore();
  
  for (let route of input) {
    tiles.flip(route);
  }

  console.log(`There are ${tiles.countBlack()} black tiles`);
};

main();
