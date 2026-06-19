import type { SuiClientTypes } from '@mysten/sui/client';

export function pickMoveObject(object: SuiClientTypes.Object<{ json: true }>): {
  type: string;
  fields: Record<string, unknown>;
} {
  if (!object.json) {
    throw new Error(`Object missing content, forget to set include: { json: true }?`);
  }

  const json = object.json;
  if (
    typeof json === 'object' &&
    json !== null &&
    'fields' in json &&
    typeof json['fields'] === 'object' &&
    json['fields'] !== null
  ) {
    return {
      type: typeof json['type'] === 'string' ? json['type'] : object.type,
      fields: json['fields'] as Record<string, unknown>,
    };
  }

  return {
    type: object.type,
    fields: json as Record<string, unknown>,
  };
}
