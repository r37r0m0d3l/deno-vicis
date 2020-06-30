import { IObject } from "../../../interface/common/IObject.ts";

import { objectDeserialize } from "../deserialize.ts";
import { objectSerialize } from "../serialize.ts";

/**
 * @name objectToPlain
 * @param {object} value
 * @returns {object}
 */
export function objectToPlain(value: IObject): IObject {
  return objectDeserialize(objectSerialize(value));
}
