import { MAX_TICK_INDEX, MIN_TICK_INDEX } from '../constant';
import { getCurrentTickIndex } from './get-current-tick-index';

export const getBoundaryTickIndex = (
  tickSpacing: number = 0,
): [minTickIndex: number, maxTickIndex: number] => {
  return <const>[
    getCurrentTickIndex(MIN_TICK_INDEX, tickSpacing),
    getCurrentTickIndex(MAX_TICK_INDEX, tickSpacing),
  ];
};
