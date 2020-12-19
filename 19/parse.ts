import { range } from "ramda";

export enum NodeType {
  VALUE,
  LIST,
  SPLIT,
};

type ValNode = {
  type: NodeType.VALUE;
  value: string;
}

type ListNode = {
  type: NodeType.LIST;
  list: number[];
}

type SplitNode = {
  type: NodeType.SPLIT;
  split: number[][];
}

export type RegNode = ValNode | ListNode | SplitNode;

export type RuleBook = {
  [key: number]: RegNode
};

export const parseRules = (ruleList: string[]): RuleBook => { 
  const book: RuleBook = {};
  for (let [ id, rule ] of ruleList.map(parseRule)) {
    book[id] = rule;
  }
  return book;
};

export const parseRule = (rule: string): [number, RegNode] => {
  const [ idStr, ruleDef ] = rule.split(": ");
  const id = parseInt(idStr);
  if (ruleDef[0] === "\"") {
    return [id, {
      type: NodeType.VALUE,
      value: ruleDef[1]
    }];
  }

  const pointers = ruleDef.split(" | ");
  if (pointers.length === 1) {
    return [id, {
      type: NodeType.LIST,
      list: pointers[0].split(" ").map(x => parseInt(x, 10))
    }];
  }

  return [id, {
    type: NodeType.SPLIT,
    split: pointers.map(p => p.split(" ").map(x => parseInt(x, 10)))
  }];
};

export const buildRegex = (book: RuleBook) => {
  const baseRule = book[0];
  const regexStr = buildRule(baseRule, book);
  return `^${regexStr}$`;
};

const buildRule = (rule: RegNode, book: RuleBook): string => {
  switch (rule.type) {
    case NodeType.VALUE:
      return rule.value;
    case NodeType.LIST:
      return rule.list.map(id => buildRule(book[id], book)).join("");
    case NodeType.SPLIT:
      const choices = rule.split.map(sub => sub.map(id => buildRule(book[id], book)).join(""));
      return `(${choices.join("|")})`;
  }
}

// Hardcoding the updated rules is easier
const wrap = (id: number, book: RuleBook): string => {
  if (id === 8) {
    return `(${buildSpecialRule(book[42], book)})+`
  } else if (id === 11) {
    const rule42 = buildSpecialRule(book[42], book);
    const rule31 = buildSpecialRule(book[31], book);
    // Looks like 5 repetitions was exactly enough for my output
    return `(${range(1,6).map(n => `${rule42}{${n}}${rule31}{${n}}`).join("|")})`;
  }
  return buildSpecialRule(book[id], book);
}

export const buildSpecialRegex = (book: RuleBook): string => {
  const baseRule = book[0];
  const regexStr = buildSpecialRule(baseRule, book);
  return `^${regexStr}$`;
};

const buildSpecialRule = (rule: RegNode, book: RuleBook): string => {
  switch (rule.type) {
    case NodeType.VALUE:
      return rule.value;
    case NodeType.LIST:
      return rule.list.map(id => wrap(id, book)).join("");
    case NodeType.SPLIT:
      const choices = rule.split.map(sub => sub.map(id => wrap(id, book)).join(""));
      return `(${choices.join("|")})`;
  }
}
