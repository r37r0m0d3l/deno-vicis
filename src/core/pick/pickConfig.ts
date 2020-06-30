import { IPick } from "../../interface/config/IPick.ts";

import { arrayGetUnique } from "../../util/array/get/unique.ts";
import { arrayIsEmpty } from "../../util/array/is/empty.ts";
import { isString } from "../../util/is/string.ts";
import { jsonStringify } from "../../util/json/stringify.ts";

/**
 * @name pickConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesToPick
 * @returns {Array.<string>}
 */
export function pickConfig(propertiesToPick: IPick): IPick {
  if (!Array.isArray(propertiesToPick)) {
    throw new TypeError("'Pick' should be an array");
  }
  if (arrayIsEmpty(propertiesToPick)) {
    return [];
  }
  return arrayGetUnique(propertiesToPick).map((value) => {
    if (!isString(value)) {
      throw new TypeError(
        `'Pick' expect array of strings. Value: '${jsonStringify(value)}'.`,
      );
    }
    return value;
  });
}
