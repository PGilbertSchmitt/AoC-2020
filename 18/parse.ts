import { add, multiply } from "ramda";

enum Token {
  PLUS="+",
  MULT="*",
  LPAREN="(",
  RPAREN=")",
};

type Tokens = (Token | number)[];
type Member = number | Op;
// For now, we assume that there are no parens around entire expressions
type Op = {
  left: Member;
  right: Member;
  op: Token
}

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

const consumeOrSame = (value: number | void | Token, tokens: TokenBank): number => {
  if (value === Token.LPAREN) {
    // console.log("Popping into new level");
    return consumer(tokens);
  } else {
    return value as number;
  }
}

export const consumer = (tokens: TokenBank): number => {
  // console.log("consume");
  let t = tokens.next();
  let value = consumeOrSame(t.value, tokens);

  let i = 0;
  while (true && i < 10) {
    const op = tokens.next();
    if (op.done) {
      return value;
    }
    let opFn: typeof add | typeof multiply = add;
    switch (op.value) {
      case Token.MULT:
        // console.log("Gonna multiply");
        opFn = multiply;
        break;
      case Token.PLUS:
        // console.log("Gonna add");
        opFn = add;
        break;
      case Token.RPAREN:
        // console.log("Popping back out");
        return value;
    }
    const nt = tokens.next(); 
    let nextOperand = consumeOrSame(nt.value, tokens);
    const oldValue = value;
    value = opFn(value, nextOperand);
    // console.log(`${oldValue} ${op.value} ${nextOperand} = ${value}`);
    i++;
  }

  return -1;
};
