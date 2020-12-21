export const union = (a: Set<string>, b: Set<string>) => {
  const set = new Set<string>();
  for (let key of a.keys()) {
    if (b.has(key)) {
      set.add(key);
    }
  }
  return set;
}