import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { defined } from "../mod.ts";
import { Vicis } from "../mod.ts";

test({
  name: "defined()",
  fn(): void {
    const DATA = { id: 12345 };
    const CONFIG = ["id"];
    assertEquals(defined(DATA, CONFIG), DATA);
    assertEquals(Vicis.factory({ defined: CONFIG }, DATA).getData(), DATA);
  },
});
