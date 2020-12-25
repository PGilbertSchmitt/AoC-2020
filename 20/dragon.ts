const DRAGON = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `.split("\n");

export const dragonCoordinates = (x: number, y: number) => {
  const coors: [number, number][] = [];
  DRAGON.forEach((line, j) => {
    line.split("").forEach((ch, i) => {
      ch === "#" && coors.push([ x+i, y+j ]);
    });
  });
  return coors;
};

export const DRAGON_HEIGHT = DRAGON.length;
export const DRAGON_WIDTH = DRAGON[0].length;
