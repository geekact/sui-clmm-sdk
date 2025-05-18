import { MAX_TICK_INDEX, MIN_TICK_INDEX } from '../constant';

export const getBoundaryTickIndex = (
  tickSpacing: number = 0,
): [minTickIndex: number, maxTickIndex: number] => {
  return <const>[
    MIN_TICK_INDEX - (tickSpacing > 0 ? MIN_TICK_INDEX % tickSpacing : 0),
    MAX_TICK_INDEX - (tickSpacing > 0 ? MAX_TICK_INDEX % tickSpacing : 0),
  ];
};
