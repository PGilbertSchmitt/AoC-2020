import input from "./input";
import { buildRegistry, createTile } from "./decoder";
import { TileImage } from "./image";
import { all, concat, flatten, unnest } from "ramda";
import { dragonCoordinates, DRAGON_HEIGHT, DRAGON_WIDTH } from "./dragon";

const main = () => {
  const tiles = input.map(createTile);
  const tileRegistry = buildRegistry(tiles);
  const image = new TileImage(tiles[0], tileRegistry);

  let map = image.generateMap();

  const [coordinates, orientedMap] = findDragonLocations(map);
  // console.log(coordinates);
  // for (let row of orientedMap) {
  //   console.log(row);
  // }

  const dragonPoints = unnest(coordinates.map(([ x, y ]) => dragonCoordinates(x, y)))
  const dragonSet = new Set(dragonPoints.map(([ x, y ]) => `${x},${y}`));
  
  let nonDragonCount = 0;
  for (let y = 0; y < orientedMap.length; y++) {
    for (let x = 0; x < orientedMap.length; x++) {
      orientedMap[y][x] === "#" && !dragonSet.has(`${x},${y}`) && nonDragonCount++;
    }
  }

  console.log(`Sea dragon's habitat water roughness level: ${nonDragonCount}`);
};

const findDragonLocations = (map: string[]): [[number, number][], string[]] => {
  for (let rot = 0; rot < 4; rot++) {
    const dragons = findDragons(map);
    if (dragons.length > 1) {
      return [dragons, map];
    }
    if (rot !== 3) { map = TileImage.rotate(map, 1) }
  }
  map = TileImage.hFlip(map);
  for (let rot = 0; rot < 4; rot++) {
    const dragons = findDragons(map);
    if (dragons.length > 1) {
      return [dragons, map];
    }
    if (rot !== 3) { map = TileImage.rotate(map, 1) }
  }
  throw "Couldn't find a map with dragons";
}

const findDragons = (map: string[]) => {
  let dragonSpots: [number, number][] = [];
  const imageHeight = map.length;
  const imageWidth = map[0].length;
  for (let y = 0; y < (imageHeight - DRAGON_HEIGHT + 1); y++) {
    for (let x = 0; x < (imageWidth - DRAGON_WIDTH + 1); x++) {
      if (findDragonAt(map, x, y)) {
        dragonSpots.push([x, y]);
      }
    }
  }
  return dragonSpots;
};

const findDragonAt = (map: string[], x: number, y: number) =>  all(
  ([i, j]) => map[j][i] === "#",
  dragonCoordinates(x, y)
);

try {
  main();
} catch (e) {
  console.log(e);
  console.error("oop");
}
