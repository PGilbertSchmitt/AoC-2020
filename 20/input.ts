import input from "../util/input";

export interface RawTile {
  id: number;
  tile: string[];
};

const convert = (doc: string): RawTile[] => {
  return doc.split("\n\n").map(tileString => {
    const [idLine, ...tileLines] = tileString.split("\n");
    const id = parseInt(idLine.split(" ")[1]);
    return {
      id,
      tile: tileLines
    }
  });
};

const test = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;

const actual = `Tile 3001:
##...#..##
.##...#.##
###.......
#...##..##
...#..#..#
#..#...#..
#......#..
....#.##..
#......#.#
..##.#...#

Tile 2069:
###..##..#
....##.###
###..##..#
..#..#.#.#
#.........
##.#...#.#
.........#
....#..#.#
#.........
###.#...#.

Tile 3023:
.##..##...
......##.#
#......#..
..#....#..
#.....#.#.
#.....#...
...#...#..
......####
....###..#
.#.#.#...#

Tile 3389:
....#..#.#
##...#....
.....#....
.....#..#.
.#...##...
##..#...##
##.##..#..
#...##....
.#....#...
..#.......

Tile 2693:
#.#.###.#.
....#.....
...#.##.#.
.###.....#
.#..#..#..
#..#....#.
#.........
......#..#
#..#......
...#.###..

Tile 1987:
####.#..#.
##.#.....#
#.#..###..
.#.#..###.
#.....#...
#..#......
.....##..#
....##....
#....#.#.#
.###...#.#

Tile 2113:
...#.###.#
#.#.##.#..
.....##..#
#.#..#....
#........#
#.#.#.###.
#.##.###..
..#.###..#
......#.##
#..#.#...#

Tile 1999:
#.####..##
#.##..#...
.#..####..
.#..#.#...
......#.#.
.......#..
.#........
##..#.#..#
......#...
.#####..##

Tile 1973:
#..#.###.#
.......#.#
#..##....#
..#.#.....
.##.....#.
#....#.#.#
...#.###.#
#......#.#
......#.##
#.#.#...#.

Tile 1801:
######.#.#
#..###...#
.#.##..#..
.##..#.#.#
..........
..#...#.#.
..#......#
##.......#
#....#...#
#..#.#.#..

Tile 3881:
#.###...#.
#......#..
#.....#..#
......#..#
#.......#.
#.#..#..#.
##....##..
#..#.#...#
#.#......#
.#...#.###

Tile 1823:
####..#.##
##.......#
.......#..
....#.####
.#.#.#..#.
#....#....
#.........
#..#......
.####.#..#
#.###.#...

Tile 1031:
..##.##.#.
#.#.......
#...#....#
.....#.#.#
#.....#...
#.#.#.....
....#....#
#.........
..#.......
##.###.###

Tile 1361:
.#.####..#
##..#..#..
.#........
.##......#
#..#......
.#.......#
#..#..#...
#..#......
#........#
#..##.#.#.

Tile 1483:
.###....##
...#....#.
..........
#..##....#
#......#.#
#.........
##.#......
.....#.###
#...#.....
#..#.##..#

Tile 2381:
.#.#...##.
#...#.....
...#.#...#
...##.##..
...##.....
..##......
........##
#..##..##.
..##.#..#.
#####..#..

Tile 2447:
.##.##..#.
.#....##.#
.#..#..###
...##....#
#.....###.
......#..#
#.......##
.......#..
.....#.#.#
.#.####.##

Tile 2633:
..##.#...#
.........#
#..##.....
.#.#...###
..#....##.
#.#.#...##
#.##.....#
#........#
....#.....
..##..##.#

Tile 1861:
.###.###.#
.##.#..#..
##..#..#.#
##..#..#.#
.###..#.#.
..........
.....#....
....###.##
.#...#....
.#.##..##.

Tile 1453:
#....#...#
#..#.....#
..#..#...#
#.#..#...#
#.#......#
##..##...#
...#...#..
#..#...###
....#..#..
#.#.#.....

Tile 3719:
.#...#####
.##..#....
.#...#...#
.......#.#
#....#...#
....###...
..#..##...
..#..##...
##......#.
#####.#..#

Tile 3167:
.......#..
#........#
.#...#..##
.#.#.#...#
#..#..##.#
#.........
.#....#...
##..#....#
....#....#
#.###..#.#

Tile 2521:
.#.#.##...
#...#.#.#.
#........#
.......#..
..#.......
#....#..##
.#..#.#...
#.....##.#
....#.##.#
..#######.

Tile 1601:
....##.#.#
...##...#.
#..##....#
#.###...#.
#.......##
..#....###
...#..#.##
....#..###
##..#..##.
#......#..

Tile 1657:
.##...#...
##.....#.#
##.#.##.#.
#.#...#..#
.......#.#
........#.
#.#......#
##..#..#.#
.#....#..#
..#..##.##

Tile 3919:
##....#.##
....#..#.#
#..#.....#
#......#.#
#.....#...
#...#...#.
..###....#
#..##.....
..##.#..##
####..#..#

Tile 3851:
###.#####.
##.......#
#..#.....#
#......###
......#.#.
#.##..##..
#...#....#
.....##.#.
#...##.#..
........##

Tile 3821:
.###.#####
.....#....
...##....#
##........
#.#..#....
#..#..##..
...#.###..
#....#....
#...#....#
..#..###..

Tile 3499:
#######..#
#...##...#
##...#...#
......##.#
#.##......
#.........
...#..#..#
.....#.#..
....##....
.###...#.#

Tile 3191:
##.#.#..#.
....##....
...#...#.#
...##..#..
#..##.....
#...#.#..#
.#.#...#..
#####...#.
##.....##.
..###....#

Tile 3137:
.#...#....
##........
#..#...#..
#..#..#...
..#...#...
.##......#
..#..###..
#.#..###..
#..#.#....
.#......##

Tile 2551:
#.#####.##
..#.#..#..
#.........
#..#.##.##
...###.##.
..####..##
#.#..#...#
#.....#...
#.#......#
#.##.#.###

Tile 3217:
#.####...#
.........#
..#......#
##.#..#.##
#..##..#..
.#.#....##
#.#......#
.........#
.#.##.#..#
....##.#.#

Tile 3491:
###.###..#
.#........
..#....#..
...#..#..#
##.#....#.
#....#....
#.....#...
.##......#
.#.......#
#....#.##.

Tile 3181:
#.#.#####.
##.#.....#
#..#.#..#.
##..#..#..
#..#....#.
........#.
#...##..##
#.##.##..#
.#.#.#...#
#.#.###.#.

Tile 2819:
..#.#.#.#.
.....#.#..
..#.#..#..
#..#.#.#.#
#.#.#..##.
##.....##.
##......##
##.###.#..
...#...#.#
..#.#..#.#

Tile 2857:
###.#....#
####.....#
#....#..#.
#....##...
...#.##...
#....#...#
.#...#...#
##.......#
#..####.#.
...###.###

Tile 1783:
#..##....#
#.....##.#
#......###
....######
...####.##
#.......#.
...#.....#
..........
#........#
.#.##.##..

Tile 2297:
.###.####.
.....##.##
...#...#..
##........
.......##.
##.#.#.##.
##.#.#..#.
##........
...#.##..#
.###...###

Tile 3727:
...#..#.#.
###.##.#..
#.##..#.#.
.#......#.
##........
.#....####
#...#..#.#
########.#
....#####.
####.#.#.#

Tile 2237:
.####.##..
#....##...
.......#..
#......#..
...#...#..
.........#
#....#.#..
#...#.#...
.........#
#####.....

Tile 2281:
####..###.
#...#.#..#
#........#
#.#.#.##.#
#........#
.###.#....
#.....#...
...##..#..
##......##
###.....#.

Tile 1321:
.....##..#
.#.#......
#..#....##
....##....
#...#...#.
#.....#..#
..#.....##
..#.......
.##...#...
.#.###....

Tile 1489:
##..#.....
..........
#........#
###......#
###......#
#....#....
..........
...#..#..#
....#....#
#.#.#....#

Tile 2251:
#..#...#..
##..#....#
........#.
##.......#
##..#.#...
#..#.#...#
....##...#
....###.#.
#...#..##.
#..##.###.

Tile 3467:
#.##...#.#
#...#.....
#.#....##.
###....#..
#..#####..
...#......
...#......
.#.#.....#
#..#.....#
.#.######.

Tile 2677:
.#....##.#
#.#.#.....
#.#....#.#
.......#.#
###.#....#
#..##.....
#.###.....
#..###....
..........
#.#.#...##

Tile 3457:
.#.#.#.###
#..#..#...
###......#
#...#....#
#.#...####
#.......##
...#.##...
#......#.#
#...#.....
.###.....#

Tile 3307:
#....#.###
#....##.#.
..#.###...
##.##....#
...#......
....#.#..#
..#.....##
.....#.#..
#...#..##.
#.#...#.#.

Tile 3187:
.###.#.#.#
..#..#...#
#.....#..#
#.......##
...#.#..#.
#........#
.#.....#..
.#...#.#.#
#.....#..#
......####

Tile 2357:
.#...##..#
..#.#...##
......#..#
.#....#..#
#.....####
##.....##.
#.###.....
#......#.#
...##.#...
.#....###.

Tile 3529:
.##...###.
.......#..
.......#.#
.........#
##..#...#.
##..#..#.#
#....##.##
.........#
#........#
###....#.#

Tile 1069:
...##.....
##.#...#..
#..#.#...#
..#..#.#..
##.#..##.#
#.#..#.##.
#..#.....#
#..#.#....
.........#
.###..##..

Tile 2393:
.#.#.....#
.......###
..........
..##...#..
.....#....
.........#
#.##.....#
...##..#..
..#...#..#
####..#...

Tile 2389:
.#####...#
#........#
#.#.......
.#........
........#.
#.........
.....#.#.#
...###...#
#.......#.
#####.####

Tile 3673:
#######..#
#..#..##..
....#...#.
#....#....
...#..#.#.
#.#..##...
....###..#
#.....#..#
#........#
.##..###..

Tile 1907:
.###......
#.....##..
#.#...#...
#....#####
.....#..##
#.#......#
#....##...
#.....##.#
##.#.##...
....###.##

Tile 2963:
.#.######.
......#...
#.....##..
.#.......#
.....#....
.#...#...#
#.#......#
###.......
###....##.
#..##.##..

Tile 3583:
.....##...
#.....#.##
##.......#
.#.......#
#........#
#....#....
.#.##....#
#.......##
#..####...
#....###..

Tile 3251:
.####.#...
###.#....#
....#.####
#.#...####
.#........
##.#.....#
..##..#...
.#...#.#.#
..#.....#.
#.###.##..

Tile 2939:
.###...#..
.......#..
#...##.#.#
.#.....###
.#.##.....
#......#.#
#..####.##
##.##....#
....##...#
#.##.##.##

Tile 2557:
..##.#.#..
#.#..#...#
..#......#
..#...#...
#.#...#.#.
#........#
##....####
#.#..#..#.
#.........
.#.###.##.

Tile 2753:
.#.##....#
#......#.#
#........#
#.....#..#
.....#...#
.........#
.##.#.....
....#.#..#
........##
.##..####.

Tile 2971:
...#.##..#
#..#....##
.#.##.....
..........
........##
#..##.....
..##.....#
...#.#...#
#....#....
...#.#.#..

Tile 2539:
#....#..#.
..###.....
###.#....#
........##
#..#..#...
..#.##.#.#
#..##...##
####......
#.#....##.
###.#.##.#

Tile 1913:
##..#....#
#....#..##
#..##...##
#...##...#
##..#.....
##..#.....
....##...#
#..##.....
#..#..####
#..##..##.

Tile 2153:
...#......
#.#.....#.
#.........
.#........
..#......#
..##.#..#.
#.#..##.#.
##....##..
..#....#.#
.###...#..

Tile 1559:
..#...##..
...#....##
#....#..#.
##.##..#.#
..#..#.#..
#.#.#.....
..#......#
##........
.#.......#
.....##..#

Tile 2999:
#...#..##.
##....#...
#....#..#.
....#...##
#...##..##
....##..##
##.##.....
#...#..#..
#...#....#
#...#.#..#

Tile 2039:
#.##.##.#.
.#....#..#
.#.......#
.....#....
.#..##...#
..#....#.#
###..###.#
##...###..
#....#....
####....#.

Tile 2129:
##.######.
#.#..#..##
#.###.....
#.....#.##
....#..###
..#......#
......#...
..#.......
##......#.
....####.#

Tile 3407:
#..##.#..#
#.#...#...
#....#...#
#...#.#..#
#...#.....
..#...##.#
#..###...#
....#.....
..#.#.....
##....####

Tile 1093:
.##..#.###
#.....#.##
.......#..
.....#.#..
...#...##.
........##
.##.......
.#......##
..#.....##
....#####.

Tile 3623:
##..###.##
..#......#
#.#..##.#.
.....#....
.#........
.##.#..#..
#.#..#..#.
#.....#..#
...#..#..#
#.##....#.

Tile 3931:
.##..#.###
#....#....
#....##...
..##..###.
........#.
.#.......#
#......#..
.##.....##
.####.....
##.##.###.

Tile 3371:
.#...#...#
#.#....#.#
#.#...#...
.....#..#.
###.......
#........#
#.##.#..#.
#.........
#.........
.#####...#

Tile 1381:
####...#..
##........
#.......#.
#.#....#..
..#......#
..........
##........
##........
.........#
#..##..#.#

Tile 2011:
.#.#...#..
#.....##.#
#.....##..
....#..#.#
##..#...#.
.....#.#.#
#....##..#
....#.#.#.
.......#..
.#.###..##

Tile 2341:
###....#..
#........#
.#...#...#
.........#
#......#.#
......#...
##....#..#
#....#..#.
###..#...#
#.#.##..#.

Tile 3677:
.#..###.##
...#..#.#.
#..#.##.#.
.##.##..##
......#..#
#.....#..#
....#.....
#..##....#
#..#.#.###
...####.#.

Tile 1373:
####.#...#
.........#
##.......#
..........
.........#
#...#...##
#.#..##.##
....#.....
......#...
.#.####.##

Tile 2591:
..##.....#
..#.......
##.##.#.##
.#####..#.
.....#..##
#..#.....#
........##
..#..#...#
.#....##.#
#..#.####.

Tile 2707:
.#.#...#.#
......#..#
#...#.#..#
#.#....#..
#........#
#...#.....
....###..#
#.........
...#.....#
##..#..##.

Tile 2917:
...#######
.#...#....
.#........
.....#...#
..#...#.##
#.......##
#....##...
.##.#..#..
#.##......
.#..##...#

Tile 3229:
..##.###..
....#.....
......##.#
#.###.#..#
#....###.#
.........#
......#..#
....##.##.
#.#.##.#.#
#.#..##.#.

Tile 2459:
..###.##..
#.......##
...#...###
.........#
#..#....##
...##.....
##........
##..#....#
..##.....#
...##.##..

Tile 3631:
..##.#..##
.........#
..##......
....#.....
#.#.....##
#.........
###.......
#.........
#.#.#.#...
....#.##..

Tile 3733:
..#..###.#
.......###
.....##.#.
##.....#..
##.#....#.
#.##...#.#
###.#.#..#
#.#..#...#
##...#..#.
.#..#...#.

Tile 2953:
##..#.#...
........#.
..#......#
#.....#...
.........#
##.......#
#..#......
#.....#.#.
.....#.###
.###..#.##

Tile 1153:
#.##.##.##
..####....
.........#
.#..#.....
.....####.
.#.#..##.#
.......#..
#.........
....#..#..
...##.#..#

Tile 3833:
####..#...
##.......#
.........#
.#........
##..#.###.
#.#..#.#..
#.#..##...
#........#
#...#.....
......##..

Tile 1597:
#...#...##
.....##..#
#.....#..#
#.#.#....#
.###..##.#
##.......#
.......#..
...#....##
...#......
.#.##.#.#.

Tile 3793:
#......#.#
#..#..#.#.
...#......
##......##
##..#..#..
.#..#.....
..#.....#.
.#....#...
.....##...
.#..#####.

Tile 3373:
.#.#.#....
##.#......
#...#....#
.......###
#.#.#..#.#
####..####
..##......
#..#..#..#
........##
#.##..#.#.

Tile 1439:
..#####...
.#.....#.#
....#...##
..........
#....##..#
#....#...#
##........
#....##..#
.#..##.###
.####.#..#

Tile 1867:
#..##....#
......#..#
.#.##....#
#...#.....
.#.....#..
..##...#..
.#..##....
#..###.#..
.#..#.#...
#..#.###..

Tile 3343:
..###.....
..#..#..#.
#..####.#.
#.........
.........#
#.#....##.
.#..#....#
#....#...#
.........#
#.....####

Tile 2089:
....##.###
#..#.#.#..
##..#.....
#...#..#..
#......#.#
.......##.
#.......##
#....##.##
#........#
###.#.#...

Tile 1747:
...#.....#
#........#
........##
#......##.
#.........
#...##....
#...#.....
#.#.......
...#....#.
......####

Tile 2383:
.#.###...#
#.#....###
..###..#..
..##...#.#
.......##.
##.....#..
##...#...#
#.........
.......#..
##.##..#..

Tile 2843:
###......#
..##......
...#....#.
#....#....
#........#
#.#.....#.
#.#.#.#...
......#.##
##..#..#.#
#..###.##.

Tile 3593:
...###..##
###.#.#...
.......#..
##....#.##
#.......#.
##..#....#
#....#....
...#......
.#.#.....#
.#.##..#..

Tile 1699:
#.#.#....#
.##.#.#...
#....#...#
#....#..##
...#....#.
.....#...#
..##.#....
.......#..
##...##..#
#.##.#....

Tile 1579:
##.....###
#..#....#.
#..#.#..#.
#.......##
#.#....#..
..........
........##
.#...#...#
#...#.#..#
####.###..

Tile 1789:
.#.#...#..
..........
##.......#
....##....
#.#.#.....
#........#
##.#....##
#...#.#...
....#..#.#
..#######.

Tile 1091:
#.###.##..
#.##.#..#.
...#....#.
#....#....
....##....
##.......#
##....#...
#......#.#
##.......#
#...####..

Tile 3607:
#.#.#.##..
#......#.#
........##
.#.....#..
.......#..
#.#..#..##
.#..#.#..#
...#.#.#..
##..#...##
##.....#..

Tile 1367:
#...##.##.
..........
......#.#.
.#.#..#...
..#...#.#.
#.#......#
.....#....
...#......
........##
.#.#.####.

Tile 1607:
.##.#..#.#
#.........
.......###
##....#..#
##.....##.
#.#.#.....
#.........
##...#....
#.........
##..##.#.#

Tile 3739:
...#.##...
#........#
..#..#.#.#
#......#..
....#.....
##......##
##....#.##
#........#
..........
##.####..#

Tile 3989:
#.##..##..
.....#..##
#.........
.#.##..#.#
..##.##...
........#.
#.........
.##.....##
#.###..#.#
###...###.

Tile 1723:
..#.#..###
.....##.#.
.##..##...
#..#.##...
..#....##.
...#.#...#
.....#..#.
..#..#..#.
..#..#..##
#.###..##.

Tile 2029:
##...##...
.......#.#
....##.###
#..#......
##...#...#
#...#....#
.#.......#
#..#..#.##
....##...#
#####.##.#

Tile 3637:
.####...#.
.#.#..#..#
#..#..#.##
.....##.#.
...#.#...#
#..#....##
.....##.##
...#...#..
##....#..#
#.....#.#.

Tile 3701:
.#.#.#....
#.###....#
..#..#.###
#.....#.#.
........#.
#.....#...
#...##.###
####..#...
#.....#.#.
#..#....#.

Tile 1087:
.#..##...#
#...##....
...#......
....#.....
#.##....##
#....#....
#.##.....#
.#..###.##
#..#.....#
.#.#..#.##

Tile 2617:
#.#..#...#
..###.##.#
##....####
.........#
.#....#...
......#.##
.......##.
#...#....#
#.......##
#.#.#.#...

Tile 3581:
...###.###
#....##...
......##.#
......##..
##....#..#
.###....#.
.#.#..#...
#..#..#..#
.....#...#
.###.#.#.#

Tile 3697:
..####.###
.#.##.....
.#....#..#
..........
.###......
#..#..#.##
#.#..#..##
#..##...#.
..#......#
###..#.#..

Tile 2399:
##.###.###
#.........
#..#.##..#
##.#....##
#...#....#
..##..#...
..#..#..##
..##.#.#.#
...##...#.
..#....###

Tile 2767:
###..#####
.......#..
#........#
....#..###
.#####..#.
#.#....#..
....###...
#........#
##........
.....###..

Tile 3463:
....#.####
#.#......#
..##.#....
#.#......#
#.##....##
#...#..#.#
#...#.####
##..#....#
#.#.....##
###...##..

Tile 3163:
.##..#.##.
.........#
#.....#...
..#......#
#..#.....#
...#......
..#......#
.#...#.#..
.##..###..
.#.###..#.

Tile 3709:
##...##.##
#...#..#..
#..##.#.##
#..##....#
#.#..##..#
#........#
#..#......
##.###.##.
##.###...#
..##.##.##

Tile 1571:
#.##.#.##.
##..#..#.#
..........
#.#.....#.
#.....##..
..#.#..#.#
###.....##
.......###
...#......
#.#.#...#.

Tile 1201:
#...###...
#........#
#.#......#
#..#...#.#
#.....#..#
##..#....#
#........#
......#...
....#..#..
.##...##..

Tile 3121:
..#.#.#..#
.#..#.##.#
..###...#.
...##.....
.....#....
.#.....##.
..#.......
#.....#...
#.........
#..#....#.

Tile 1049:
##...#.#.#
#...#.....
.#...#...#
..#...#..#
......##.#
......####
#..#.....#
#.#.......
#.#..#..#.
##..#.##.#

Tile 1997:
##.#.#.##.
.......#.#
....#.#..#
..###.....
#.#####.#.
.##...##.#
#.#...#..#
#.#.......
####......
.#..##..##

Tile 3329:
.#.##.....
...#.#..#.
...#..##..
#.#....#.#
...#####..
#......#..
#.#..#..#.
...###..#.
#..##..#..
.###.##.#.

Tile 1433:
..#...##..
....#..#..
.#...#....
..#.##....
....##..#.
#...#....#
#.#...#...
.##.#...##
#..#.#.#..
##.##.##..

Tile 1103:
#########.
###.#....#
..#.##..##
##.#..##..
.....#....
#...#..#.#
#....#....
###.#....#
.#..##.#.#
#.#.##.#..

Tile 3359:
..#.##.#.#
#.........
#...#....#
##..##.##.
.#......#.
##..#..#..
#........#
.######...
#...##...#
.....#...#

Tile 2143:
..#.#####.
#.#.#....#
....#.#...
#....#....
..#......#
.....#....
##..##...#
.#.####.#.
..#.#....#
....#..#.#

Tile 2003:
#.#..#.#..
......##.#
#.....#.#.
##...#.#..
#.........
##..#....#
.#####.#.#
......#...
...#..#...
.###.#####

Tile 3461:
#...#...#.
.#.#.#.#..
.#.......#
....##.#.#
#...#.#..#
..........
..#.#..#..
.#.#....##
.........#
####..#.#.

Tile 3067:
....###.#.
.#.....#.#
.....#..##
#.#.....##
.##......#
#.#.......
.##......#
.....#....
....#.....
.#.....#..

Tile 2027:
.##.#....#
#....#.#..
.......##.
.......##.
.........#
..#.....##
..#......#
.#.....#..
.....#....
..#.#.#...

Tile 1951:
#.#.#..#.#
##...#.#..
.........#
#.####...#
#.....#..#
#..##....#
#...##...#
###......#
...#......
##....###.

Tile 1129:
#..###.#.#
#...#.....
#..#..#...
...#......
#.#.#..#..
#....#..#.
#........#
#........#
.....#....
..#.#####.

Tile 3257:
####.####.
#...#...##
....##.#..
....#..#..
......#.##
#.....#..#
......##..
......#.##
##.....#.#
.#.###..##

Tile 1223:
#.###.#.#.
#..####..#
.....#...#
##.#.##...
#.....#...
##..#..#..
...#.###..
...#..#...
##.....##.
.###.##..#

Tile 1709:
#.##......
#.#.......
......##..
......#...
#.#.......
.##....#..
.......#.#
.#.#...#..
.###...#.#
##.###.#.#

Tile 1019:
...##.##..
..#.....#.
#......##.
..#....#.#
..#......#
#........#
.##...#...
.......#.#
#..#......
...#.#.#.#
`;

export default input<RawTile[]>({
  test: convert(test),
  actual: convert(actual)
});
