export const getCurrentTickIndex = (tickIndex: number, tickSpacing: number): number => {
  return tickIndex - (tickIndex % tickSpacing);
};
