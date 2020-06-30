import { IObject } from "../../interface/common/IObject.ts";
import { IRequired } from "../../interface/config/IRequired.ts";

import { arrayIsEmpty } from "../../util/array/is/empty.ts";

import { requiredConfig } from "./requiredConfig.ts";
import { requiredData } from "./requiredData.ts";

/**
 * @name required
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesRequired
 * @returns {Object}
 */
export function required(
  data: IObject,
  propertiesRequired: IRequired = [],
): IObject {
  const config = requiredConfig(propertiesRequired);
  if (arrayIsEmpty(config)) {
    return data;
  }
  return requiredData(config, data);
}
