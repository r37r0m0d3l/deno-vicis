import { IObject } from "../../interface/common/IObject.ts";
import { IPick } from "../../interface/config/IPick.ts";

import { arrayIsEmpty } from "../../util/array/is/empty.ts";

import { pickConfig } from "./pickConfig.ts";
import { pickData } from "./pickData.ts";

/**
 * @name pick
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToPick
 * @returns {Object}
 */
export function pick(data: IObject, propertiesToPick: IPick = []): IObject {
  const config = pickConfig(propertiesToPick);
  if (arrayIsEmpty(config)) {
    return data;
  }
  return pickData(config, data);
}
