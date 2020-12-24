import { reduce, sum } from "ramda";
import { parse } from "./parse";

enum Dir {
  E = "EAST",
  W = "WEST",
  SE = "SOUTH_EAST",
  SW = "SOUTH_WEST",
  NE = "NORTH_EAST",
  NW = "NORTH_WEST"
};

type Coor = [number, number];

class HexStore {
  private map = new Map<string, boolean>();

  public flip(route: string) {
    const dirs = this.directions(route);
    let relX = 0; // Eash to west
    let relY = 0; // Northwest to south east

    for (let dir of dirs) {
      switch (dir) {
        case Dir.E:
          relX++;
          break;
        case Dir.W:
          relX--;
          break;
        case Dir.SE:
          relY++;
          break;
        case Dir.NW:
          relY--;
          break;
        case Dir.SW:
          relX--;
          relY++;
          break;
        case Dir.NE:
          relX++;
          relY--;
          break;
      }
    }

    const coor = `${relX},${relY}`;
    const tile = !!this.map.get(coor);
    this.map.set(coor, !tile);
  }

  public countBlack() {
    const tiles = Array.from(this.map.values());
    return this.countTrue(tiles);
  }

  // Generate the next map from the old one using a variation of CGoL rules;
  public generate() {
    const entries = Array.from(this.map.entries())
    // Get list of all current black coordinates
    const blackCoors = entries
      .filter(([ _coor, black ]) => black)
      .map(entry => entry[0]);

    const countMap = new Map<string, number>();
    for (let coorStr of blackCoors) {
      const coor = this.strToCoor(coorStr);
      this.neighbors(coor).forEach(neighbor => {
        const nStr = this.coorToStr(neighbor);
        const num = countMap.get(nStr) || 0;
        countMap.set(nStr, num+1);
      });
    }

    const newTileMap = new Map<string, boolean>();
    for (let [coorStr, count] of countMap.entries()) {
      if (this.map.get(coorStr)) {
        // Was black 
        newTileMap.set(coorStr, count === 1 || count === 2);
      } else {
        // Was white
        newTileMap.set(coorStr, count === 2);
      }
    }

    this.map = newTileMap;
  }

  private directions(route: string) {
    const dirStrings = parse(route);
    return dirStrings.map(str => {
      switch (str) {
        case "e": return Dir.E;
        case "w": return Dir.W;
        case "ne": return Dir.NE;
        case "nw": return Dir.NW;
        case "se": return Dir.SE;
        case "sw": return Dir.SW;
        default:
          throw `Unknown direction ${str}`;
      }
    })
  }

  private countTrue(arr: boolean[]) {
    return sum(arr.map(x => x ? 1 : 0))
  }

  private neighbors([x, y]: Coor) {
    return [
      [x+1, y],
      [x-1, y],
      [x, y+1],
      [x, y-1],
      [x+1, y-1],
      [x-1, y+1]
    ] as Coor[];
  }

  private strToCoor(str: string) {
    return str.split(",").map(x => parseInt(x, 10)) as Coor;
  }

  private coorToStr(coor: Coor): string {
    return coor.join(",");
  }
}

export default HexStore;
