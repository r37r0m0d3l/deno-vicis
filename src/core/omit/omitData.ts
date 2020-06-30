import { IObject } from "../../interface/common/IObject.ts";
import { IOmit } from "../../interface/config/IOmit.ts";

import { arrayIsEmpty } from "../../util/array/is/empty.ts";

/**
 * @name omitData
 * @param {Array.<string>} propertiesToOmit
 * @param {Object} data
 * @returns {Object}
 */
export function omitData(propertiesToOmit: IOmit, data: IObject): IObject {
  if (arrayIsEmpty(propertiesToOmit)) {
    return data;
  }
  const dataToSerialize: IObject = {};
  Object.keys(data).forEach((key) => {
    if (propertiesToOmit.includes(key)) {
      return;
    }
    dataToSerialize[key] = data[key];
  });
  return dataToSerialize;
}
