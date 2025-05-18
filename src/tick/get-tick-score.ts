import Decimal from 'decimal.js';
import { MAX_TICK_INDEX } from '../constant';

export const getTickScore = (tickIndex: number): Decimal => {
  return new Decimal(tickIndex).add(MAX_TICK_INDEX);
};
