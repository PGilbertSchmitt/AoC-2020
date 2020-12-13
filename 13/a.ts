import input from "./input";

const main = () => {
  const { time, busses } = input;

  let [nextTime, nextBus]: [number, number] = [99999999, 0];
  for (let bus of busses) {
    if (bus !== 0) {
      const busTime = (time % bus) === 0
        ? time
        : (Math.floor(time / bus) * bus) + bus;
      if (busTime < nextTime) {
        [nextTime, nextBus] = [busTime, bus];
      }
    }
  }

  console.log(`Next bus ${nextBus} leaves in ${nextTime - time} minutes`);
  console.log(`Answer is ${nextBus * (nextTime - time)}`);
};

main();
