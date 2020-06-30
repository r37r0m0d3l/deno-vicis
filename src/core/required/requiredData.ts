import { IObject } from "../../interface/common/IObject.ts";
import { IRequired } from "../../interface/config/IRequired.ts";

import { arrayIsEmpty } from "../../util/array/is/empty.ts";

/**
 * @name requiredData
 * @param {Array.<string>} propertiesRequired
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export function requiredData(
  propertiesRequired: IRequired,
  dataToSerialize: IObject,
): IObject {
  if (arrayIsEmpty(propertiesRequired)) {
    return dataToSerialize;
  }
  propertiesRequired.forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' is required.`);
    }
  });
  return dataToSerialize;
}
