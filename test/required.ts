import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { required } from "../mod.ts";
import { Vicis } from "../mod.ts";

test({
  name: "required()",
  fn(): void {
    const DATA = { id: 12345, username: "Vicis" };
    const CONFIG = ["id", "username"];
    const RESULT = { id: 12345, username: "Vicis" };
    assertEquals(required(DATA, CONFIG), RESULT);
    assertEquals(Vicis.factory({ required: CONFIG }, DATA).getData(), RESULT);
  },
});
