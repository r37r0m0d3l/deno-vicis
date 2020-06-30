import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

import { cast } from "../mod.ts";
import { Vicis } from "../mod.ts";

test({
  name: "cast()",
  fn(): void {
    const DATA_BOOLEAN = { registered: null };
    const CONFIG_BOOLEAN = { registered: Vicis.BOOLEAN };
    const RESULT_BOOLEAN = false;
    assertEquals(cast(DATA_BOOLEAN, CONFIG_BOOLEAN).registered, RESULT_BOOLEAN);
    assertEquals(Vicis.factory({ cast: CONFIG_BOOLEAN }, DATA_BOOLEAN).getData().registered, RESULT_BOOLEAN);

    const DATA_FLAG = { check: null };
    const CONFIG_FLAG = { check: Vicis.FLAG };
    const RESULT_FLAG = false;
    assertEquals(cast(DATA_FLAG, CONFIG_FLAG).check, RESULT_FLAG);
    assertEquals(Vicis.factory({ cast: CONFIG_FLAG }, DATA_FLAG).getData().check, RESULT_FLAG);

    const DATA_INTEGER = { id: "12345" };
    const CONFIG_INTEGER = { id: Vicis.INTEGER };
    const RESULT_INTEGER = 12345;
    assertEquals(cast(DATA_INTEGER, CONFIG_INTEGER).id, RESULT_INTEGER);
    assertEquals(Vicis.factory({ cast: CONFIG_INTEGER }, DATA_INTEGER).getData().id, RESULT_INTEGER);

    const DATA_JSON = { json: [1, 2, 3] };
    const CONFIG_JSON = { json: Vicis.JSON };
    const RESULT_JSON = { json: [1, 2, 3] };
    assertEquals(cast(DATA_JSON, CONFIG_JSON).json, RESULT_JSON.json);
    assertEquals(Vicis.factory({ cast: CONFIG_JSON }, DATA_JSON).getData().json, RESULT_JSON.json);

    const DATA_NUMERIC = { cost: "15.59" };
    const CONFIG_NUMERIC = { cost: Vicis.NUMERIC };
    const RESULT_NUMERIC = 15.59;
    assertEquals(cast(DATA_NUMERIC, CONFIG_NUMERIC).cost, RESULT_NUMERIC);
    assertEquals(Vicis.factory({ cast: CONFIG_NUMERIC }, DATA_NUMERIC).getData().cost, RESULT_NUMERIC);

    const DATA_STRING = { active: true };
    const CONFIG_STRING = { active: Vicis.STRING };
    const RESULT_STRING = "true";
    assertEquals(cast(DATA_STRING, CONFIG_STRING).active, RESULT_STRING);
    assertEquals(Vicis.factory({ cast: CONFIG_STRING }, DATA_STRING).getData().active, RESULT_STRING);
  },
});
