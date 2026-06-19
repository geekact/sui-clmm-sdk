import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client';

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
export async function* batchGetDynamicFields(
  sui: ClientWithCoreApi,
  input: SuiClientTypes.ListDynamicFieldsOptions,
) {
  let hasNextPage = true;
  let cursor = input.cursor;

  do {
    const result = await sui.core.listDynamicFields({ ...input, cursor });
    for (const field of result.dynamicFields) {
      yield field;
    }
    hasNextPage = result.hasNextPage;
    cursor = result.cursor;
  } while (hasNextPage);
}
