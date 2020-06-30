import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { Vicis } from "../mod.ts";

test({
  name: "new Vicis()",
  fn(): void {
    const DATA = { id: 12345, username: "Vicis" };
    const CONFIG = ["id", "username"];
    const serializer = Vicis.factory({ required: CONFIG }, DATA);
    assertEquals(serializer.getConfig().required, CONFIG);
    assertEquals(serializer.clear().getData(), {});
  },
});
