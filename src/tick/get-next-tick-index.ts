import { getTickIndexWithSpacing } from './get-tick-index-with-spacing';

export const getNextTickIndex = (tickIndex: number, tickSpacing: number): number => {
  return getTickIndexWithSpacing(tickIndex, tickSpacing) + tickSpacing;
};
