import { IReplace } from "../../interface/config/IReplace.ts";

import { checkIsObjectLike } from "../../util/check/isObjectLike.ts";

/**
 * @name replaceConfig
 * @throws TypeError
 * @param {Object.<string, *>} replacePropertyValues
 * @returns {Object}
 */
export function replaceConfig(replacePropertyValues: IReplace): IReplace {
  if (!checkIsObjectLike(replacePropertyValues)) {
    throw new TypeError("'Replace' should be an object");
  }
  return replacePropertyValues;
}
