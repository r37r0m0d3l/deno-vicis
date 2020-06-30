import { jsonStringify } from "../json/stringify.ts";
import { isFunction } from "../is/function.ts";
import { isString } from "../is/string.ts";

/**
 * @name objectSerialize
 * @param {object|string} value
 * @returns {string}
 */
export function objectSerialize(value: any): string {
  let data;
  const { toJSON, toObject } = value;
  if (isFunction(toObject)) {
    data = value.toObject();
  } else if (isFunction(toJSON)) {
    data = value.toJSON();
  } else {
    data = value;
  }
  if (isString(data)) {
    return data;
  }
  return jsonStringify(data);
}
