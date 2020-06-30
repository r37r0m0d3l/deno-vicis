import { IObject } from "../../interface/common/IObject.ts";
import { ITransform } from "../../interface/config/ITransform.ts";

import { objectIsEmpty } from "../../util/object/is/empty.ts";

import { transformConfig } from "./transformConfig.ts";
import { transformData } from "./transformData.ts";

/**
 * @name transform
 * @param {Object} data
 * @param {Object.<string, function>=} propertyValueTransformWith
 * @returns {Object}
 */
export function transform(
  data: IObject,
  propertyValueTransformWith: ITransform = {},
): IObject {
  const config = transformConfig(propertyValueTransformWith);
  if (objectIsEmpty(config)) {
    return data;
  }
  return transformData(config, data);
}
