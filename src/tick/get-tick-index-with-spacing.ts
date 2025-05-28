export const getTickIndexWithSpacing = (tickIndex: number, tickSpacing: number): number => {
  return tickIndex - (tickSpacing > 0 ? tickIndex % tickSpacing : 0);
};
