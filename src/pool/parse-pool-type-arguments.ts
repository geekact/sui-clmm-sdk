import { splitGenericParameters } from '@mysten/bcs';

export type PoolTypeArguments<T extends 1 | 2 | 3 | 4> = T extends 1
  ? [string]
  : T extends 2
    ? [string, string]
    : T extends 3
      ? [string, string, string]
      : T extends 4
        ? [string, string, string, string]
        : string[];

export const parsePoolTypeArguments = <Length extends 1 | 2 | 3 | 4>(
  poolType: string,
): PoolTypeArguments<Length> => {
  const start = poolType.indexOf('<');
  const end = poolType.lastIndexOf('>');
  if (start < 0 || end <= start + 1) throw new Error(`Invalid pool type: ${poolType}`);

  const typeParams = poolType.slice(start + 1, end);
  const types = splitGenericParameters(typeParams).map((type) => type.trim());
  if (!types.length || types.some((type) => !type)) {
    throw new Error(`Invalid pool type: ${poolType}`);
  }

  return types as PoolTypeArguments<Length>;
};
