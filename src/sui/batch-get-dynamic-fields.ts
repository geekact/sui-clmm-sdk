import type { GetDynamicFieldsParams, SuiClient } from '@mysten/sui/client';

/**
 * ```
 * const fieldsGenerator = batchGetDynamicFields(sui, { parentId });
 *
 * // Usage 1
 * const fields = await Array.fromAsync(fieldsGenerator);
 * // Usage 2
 * for await (const field of fieldsGenerator) {
 *   console.log(field);
 * }
 * ```
 */
export async function* batchGetDynamicFields(sui: SuiClient, input: GetDynamicFieldsParams) {
  let hasNextPage = true;
  let cursor = input.cursor;

  do {
    const result = await sui.getDynamicFields({ ...input, cursor });
    for (const field of result.data) {
      yield field;
    }
    hasNextPage = result.hasNextPage;
    cursor = result.nextCursor;
  } while (hasNextPage);
}
