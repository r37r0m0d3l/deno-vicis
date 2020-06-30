import { IDefined } from "../../interface/config/IDefined.ts";
import { IObject } from "../../interface/common/IObject.ts";

import { arrayIsEmpty } from "../../util/array/is/empty.ts";

import { definedConfig } from "./definedConfig.ts";

/**
 * @name definedData
 * @throws TypeError
 * @param {Array.<string>} propertiesMustBeDefined
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export function definedData(
  propertiesMustBeDefined: IDefined,
  dataToSerialize: IObject,
): IObject {
  const config = definedConfig(propertiesMustBeDefined);
  if (arrayIsEmpty(config)) {
    return dataToSerialize;
  }
  config.forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' must be defined.`);
    }
    if (dataToSerialize[key] === undefined) {
      throw new Error(`Field '${key}' should have value.`);
    }
  });
  return dataToSerialize;
}
