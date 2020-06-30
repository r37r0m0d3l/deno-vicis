import { ITransform } from "../../interface/config/ITransform.ts";

import { checkIsCallable } from "../../util/check/isCallable.ts";
import { checkIsObjectLike } from "../../util/check/isObjectLike.ts";
import { objectIsEmpty } from "../../util/object/is/empty.ts";

/**
 * @name transformConfig
 * @throws TypeError
 * @param {Object.<string, function>} propertyValueTransformWith
 * @returns {Object}
 */
export function transformConfig(
  propertyValueTransformWith: ITransform,
): ITransform {
  if (!checkIsObjectLike(propertyValueTransformWith)) {
    throw new TypeError("'Transform' should be an object");
  }
  if (objectIsEmpty(propertyValueTransformWith)) {
    return {};
  }
  Object.keys(propertyValueTransformWith).forEach((key) => {
    if (!checkIsCallable(propertyValueTransformWith[key])) {
      throw new TypeError(
        `'Transform' expect object values to be functions. Not a function at key: '${key}'.`,
      );
    }
  });
  return propertyValueTransformWith;
}
