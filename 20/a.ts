import input from "./input";
import { createTile, buildRegistry } from "./decoder";
import { values } from "ramda";

const main = () => {
  const tiles = input.map(createTile);
  const tileRegistry = buildRegistry(tiles);

  for (let tile of tiles) {
    for (let edge of values(tile.edges)) {
      const neighbors = tileRegistry.get(edge[0]) || [];
      if (neighbors.length > 2) {
        console.log("We got major beef here, dog");
      } else if (neighbors.length === 2) {
        const [a, b] = neighbors;
        a.neighbors.push(b);
        b.neighbors.push(a);
      }
    }
  }

  let product = 1;
  for (let tile of tiles) {
    if (tile.neighbors.length === 4) {
      product *= tile.id;
    }
  }

  console.log(product);
};

main();
