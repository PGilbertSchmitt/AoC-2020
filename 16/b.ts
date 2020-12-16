import input from "./input";
import { parseRule, Rule } from "./rules";
import { any, filter, none, product, range } from "ramda";

// Will point all indices of a ticket's values to a set of indices of the rule list, where inclusion implies
// a potential rule match. We start full then remove entries
type PotentialMatches = Map<number, Set<number>>;

// Will point all rule names to the ticket index they correspond to
type KnownMatches = Map<string, number>;

type PassPair = [PotentialMatches, KnownMatches];

// Filters out the potential matches with sets containing only a single rule
// 0 => Set(1) { 1 },         <-- Contains only a single rule, must be this one
// 1 => Set(2) { 0, 1 },
// 2 => Set(3) { 0, 1, 2 }
const filterSingles = (pot: PotentialMatches, known: KnownMatches, rules: Rule[]) => {
  const ticketIdxs = Array.from(pot.keys());
  for (let ticketIdx of ticketIdxs) {
    const ruleSet = pot.get(ticketIdx)!;
    if (ruleSet.size === 1) {
      const ruleIdx = Array.from(ruleSet.values())[0];
      // Update known matches
      known.set(rules[ruleIdx].name, ticketIdx);
      pot.delete(ticketIdx);
      // Remove this rule from the other potential matches
      pot.forEach(set => set.delete(ruleIdx));
    }
  } 
};

const main = () => {
  const rules = input.rules.map(parseRule);
  // filter out bad tickets
  const validList = filter(
    none((val: number) => none(
      r => r.valid.has(val),
      rules
    )),
    input.nearbyTickets
  );


  const map: PotentialMatches = new Map();
  const size = input.rules.length;
  for (let i of range(0, size)) {
    map.set(i, new Set(range(0, size)));
  }

  for (let tIdx of range(0, size)) {
    for (let rIdx of range(0, size)) {
      if (any(
        val => !rules[rIdx].valid.has(val),
        validList.map(t => t[tIdx])
      )) {
        map.get(tIdx)!.delete(rIdx);
      }
    }
  }

  const known: KnownMatches = new Map();

  while (map.size > 0) {
    filterSingles(map, known, rules);
  }

  const departureIdxs = Array.from(known.entries()).filter(([name, _]) => name.match(/^departure/));
  const total = product(departureIdxs.map(([ _, i ]) => input.ownTicket[i]));
  console.log(`Product of departures: ${total}`);
};

main();
