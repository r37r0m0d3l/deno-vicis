import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { rename } from "../mod.ts";
import { Vicis } from "../mod.ts";

test({
  name: "rename()",
  fn(): void {
    const DATA = { _id: 12345 };
    const CONFIG = { _id: "ID" };
    const RESULT = { ID: 12345 };
    assertEquals(rename(DATA, CONFIG), RESULT);
    assertEquals(Vicis.factory({ rename: CONFIG }, DATA).getData(), RESULT);
  },
});
