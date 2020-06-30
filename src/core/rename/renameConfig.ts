import { IRename } from "../../interface/config/IRename.ts";

import { arrayGetUnique } from "../../util/array/get/unique.ts";
import { checkIsObjectLike } from "../../util/check/isObjectLike.ts";
import { isString } from "../../util/is/string.ts";
import { jsonStringify } from "../../util/json/stringify.ts";
import { objectIsEmpty } from "../../util/object/is/empty.ts";

/**
 * @name renameConfig
 * @throws TypeError
 * @param {Object.<string, string>} renamePropertyFromTo
 * @returns {Object}
 */
export function renameConfig(renamePropertyFromTo: IRename): IRename {
  if (!checkIsObjectLike(renamePropertyFromTo)) {
    throw new TypeError("'Rename' should be an object");
  }
  if (objectIsEmpty(renamePropertyFromTo)) {
    return {};
  }
  Object.keys(renamePropertyFromTo).forEach((key) => {
    if (!isString(key)) {
      throw new TypeError(
        `'Rename' expect object values to be strings. Not a string at key: '${key}'.`,
      );
    }
  });
  const to = Object.values(renamePropertyFromTo);
  const toUnique = arrayGetUnique(to);
  if (to.length !== toUnique.length) {
    throw new TypeError(
      `'Rename' has similar values: '${jsonStringify(toUnique)}'.`,
    );
  }
  return renamePropertyFromTo;
}
