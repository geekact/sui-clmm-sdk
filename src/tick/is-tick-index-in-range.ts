import { getBoundaryTickIndex } from './get-boundary-tick-index';

export const isTickIndexInRange = (tickIndex: number, tickSpacing?: number) => {
  const [min, max] = getBoundaryTickIndex(tickSpacing);
  return tickIndex >= min && tickIndex <= max;
};
