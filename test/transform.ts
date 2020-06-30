import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { transform } from "../mod.ts";
import { Vicis } from "../mod.ts";

test({
  name: "transform()",
  fn(): void {
    const DATA = { date: "12345" };
    const CONFIG = { date: (value: any) => +value };
    const RESULT = { date: 12345 };
    assertEquals(transform(DATA, CONFIG), RESULT);
    assertEquals(Vicis.factory({ transform: CONFIG }, DATA).getData(), RESULT);
  },
});
