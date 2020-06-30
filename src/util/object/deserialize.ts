import { isString } from "../is/string.ts";
import { jsonParse } from "../json/parse.ts";

/**
 * @name objectDeserialize
 * @param {string} value
 * @returns {*}
 */
export function objectDeserialize(value: string): any {
  if (isString(value)) {
    return jsonParse(value);
  }
  return value;
}
