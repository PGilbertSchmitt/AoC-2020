const getInputString = () => {
  return process.argv[2];
};

type Modes<T> = {
  [key: string]: T
};

export default <T>(modes: Modes<T>) => {
  const mode = getInputString();
  const input = modes[mode];
  if (input !== undefined) {
    return input;
  }

  console.error(`Unknown mode '${mode}', returning test`);
  return modes["test"];
};
