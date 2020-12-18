import { product, sum } from "ramda";

enum TType {
  PLUS="+",
  MULT="*",
  LPAREN="(",
  RPAREN=")",
};
type Token = TType | number;
type Tokens = Token[];

// enum NType {
//   SUM,
//   PROD
// };

// type SumNode = {
//   type: NType.SUM,
//   values: (number | MathNode)[]
// };

// type ProdNode = {
//   type: NType.PROD,
//   values: (number | MathNode)[];
// };

// type MathNode = SumNode | ProdNode;

function* makeTokenizer(tokens: Tokens) {
  let [n, ...rest] = tokens;
  while (n) {
    // console.log(`Yielding ${n}, leaving ${rest}`);
    yield n;
    [n, ...rest] = rest;
  }
}

type TokenBank = ReturnType<typeof makeTokenizer>;

// The kind people at Advent of Code made it so only single-digit numbers
// appear in the input
export const tokenizer = (line: string) => {
  const tokens: Tokens = [];
  const chars = line.split("");
  for (let char of chars) {
    if (char !== " ") {
      switch (char) {
        case "+":
        case "*":
        case "(":
        case ")":
          tokens.push(char as Token);
          break;
        default:
          tokens.push(parseInt(char));
      }
    }
  }

  return makeTokenizer(tokens);
};

type TokenString = (Token | TokenString)[];
const splitOnParens = (tokens: TokenBank): TokenString => {
  let t = tokens.next();
  const levels: TokenString = [];

  while (!t.done) {
    switch (t.value) {
      case TType.LPAREN:
        levels.push(splitOnParens(tokens));
        break;
      case TType.RPAREN:
        return levels;
      default:
        levels.push(t.value);
    }

    t = tokens.next();
  }

  return levels;
};

const splitOnMult = (ts: TokenString): TokenString => {
  const parts: TokenString = [];
  let part: TokenString = [];

  for (let t of ts) {
    if (t === TType.MULT) {
      parts.push(part);
      parts.push(TType.MULT);
      part = [];
    } else if (typeof t === "number" || t === TType.PLUS) {
      part.push(t);
    } else {
      part.push(splitOnMult(t as TokenString));
    }
  }
  parts.push(part);
  
  return parts;
};

export const evaluate = (line: string): number => {
  const tokenBank: TokenBank = tokenizer(line);
  const tokenString = splitOnMult(splitOnParens(tokenBank));
  return calculate(tokenString);
}

const calculate = (ts: TokenString): number => {
  const first = ts[0];
  if (ts.length === 1 && typeof first === "number") {
    return first;
  }

  const op = ts[1] === TType.PLUS ? sum : product;

  return op(values(ts).map((val) => {
    return typeof val === "number" ? val : calculate(val as TokenString);
  }));
};

const values = <T>(arr: T[]): T[] => {
  const newArr: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    i % 2 === 0 && newArr.push(arr[i]);
  }

  return newArr;
}
