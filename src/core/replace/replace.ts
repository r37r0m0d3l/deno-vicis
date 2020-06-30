import { IObject } from "../../interface/common/IObject.ts";
import { IReplace } from "../../interface/config/IReplace.ts";

import { objectIsEmpty } from "../../util/object/is/empty.ts";

import { replaceConfig } from "./replaceConfig.ts";
import { replaceData } from "./replaceData.ts";

/**
 * @name replace
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} replacePropertyValues
 * @returns {Object}
 */
export function replace(
  data: IObject,
  replacePropertyValues: IReplace = {},
): IObject {
  const config = replaceConfig(replacePropertyValues);
  if (objectIsEmpty(config)) {
    return data;
  }
  return replaceData(config, data);
}
