import BN from 'bn.js';
import Decimal from 'decimal.js';
import { amountToX64 } from '../math/amount-to-x64';
import { toBN } from '../math/to-bn';

export const priceToSqrtPriceX64 = (
  price: Decimal.Value,
  decimalsA: number,
  decimalsB: number,
): BN => {
  const x64 = amountToX64(
    new Decimal(price).mul(Decimal.pow(10, decimalsB - decimalsA)).sqrt(),
    'floor',
  );
  return toBN(x64.toFixed());
};
