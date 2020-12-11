export type Ins = [ string, number ];

export const parseInstruction = (ins: string): Ins => {
  const [ op, val ] = ins.split(" ");
  return [ op, parseInt(val) ];
};
