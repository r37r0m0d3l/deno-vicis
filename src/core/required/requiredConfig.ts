import { IRequired } from "../../interface/config/IRequired.ts";

import { arrayGetUnique } from "../../util/array/get/unique.ts";
import { arrayIsEmpty } from "../../util/array/is/empty.ts";
import { isString } from "../../util/is/string.ts";
import { jsonStringify } from "../../util/json/stringify.ts";

/**
 * @name requiredConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesRequired
 * @returns {Array.<string>}
 */
export function requiredConfig(propertiesRequired: IRequired = []): IRequired {
  if (!Array.isArray(propertiesRequired)) {
    throw new TypeError("'Required' should be an array");
  }
  if (arrayIsEmpty(propertiesRequired)) {
    return [];
  }
  return arrayGetUnique(propertiesRequired).map((value) => {
    if (!isString(value)) {
      throw new TypeError(
        `'Required' expect array of strings. Value: '${jsonStringify(value)}'.`,
      );
    }
    return value;
  });
}
