import type {
  SuiObjectResponse,
  SuiMoveObject,
  SuiObjectData,
  MoveStruct,
} from '@mysten/sui/client';
import { pickMoveObject } from './pick-move-object';

export function pickObjectFields<T = MoveStruct>(
  response: SuiObjectResponse | SuiMoveObject | SuiObjectData,
): T {
  if ('fields' in response) {
    return response.fields as T;
  }
  return pickMoveObject(response).fields as T;
}
