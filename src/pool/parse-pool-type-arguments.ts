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
  let types = poolType.replace('>', '').split('<')[1]?.split(/,\s*/) || [];
  types = types.filter(Boolean);
  if (!types.length) throw new Error(`Invalid pool type: ${poolType}`);
  return types as any;
};
