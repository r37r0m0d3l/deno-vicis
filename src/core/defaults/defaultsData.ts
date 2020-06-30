import { IObject } from "../../interface/common/IObject.ts";

import { objectIsEmpty } from "../../util/object/is/empty.ts";

/**
 * @name defaultsData
 * @param {Object.<string, *>} propertyDefaultValues
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export function defaultsData(
  propertyDefaultValues: IObject,
  dataToSerialize: IObject,
): IObject {
  if (objectIsEmpty(propertyDefaultValues)) {
    return dataToSerialize;
  }
  Object.keys(propertyDefaultValues).forEach((key) => {
    if (!(key in dataToSerialize) || dataToSerialize[key] === undefined) {
      dataToSerialize[key] = propertyDefaultValues[key];
    }
  });
  return dataToSerialize;
}
