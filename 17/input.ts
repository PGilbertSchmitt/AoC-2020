import input from "../util/input";

const small = `###`;

const test = `.#.
..#
###`;

const actual = `.#.#..##
..#....#
##.####.
...####.
#.##..##
#...##..
...##.##
#...#.#.`;

export default input({ small, test, actual });
