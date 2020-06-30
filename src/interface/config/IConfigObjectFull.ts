import { ICast } from "./ICast.ts";
import { IDefaults } from "./IDefaults.ts";
import { IDefined } from "./IDefined.ts";
import { IExclude } from "./IExclude.ts";
import { IOmit } from "./IOmit.ts";
import { IOrder } from "./IOrder.ts";
import { IPick } from "./IPick.ts";
import { IRename } from "./IRename.ts";
import { IReplace } from "./IReplace.ts";
import { IRequired } from "./IRequired.ts";
import { ITransform } from "./ITransform.ts";

import { ESort } from "../../const/ESort.ts";

export interface IConfigObjectFull {
  cast: ICast;
  defaults: IDefaults;
  defined: IDefined;
  exclude: IExclude;
  omit: IOmit;
  order: IOrder;
  pick: IPick;
  sort: ESort;
  rename: IRename;
  replace: IReplace;
  required: IRequired;
  transform: ITransform;
}
