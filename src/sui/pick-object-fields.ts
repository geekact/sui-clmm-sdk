import type { SuiClientTypes } from '@mysten/sui/client';
import { pickMoveObject } from './pick-move-object';

export function pickObjectFields<T = Record<string, unknown>>(
  response:
    | SuiClientTypes.Object<{ json: true }>
    | { type: string; fields: Record<string, unknown> }
    | { fields: T },
): T {
  if ('fields' in response && !('objectId' in response)) {
    return response.fields as T;
  }
  return pickMoveObject(response as SuiClientTypes.Object<{ json: true }>).fields as T;
}
