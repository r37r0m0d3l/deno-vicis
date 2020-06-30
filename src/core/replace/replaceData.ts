import { IObject } from "../../interface/common/IObject.ts";
import { IReplace } from "../../interface/config/IReplace.ts";

import { objectIsEmpty } from "../../util/object/is/empty.ts";

/**
 * @name replaceData
 * @param {Object.<string, *>} replacePropertyValues
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export function replaceData(
  replacePropertyValues: IReplace,
  dataToSerialize: IObject,
): IObject {
  if (objectIsEmpty(replacePropertyValues)) {
    return dataToSerialize;
  }
  Object.keys(replacePropertyValues).forEach((key) => {
    dataToSerialize[key] = replacePropertyValues[key];
  });
  return dataToSerialize;
}
