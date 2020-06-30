import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { replace } from "../mod.ts";
import { Vicis } from "../mod.ts";

test({
  name: "replace()",
  fn(): void {
    const DATA = { domain: "primary" };
    const CONFIG = { domain: "secondary" };
    const RESULT = { domain: "secondary" };
    assertEquals(replace(DATA, CONFIG), RESULT);
    assertEquals(Vicis.factory({ replace: CONFIG }, DATA).getData(), RESULT);
  },
});
