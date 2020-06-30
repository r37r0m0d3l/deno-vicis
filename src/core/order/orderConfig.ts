import { IOrder } from "../../interface/config/IOrder.ts";

import { arrayGetUnique } from "../../util/array/get/unique.ts";
import { arrayIsEmpty } from "../../util/array/is/empty.ts";
import { isString } from "../../util/is/string.ts";
import { jsonStringify } from "../../util/json/stringify.ts";

/**
 * @name orderConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesToStreamline
 * @returns {Array.<string>}
 */
export function orderConfig(propertiesToStreamline: IOrder): IOrder {
  if (!Array.isArray(propertiesToStreamline)) {
    throw new TypeError("'Order' should be an array");
  }
  if (arrayIsEmpty(propertiesToStreamline)) {
    return [];
  }
  return arrayGetUnique(propertiesToStreamline, false).map((value) => {
    if (!isString(value)) {
      throw new TypeError(
        `'Order' expect array of strings. Value: '${jsonStringify(value)}'.`,
      );
    }
    return value;
  });
}
