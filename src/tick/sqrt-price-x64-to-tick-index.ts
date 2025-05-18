import BN from 'bn.js';
import {
  BIT_PRECISION,
  LOG_B_2_X32,
  LOG_B_P_ERR_MARGIN_LOWER_X64,
  LOG_B_P_ERR_MARGIN_UPPER_X64,
  MAX_SQRT_PRICE,
  MIN_SQRT_PRICE,
} from '../constant';
import { tickIndexToSqrtPriceX64 } from './tick-index-to-sqrt-price-x64';
import { signedShiftRight } from '../math/signed-shift-right';
import { signedShiftLeft } from '../math/signed-shift-left';
import Decimal from 'decimal.js';
import { toBN } from '../math';

export const sqrtPriceX64ToTickIndex = (sqrtPriceX64: Decimal.Value | BN | bigint): number => {
  const sqrtPriceBN = toBN(sqrtPriceX64);
  if (sqrtPriceBN.gt(new BN(MAX_SQRT_PRICE)) || sqrtPriceBN.lt(new BN(MIN_SQRT_PRICE))) {
    throw new Error('Provided sqrtPrice is not within the supported sqrtPrice range.');
  }

  const msb = sqrtPriceBN.bitLength() - 1;
  const adjustedMsb = new BN(msb - 64);
  const log2pIntegerX32 = signedShiftLeft(adjustedMsb, 32, 128);

  let bit = new BN('8000000000000000', 'hex');
  let precision = 0;
  let log2pFractionX64 = new BN(0);
  let r = msb >= 64 ? sqrtPriceBN.shrn(msb - 63) : sqrtPriceBN.shln(63 - msb);

  while (bit.gt(new BN(0)) && precision < BIT_PRECISION) {
    r = r.mul(r);
    let rMoreThanTwo = r.shrn(127);
    r = r.shrn(63 + rMoreThanTwo.toNumber());
    log2pFractionX64 = log2pFractionX64.add(bit.mul(rMoreThanTwo));
    bit = bit.shrn(1);
    precision += 1;
  }

  const log2pFractionX32 = log2pFractionX64.shrn(32);
  const log2pX32 = log2pIntegerX32.add(log2pFractionX32);
  const logbpX64 = log2pX32.mul(new BN(LOG_B_2_X32));

  const tickLow = signedShiftRight(
    logbpX64.sub(new BN(LOG_B_P_ERR_MARGIN_LOWER_X64)),
    64,
    128,
  ).toNumber();
  const tickHigh = signedShiftRight(
    logbpX64.add(new BN(LOG_B_P_ERR_MARGIN_UPPER_X64)),
    64,
    128,
  ).toNumber();

  if (tickLow == tickHigh) {
    return tickLow;
  } else {
    const derivedTickHighSqrtPriceX64 = tickIndexToSqrtPriceX64(tickHigh);
    if (derivedTickHighSqrtPriceX64.lte(sqrtPriceBN)) {
      return tickHigh;
    } else {
      return tickLow;
    }
  }
};
