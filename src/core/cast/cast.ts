import { ICast } from "../../interface/config/ICast.ts";
import { IObject } from "../../interface/common/IObject.ts";

import { objectIsEmpty } from "../../util/object/is/empty.ts";

import { castConfig } from "./castConfig.ts";
import { castData } from "./castData.ts";

/**
 * @name cast
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, string>=} propertyToType
 * @returns {Object}
 */
export function cast(data: IObject, propertyToType: ICast): IObject {
  const config = castConfig(propertyToType);
  if (objectIsEmpty(config)) {
    return data;
  }
  return castData(config, data);
}
