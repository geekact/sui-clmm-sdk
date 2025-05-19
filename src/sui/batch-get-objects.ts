import type { MultiGetObjectsParams, SuiClient } from '@mysten/sui/client';

/**
 * ```
 * const objectsGenerator = batchGetObjects(sui, { ids });
 *
 * // Usage 1
 * const objects = await Array.fromAsync(objectsGenerator);
 * // Usage 2
 * for await (const object of objectsGenerator) {
 *   console.log(object);
 * }
 * ```
 */
export async function* batchGetObjects(sui: SuiClient, input: MultiGetObjectsParams) {
  const step = 50;
  const ids = [...new Set(input.ids)];

  for (let i = 0; i < ids.length; i += step) {
    const objects = await sui.multiGetObjects({ ...input, ids: ids.slice(i, i + step) });
    for (const item of objects) {
      yield item;
    }
  }
}
