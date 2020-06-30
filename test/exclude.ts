import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { exclude } from "../mod.ts";
import { Vicis } from "../mod.ts";

test({
  name: "exclude()",
  fn(): void {
    const DATA = {
      login: "guest",
      Password: "secret",
      active: true,
      __v: 5,
    };
    const CONFIG = [/(?:password)/gi, /^(?:_)(?:_)?/, "active"];
    const RESULT = { login: "guest", };
    assertEquals(exclude(DATA, CONFIG), DATA);
    assertEquals(Vicis.factory({ exclude: CONFIG }, DATA).getData(), RESULT);
  },
});
