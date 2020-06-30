import { IObject } from "../../interface/common/IObject.ts";
import { IRename } from "../../interface/config/IRename.ts";

import { objectIsEmpty } from "../../util/object/is/empty.ts";

import { renameConfig } from "./renameConfig.ts";
import { renameData } from "./renameData.ts";

/**
 * @name rename
 * @param {Object} data
 * @param {Object.<string, string>=} renamePropertyFromTo
 * @returns {Object}
 */
export function rename(
  data: IObject,
  renamePropertyFromTo: IRename = {},
): IObject {
  const config = renameConfig(renamePropertyFromTo);
  if (objectIsEmpty(config)) {
    return data;
  }
  return renameData(config, data);
}
