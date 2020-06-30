import { IDefaults } from "../../interface/config/IDefaults.ts";

import { checkIsObjectLike } from "../../util/check/isObjectLike.ts";

/**
 * @name defaultsConfig
 * @throws TypeError
 * @param {Object.<string, *>} propertyDefaultValues
 * @returns {Object}
 */
export function defaultsConfig(propertyDefaultValues: IDefaults): IDefaults {
  if (!checkIsObjectLike(propertyDefaultValues)) {
    throw new TypeError("'Defaults' should be an object");
  }
  return propertyDefaultValues;
}
