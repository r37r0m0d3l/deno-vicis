import { IExclude } from "../../interface/config/IExclude.ts";

import { arrayGetUnique } from "../../util/array/get/unique.ts";
import { arrayIsEmpty } from "../../util/array/is/empty.ts";
import { isRegExp } from "../../util/is/regexp.ts";
import { isString } from "../../util/is/string.ts";
import { jsonStringify } from "../../util/json/stringify.ts";

/**
 * @name excludeConfig
 * @throws TypeError
 * @param {Array.<string|RegExp>} propertiesToExclude
 * @returns {Array.<string|RegExp>}
 */
export function excludeConfig(propertiesToExclude: IExclude): IExclude {
  if (!Array.isArray(propertiesToExclude)) {
    throw new TypeError("'Exclude' should be an array");
  }
  if (arrayIsEmpty(propertiesToExclude)) {
    return [];
  }
  return arrayGetUnique(propertiesToExclude).map((value) => {
    if (!isString(value) && !isRegExp(value)) {
      throw new TypeError(
        `'Exclude' expect array of strings or regular expressions. Value: '${
          jsonStringify(value)
        }'.`,
      );
    }
    return value;
  });
}
