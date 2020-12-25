import { reject, filter, reverse, sort, subtract, uniq, range, drop, dropLast } from "ramda";
import { Tile, Registry, Dir, complement, edgeToNums, createTile } from "./decoder";
import input from "./input";

type Coor = [number, number];

// string to coordinate pair
const stoc = (str: string) => str.split(",").map(x => parseInt(x, 10)) as Coor;

// coordinate pair to string
const ctos = ([x, y]: Coor) => `${x},${y}`;

const snip = (str: string) => dropLast(1, drop(1, str));

export class TileImage {
  private registry: Registry;

  // A map of the tile, where the key is the coordinates in a comma separated string, and the value is the Tile
  // at that coordinate. I will rotate and flip tiles before they are entered into the tilemap
  private tileMap: Map<string, Tile>;

  // A queue of edges, where each edge has a string (coordinate in tileMap), direction of where from
  // that coordinate it faces, and a number for the edge to match against the registry
  private edges: [string, Dir, number][];

  private ROT_LIST = [Dir.LEFT, Dir.BOTTOM, Dir.RIGHT, Dir.TOP, Dir.LEFT, Dir.BOTTOM, Dir.RIGHT, Dir.TOP];

  constructor(start: Tile, reg: Registry) {
    this.registry = reg;
    this.tileMap = new Map();
    this.tileMap.set("0,0", start);
    this.edges = [
      ["0,0", Dir.TOP, start.edges.top[0]],
      ["0,0", Dir.BOTTOM, start.edges.bottom[0]],
      ["0,0", Dir.LEFT, start.edges.left[0]],
      ["0,0", Dir.RIGHT, start.edges.right[0]],
    ];
  }

  public generateMap() {
    while (this.edges.length > 0) {
      this.findTile();
    }

    return this.printMap();
  }

  private printMap() {
    const coordinates = Array.from(this.tileMap.keys()).map(stoc);
    const xCoors = sort(subtract, uniq(coordinates.map(c => c[0])));
    const yCoors = reverse(sort(subtract, uniq(coordinates.map(c => c[1]))));

    let image: string[] = [];
    for (let y of yCoors) {
      const row: Tile[] = [];
      for (let x of xCoors) {
        row.push(this.tileMap.get(`${x},${y}`)!);
      }
      image = image.concat(this.createRow(row));
    }

    return image;
  }

  private createRow(row: Tile[]) {
    return range(1,9).map(i => row.map(r => snip(r.data[i])).join(""));
  }

  private findTile() {
    const [baseCoor, dir, edgeNum] = this.edges[0];
    this.edges = drop(1, this.edges);

    const tileArray = this.registry.get(edgeNum)!;
    if (tileArray === undefined || tileArray.length === 1) {
      // This is the end of the map
      return;
    }

    // Remove found entries from registry
    this.registry.delete(edgeNum);
    this.registry.delete(complement(edgeNum));

    const curTile = this.tileMap.get(baseCoor)!;
    const otherTile = tileArray.filter(t => t.id !== curTile.id)[0];
    const newTile = this.reorient(otherTile, curTile, dir);

    this.addTile(newTile, baseCoor, dir);
  }

  private addTile(newTile: Tile, baseCoor: string, dir: Dir) {
    const coor = stoc(baseCoor);
    const newCoor = this.getCoordinate(coor, dir);
    const relDir = this.oppositeSide(dir);
    // Get all neighbors except the base tile
    const neighbors = reject(
      d => d[0] === relDir,
      this.getNeighbors(newCoor)
    );

    // Check what to do for each remaining edge in the new tile
    for (let [nDir, nCoor] of neighbors) {
      const nCoorStr = ctos(nCoor);
      const nTile = this.tileMap.get(nCoorStr);
      if (nTile === undefined) {
        // No neighbor at this coordinate, add edge to queue
        this.edges.push([ ctos(newCoor), nDir, newTile.edges[nDir][0] ]);
      } else {
        // Neighbor here, don't add edge, and just delete the neighbor's edge from queue
        const newEdges = reject(
          edge => edge[0] === nCoorStr && edge[1] === this.oppositeSide(nDir),
          this.edges
        );
        const removedEdges = filter(
          edge => edge[0] === nCoorStr && edge[1] === this.oppositeSide(nDir),
          this.edges
        );
        this.edges = newEdges;
      }
    }

    // And lastly, add new tile to map
    this.tileMap.set(ctos(newCoor), newTile);
  }

  // Reorient the other tile using the base tile's orientation
  private reorient(other: Tile, base: Tile, baseDir: Dir) {
    const baseEdge = base.edges[baseDir][0];
    let otherDir: Dir = Dir.TOP;
    for (otherDir of [Dir.TOP, Dir.BOTTOM, Dir.LEFT, Dir.RIGHT]) {
      if (other.edges[otherDir].includes(baseEdge)) {
        break;
      }
    }

    // Due to how I generate the edges, two tiles, regardless of rotation, will store their
    // edges in reverse order of edge/complement. Because of this, and since baseEdge is the
    // first of the two edges for the base tile, I need to check that they are in reverse
    // order in the other edge, which means if the first of both match, then the new tile
    // needs to be flipped
    const shouldFlip = other.edges[otherDir][0] === baseEdge;

    const rotations = this.getRotations(baseDir, otherDir);

    let newData = TileImage.rotate(other.data, rotations);
    if (shouldFlip) {
      const flipFn = (baseDir === Dir.TOP || baseDir === Dir.BOTTOM)
        ? TileImage.vFlip
        : TileImage.hFlip;
      newData = flipFn(newData);
    }

    return createTile({
      id: other.id,
      tile: newData
    });
  }

  // Flip tiledata around the horizontal axis (top <-> bottom)
  public static hFlip(data: string[]) {
    return reverse(data);
  }

  // Flip tiledata around the vertical axis (left <-> right)
  public static vFlip(data: string[]) {
    return data.map(reverse);
  }

  // Rotate the data clockwise
  // This could be faster by using some shortcuts, but we won't actually
  // do more than a few hundred of these, definitely not millions
  public static rotate(data: string[], times: number) {
    const width = data[0].length;
    let output = data;
    for (let rot = 0; rot < times; rot++) {
      const newData: string[] = [];
      for (let i = 0; i < width; i++) {
        const newRow: string[] = [];

        for (let j = 0; j < width; j++) {
          newRow.push(output[(width-1)-j][i]);
        }

        newData.push(newRow.join(""))
      }
      output = newData;
    }
    return output;
  }

  private oppositeSide(dir: Dir) {
    switch (dir) {
      case Dir.BOTTOM: return Dir.TOP;
      case Dir.TOP: return Dir.BOTTOM;
      case Dir.LEFT: return Dir.RIGHT;
      case Dir.RIGHT: return Dir.LEFT;
    }
  }

  private getRotations(base: Dir, have: Dir) {
    const desired = this.oppositeSide(base);
    const startIdx = this.ROT_LIST.findIndex(d => d === desired);
    return drop(startIdx, this.ROT_LIST).findIndex(d => d === have);
  }

  private getCoordinate([x, y]: Coor, dir: Dir): Coor {
    switch (dir) {
      case Dir.BOTTOM: return [x, y-1];
      case Dir.TOP: return [x, y+1];
      case Dir.LEFT: return [x-1, y];
      case Dir.RIGHT: return [x+1, y];
    }
  }

  private getNeighbors([x, y]: Coor): [Dir, Coor][] {
    return [
      [Dir.BOTTOM, [x, y-1]],
      [Dir.TOP, [x, y+1]],
      [Dir.LEFT, [x-1, y]],
      [Dir.RIGHT, [x+1, y]],
    ]
  }
};
