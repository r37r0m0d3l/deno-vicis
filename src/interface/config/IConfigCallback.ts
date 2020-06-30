import { IObject } from "../common/IObject.ts";

export interface IConfigCallback {
  (model: IObject): IObject;
}
