import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { defaults } from "../mod.ts";
import { Vicis } from "../mod.ts";

test({
  name: "defaults()",
  fn(): void {
    const DATA = { login: "guest", active: undefined };
    const CONFIG = { active: true };
    const RESULT = { login: "guest", active: true };
    assertEquals(defaults(DATA, CONFIG), RESULT);
    assertEquals(Vicis.factory({ defaults: CONFIG }, DATA).getData().active, RESULT.active);
  },
});
