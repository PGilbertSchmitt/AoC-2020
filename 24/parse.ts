export const parse = (line: string) => {
  const output: string[] = [];

  let rest = line.split("");
  let f: string;
  let s: string;
  while (rest.length > 0) {
    [f, ...rest] = rest;
    if (f === "e" || f === "w") {
      output.push(f);
    } else {
      [s, ...rest] = rest;
      output.push(f + s);
    }
  }

  return output;
};
