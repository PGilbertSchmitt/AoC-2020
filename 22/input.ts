import input from "../util/input";

const test = {
  deckA: [
    9,
    2,
    6,
    3,
    1
  ],
  deckB: [
    5,
    8,
    4,
    7,
    10
  ]
};

const actual = {
  deckA: [
    38,
    39,
    42,
    17,
    13,
    37,
    4,
      10,
    2,
      34,
    43,
    41,
    22,
    24,
    46,
    19,
    30,
    50,
    6,
      44,
    28,
    27,
    36,
    5,
    45
  ],
  deckB: [
    31,
    40,
    25,
    11,
    3,
      48,
    16,
    9,
      33,
    7,
      12,
    35,
    49,
    32,
    26,
    47,
    14,
    8,
      20,
    23,
    1,
      29,
    15,
    21,
    18
  ]
};

interface Input {
  deckA: number[];
  deckB: number[];
}

export default input<Input>({ test, actual });