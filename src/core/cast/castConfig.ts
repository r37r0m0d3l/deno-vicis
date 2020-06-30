import { ICast } from "../../interface/config/ICast.ts";

import { ECastType } from "../../const/ECastType.ts";

import { checkIsObjectLike } from "../../util/check/isObjectLike.ts";
import { isString } from "../../util/is/string.ts";
import { jsonStringify } from "../../util/json/stringify.ts";
import { objectIsEmpty } from "../../util/object/is/empty.ts";

/**
 * @name castConfig
 * @throws TypeError
 * @param {Object.<string, string>} propertyToType
 * @returns {Object}
 */
export function castConfig(propertyToType: ICast): ICast {
  if (!checkIsObjectLike(propertyToType)) {
    throw new TypeError("Cast should be an object");
  }
  if (objectIsEmpty(propertyToType)) {
    return {};
  }
  Object.keys(propertyToType).forEach((key) => {
    if (!isString(propertyToType[key])) {
      throw new TypeError(
        `'Cast' expect object values to be strings. Not a string at key: '${
          jsonStringify(propertyToType[key])
        }'.`,
      );
    }
    if (!Object.values(ECastType).includes(propertyToType[key])) {
      throw new TypeError(
        `'Cast' has unknown type in {${key}: "${propertyToType[key]}"}.`,
      );
    }
  });
  return propertyToType;
}
