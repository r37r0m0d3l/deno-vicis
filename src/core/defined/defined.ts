import { IDefined } from "../../interface/config/IDefined.ts";
import { IObject } from "../../interface/common/IObject.ts";

import { arrayIsEmpty } from "../../util/array/is/empty.ts";
import { definedData } from "./definedData.ts";

/**
 * @name defined
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesMustBeDefined
 * @returns {Object}
 */
export function defined(
  data: IObject,
  propertiesMustBeDefined: IDefined = [],
): IObject {
  if (arrayIsEmpty(propertiesMustBeDefined)) {
    return data;
  }
  return definedData(propertiesMustBeDefined, data);
}
