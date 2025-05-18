import { getCurrentTickIndex } from './get-current-tick-index';

export const getPrevTickIndex = (tickIndex: number, tickSpacing: number): number => {
  return getCurrentTickIndex(tickIndex, tickSpacing) - tickSpacing;
};
