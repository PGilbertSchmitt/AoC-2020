import input from "./input";

const main = () => {
  const map: {[key: number]: number} = {
    1: 0,
    2: 0,
    3: 1
  }

  // get first number
  map[input[0]]++;

  for (let i = 1; i < input.length; i++) {
    map[input[i] - input[i-1]]++
  }

  console.log(map);
  console.log(map[1] * map[3]);
};

main();
