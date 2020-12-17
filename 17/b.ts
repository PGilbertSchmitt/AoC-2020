import input from "./input";
// import { iterate, Pocket, Vector, vecToStr } from "./cube";
import { Pocket, Vector, iterate } from "./cube2";

// type ZMap = Set<number>;
// type YMap = Map<number, ZMap>;
// type XMap = Map<number, YMap>;
// type WMap = Map<number, XMap>;
class Pocket4 extends Pocket {
  private o = new Map<number, Vector>();

  private hash ([w, x, y, z]: Vector): number {
    // This will only work for this problem because 6 iterations will
    // not be enough for there to be collisions
    return w + (x*100) + (y*10000) + (z*100000);
  }

  public add(v: Vector) {
    // !this.o.has(w) && this.o.set(w, new Map());
    // !this.o.has(x) && this.o.get(w)?.set(x, new Map());
    // !this.o.has(y) && this.o.get(w)?.get(x)?.set(y, new Set());
    // this.o.get(w)?.get(x)?.get(y)?.add(z);
    this.o.set(this.hash(v), v);

    return this;
  }

  public has(v: Vector) {
    return this.o.has(this.hash(v));
  }

  public keys() {
    return Array.from(this.o.values());
  }

  public size() {
    return this.o.size;
  }
};

const convert = (doc: string): Pocket4 => {
  const start: Pocket4 = new Pocket4();

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
    pocket = iterate(pocket, new Pocket4(), 4); 
  }

  console.log(`Total: ${pocket.size()}`);
};

main();
