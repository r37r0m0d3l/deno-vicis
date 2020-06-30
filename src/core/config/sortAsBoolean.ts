import { ESort } from "../../const/ESort.ts";

export function sortAsBoolean(sort: boolean | ESort = ESort.Default): boolean {
  if (typeof sort === "boolean") {
    return sort;
  }
  return ESort.Yes === sort;
}
