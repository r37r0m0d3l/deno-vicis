import { IObject } from "../../interface/common/IObject.ts";
import { IOmit } from "../../interface/config/IOmit.ts";

import { arrayIsEmpty } from "../../util/array/is/empty.ts";

import { omitConfig } from "./omitConfig.ts";

/**
 * @name omit
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToOmit
 * @returns {Object}
 */
export function omit(data: IObject, propertiesToOmit: IOmit = []): IObject {
  const config = omitConfig(propertiesToOmit);
  if (arrayIsEmpty(config)) {
    return data;
  }
  const dataToSerialize: IObject = {};
  Object.keys(data).forEach((key) => {
    if (config.includes(key)) {
      return;
    }
    dataToSerialize[key] = data[key];
  });
  return dataToSerialize;
}
