import { checkIsPrimitive } from "../check/isPrimitive.ts";
import { cloneDeep } from "./cloneDeep.ts";

/**
 * @name clone
 * @param {*} value
 * @returns {*}
 */
export function clone<T extends any>(value: T): T {
  if (checkIsPrimitive(value)) {
    return value;
  }
  return cloneDeep(value);
}
