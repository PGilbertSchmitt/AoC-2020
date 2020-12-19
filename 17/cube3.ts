import R from "ramda";

export type Vector = number[];

// Big potential optimization I could make:
// So, because the starting positions are all on y=0 and z=0, they're all symmetric to those axes.
// This means that you can generate all positions for y>0 and z>0 and just count them twice. However,
// it is important that you also reflect any position where y=1 OR z=1, so that your y=0 and z=0 slice
// is properly generated.

export class Pocket {
  private o = new Map<number, [Vector, number]>();
  private nul = [0, 0, 0, 0] as const;

  private hash ([w, x, y, z]: Vector): number {
    // This will only work for this problem because 6 iterations will
    // not be enough for there to be collisions
    return w + (x*100) + (y*10000) + (z*1000000);
  }

  public add(v: Vector) {
    const hash = this.hash(v);
    const [_, count] = this.o.get(hash) || [this.nul, 0];
    // console.log(`${v} currently has ${count} blocks, setting to ${count + 1}`);
    this.o.set(hash, [v, count+1]);

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

const qBits = [-1, 0, 1];
const perms4 = R.lift((a,b,c,d)=>[a,b,c,d]);
const permList = perms4(qBits, qBits, qBits, qBits);

const relativeCoordinates = R.reject(
  R.equals([0, 0, 0, 0]),
  permList
);

const neighborList = (v: Vector) => (relativeCoordinates.map(R.zipWith<number, number, number>(R.add, v)) as Vector[]);

const updateNeighbors = (getter: (v: Vector) => Vector[]) => (counter: Pocket, cube: Vector): Pocket => {
  getter(cube).forEach(cell => counter.add(cell));
  return counter;
}

export const iterate = (prev: Pocket): Pocket => {
  console.log("iterate");
  const cubes = prev.keys().map(x => x[0]);

  console.log(`Iterating neighbor counts for ${cubes.length} cubes:`);
  // For all current cubes, increment the count of their neighbors
  const counter = R.reduce(
    updateNeighbors(neighborList),
    new Pocket(),
    cubes
  );

  // console.log(counter);

  console.log(`Generated ${counter.size()} counts with keys:`)
  // console.log(counter.keys());
  console.log("Generating new layer...");

  // Use those counts to create the next generation
  const next = R.reduce(
    (pok, [v, c]) => {
      c === 3 && pok.add(v);
      c === 2 && prev.has(v) && pok.add(v);
      return pok;
    },
    new Pocket(),
    counter.keys()
  );

  // console.log(next);

  return next;
}
