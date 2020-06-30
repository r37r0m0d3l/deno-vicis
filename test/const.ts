import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { CAST_TYPE } from "../mod.ts";
import { Vicis } from "../mod.ts";

import { ECastType } from "../src/const/ECastType.ts";

const { test } = Deno;

test({
  name: "Constants",
  fn(): void {
    assertEquals(CAST_TYPE.BOOLEAN, Vicis.BOOLEAN);
    assertEquals(CAST_TYPE.FLAG, Vicis.FLAG);
    assertEquals(CAST_TYPE.INTEGER, Vicis.INTEGER);
    assertEquals(CAST_TYPE.JSON, Vicis.JSON);
    assertEquals(CAST_TYPE.NUMERIC, Vicis.NUMERIC);
    assertEquals(CAST_TYPE.STRING, Vicis.STRING);
    //
    assertEquals(CAST_TYPE.BOOLEAN, ECastType.BOOLEAN);
    assertEquals(CAST_TYPE.FLAG, ECastType.FLAG);
    assertEquals(CAST_TYPE.INTEGER, ECastType.INTEGER);
    assertEquals(CAST_TYPE.JSON, ECastType.JSON);
    assertEquals(CAST_TYPE.NUMERIC, ECastType.NUMERIC);
    assertEquals(CAST_TYPE.STRING, ECastType.STRING);
  },
});
