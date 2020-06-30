import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { omit } from "../mod.ts";
import { Vicis } from "../mod.ts";

test({
  name: "omit()",
  fn(): void {
    const DATA = { login: "guest", password: "secret" };
    const CONFIG = ["password"];
    const RESULT = { login: "guest" };
    assertEquals(omit(DATA, CONFIG), RESULT);
    assertEquals(Vicis.factory({ omit: CONFIG }, DATA).getData().login, RESULT.login);
  },
});
