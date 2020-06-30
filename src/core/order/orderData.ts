import { IObject } from "../../interface/common/IObject.ts";
import { IOrder } from "../../interface/config/IOrder.ts";

import { ESort } from "../../const/ESort.ts";

import { sortAsBoolean } from "../config/sortAsBoolean.ts";

import { arrayIsEmpty } from "../../util/array/is/empty.ts";
import { objectKeysOrder } from "../../util/object/keys/order.ts";

/**
 * @name orderData
 * @param {Array.<string>} propertiesToStreamline
 * @param {Object} data
 * @param {boolean=} sort
 * @returns {Object}
 */
export function orderData(
  propertiesToStreamline: IOrder,
  data: IObject,
  sort: ESort = ESort.Default,
): IObject {
  if (arrayIsEmpty(propertiesToStreamline)) {
    return data;
  }
  return objectKeysOrder(data, propertiesToStreamline, sortAsBoolean(sort));
}
