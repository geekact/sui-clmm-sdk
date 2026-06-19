import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client';

/**
 * ```
 * const objectsGenerator = batchGetObjects(sui, { objectIds: ids });
 *
 * // Usage 1
 * const objects = await Array.fromAsync(objectsGenerator);
 * // Usage 2
 * for await (const object of objectsGenerator) {
 *   console.log(object);
 * }
 * ```
 */
export async function* batchGetObjects(
  sui: ClientWithCoreApi,
  input: SuiClientTypes.GetObjectsOptions,
) {
  const step = 50;
  const objectIds = [...new Set(input.objectIds)];

  for (let i = 0; i < objectIds.length; i += step) {
    const { objects } = await sui.core.getObjects({
      ...input,
      objectIds: objectIds.slice(i, i + step),
    });
    for (const item of objects) {
      yield item;
    }
  }
}
