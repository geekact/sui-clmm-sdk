import { MAX_TICK_INDEX, MIN_TICK_INDEX } from '../constant';
import { getTickIndexWithSpacing } from './get-tick-index-with-spacing';

export const getBoundaryTickIndex = (
  tickSpacing: number,
): [minTickIndex: number, maxTickIndex: number] => {
  return <const>[
    getTickIndexWithSpacing(MIN_TICK_INDEX, tickSpacing),
    getTickIndexWithSpacing(MAX_TICK_INDEX, tickSpacing),
  ];
};
