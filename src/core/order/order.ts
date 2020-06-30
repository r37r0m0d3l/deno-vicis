import { IObject } from "../../interface/common/IObject.ts";
import { IOrder } from "../../interface/config/IOrder.ts";

import { ESort } from "../../const/ESort.ts";

import { arrayIsEmpty } from "../../util/array/is/empty.ts";
import { objectKeysOrder } from "../../util/object/keys/order.ts";

import { orderConfig } from "./orderConfig.ts";
import { sortAsBoolean } from "../config/sortAsBoolean.ts";

/**
 * @name order
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToStreamline
 * @param {boolean=} sort
 * @returns {Object}
 */
export function order(
  data: IObject,
  propertiesToStreamline: IOrder = [],
  sort: boolean | ESort = ESort.Default,
): IObject {
  const config = orderConfig(propertiesToStreamline);
  if (arrayIsEmpty(config)) {
    return data;
  }
  return objectKeysOrder(data, propertiesToStreamline, sortAsBoolean(sort));
}
