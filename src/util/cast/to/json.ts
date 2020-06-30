import { IObject } from "../../../interface/common/IObject.ts";

import { ESort } from "../../../const/ESort.ts";

import { jsonParse } from "../../json/parse.ts";
import { jsonStringify } from "../../json/stringify.ts";
import { objectKeysSort } from "../../object/keys/sort.ts";

import { sortAsBoolean } from "../../../core/config/sortAsBoolean.ts";

/**
 * @name castToJson
 * @param {*} value
 * @param {boolean=} sort
 * @returns {*}
 */
export function castToJson(
  value: any,
  sort: boolean | ESort = ESort.Default,
): IObject {
  if (sortAsBoolean(sort)) {
    return objectKeysSort(jsonParse(jsonStringify(value)), true);
  } else {
    return jsonParse(jsonStringify(value));
  }
}
