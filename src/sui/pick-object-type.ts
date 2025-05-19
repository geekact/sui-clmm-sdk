import type { SuiObjectResponse, SuiObjectData } from '@mysten/sui/client';
import { pickMoveObject } from './pick-move-object';

export const pickObjectType = (response: SuiObjectResponse | SuiObjectData): string => {
  const data = 'data' in response ? response.data! : (response as SuiObjectData);

  if (data.type) return data.type;
  if (data.content?.dataType === 'package') return 'package';
  return pickMoveObject(data).type;
};
