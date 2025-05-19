import type { SuiObjectResponse, SuiObjectData, SuiMoveObject } from '@mysten/sui/client';

export function pickMoveObject(response: SuiObjectResponse | SuiObjectData): SuiMoveObject {
  if ('error' in response && response.error) {
    throw new Error(`Object with error: ${response.error?.code}`);
  }

  const suiObject = 'data' in response ? response.data! : (response as SuiObjectData);

  if (!suiObject.content) {
    throw new Error(`Object missing content, forget to explicit 'showContent: true'?`);
  }

  if (suiObject.content.dataType !== 'moveObject') {
    throw new Error(`Object is not move object, actual type is '${suiObject.content.dataType}'`);
  }

  return suiObject.content;
}
