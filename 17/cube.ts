import R from "ramda";

export type Vector = number[];
export type Pocket = Set<string>;

const strToVec = (str: string) => str.split(",").map(s => parseInt(s, 10)) as Vector;
export const vecToStr = (v: Vector) => v.join(",");

// This would have taken a minute to physically write out the different
// relative coordinates of a cube's neighbors. However, the 30 minutes
// hear taught me more about Ramda, particularly currying, partial
// application, and the `lift` and `zipWith` functions. Then I lost
// my patience, because you can't generalize R.lift like:
// ```
// R.lift((...all) => all)
// ```
const qBits = [-1, 0, 1];
const perms3 = R.lift((a,b,c)=>[a,b,c]);
const perms4 = R.lift((a,b,c,d)=>[a,b,c,d]);
const permList = (count: number) => count === 3 ? perms3(qBits, qBits, qBits) : perms4(qBits, qBits, qBits, qBits);

const relativeCoordinates = (count: number) => R.reject(
  R.equals(R.repeat(0, count)),
  permList(count)
);

const neighborList = (count: number) => (v: Vector) => (relativeCoordinates(count).map(R.zipWith<number, number, number>(R.add, v)) as Vector[]);

const setCube = (prev: Pocket, getter: (v: Vector) => Vector[]) => (next: Pocket, cube: Vector): Pocket => {
  const cubeStr = vecToStr(cube);
  const neighbors = R.map(cell => prev.has(vecToStr(cell)), getter(cube))
  const neighborCount = R.length(R.filter(R.identity, neighbors));

  neighborCount === 3 && next.add(cubeStr);
  neighborCount === 2 && prev.has(cubeStr) && next.add(cubeStr);
  
  return next;
};

export const iterate = (prev: Pocket, dimensions: number): Pocket => {
  console.log("iterate");
  const cubes = Array.from(prev.keys()).map(strToVec);
  const getNeighbors = neighborList(dimensions);
  // console.log(getNeighbors(cubes[0]));
  const searchSpace = R.uniq(R.unnest(R.append(cubes, cubes.map(getNeighbors))));
  const next = R.reduce(
    setCube(prev, getNeighbors),
    new Set() as Pocket,
    searchSpace
  );

  return next;
}
