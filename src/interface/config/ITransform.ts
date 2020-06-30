import { IObject } from "../common/IObject.ts";

export interface ITransform {
  [key: string]: (value: unknown, key: string, data: IObject) => unknown;
}
