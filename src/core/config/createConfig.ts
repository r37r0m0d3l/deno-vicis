import { ICast } from "../../interface/config/ICast.ts";
import { IConfigObjectFull } from "../../interface/config/IConfigObjectFull.ts";
import { IDefaults } from "../../interface/config/IDefaults.ts";
import { IRename } from "../../interface/config/IRename.ts";
import { IReplace } from "../../interface/config/IReplace.ts";
import { ITransform } from "../../interface/config/ITransform.ts";

import { ESort } from "../../const/ESort.ts";

import { objectCreateEmpty } from "../../util/object/createEmpty.ts";

export function createConfig(): IConfigObjectFull {
  return {
    cast: objectCreateEmpty() as ICast,
    defaults: objectCreateEmpty() as IDefaults,
    defined: [],
    exclude: [],
    omit: [],
    order: [],
    pick: [],
    sort: ESort.Default,
    rename: objectCreateEmpty() as IRename,
    replace: objectCreateEmpty() as IReplace,
    required: [],
    transform: objectCreateEmpty() as ITransform,
  };
}
