import { IObject } from "../../interface/common/IObject.ts";

import { objectIsEmpty } from "../../util/object/is/empty.ts";

import { defaultsConfig } from "./defaultsConfig.ts";
import { defaultsData } from "./defaultsData.ts";
import { IDefaults } from "../../interface/config/IDefaults.ts";

/**
 * @name defaults
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} propertyDefaultValues
 * @returns {Object}
 */
export function defaults(
  data: IObject,
  propertyDefaultValues: IDefaults = {},
): IObject {
  const config = defaultsConfig(propertyDefaultValues);
  if (objectIsEmpty(config)) {
    return data;
  }
  return defaultsData(propertyDefaultValues, data);
}
