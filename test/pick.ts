import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { pick } from "../mod.ts";
import { Vicis } from "../mod.ts";

test({
  name: "pick()",
  fn(): void {
    const DATA = { id: 12345, login: "guest", active: true };
    const CONFIG = ["id", "login"];
    const RESULT = { id: 12345, login: "guest" };
    assertEquals(pick(DATA, CONFIG), RESULT);
    assertEquals(Vicis.factory({ pick: CONFIG }, DATA).getData(), RESULT);
  },
});
