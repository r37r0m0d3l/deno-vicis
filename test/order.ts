import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { order } from "../mod.ts";
import { Vicis } from "../mod.ts";

test({
  name: "order()",
  fn(): void {
    const DATA = { active: true, id: 1, login: "guest" };
    const CONFIG = ["id", "login"];
    const RESULT = ["id", "login", "active"];
    assertEquals(Object.keys(order(DATA, CONFIG)), RESULT);
    assertEquals(Object.keys(Vicis.factory({ order: CONFIG }, DATA).getData()), RESULT);
  },
});
