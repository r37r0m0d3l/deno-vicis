// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiateAsync, __instantiate;

(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };

  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }

  __instantiateAsync = async (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExpA(m);
  };

  __instantiate = (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExp(m);
  };
})();

System.register("src/const/ECastType", [], function (exports_1, context_1) {
    "use strict";
    var ECastType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (ECastType) {
                ECastType["BOOLEAN"] = "boolean";
                ECastType["FLAG"] = "flag";
                ECastType["INTEGER"] = "integer";
                ECastType["JSON"] = "json";
                ECastType["NUMERIC"] = "numeric";
                ECastType["STRING"] = "string";
            })(ECastType || (ECastType = {}));
            exports_1("ECastType", ECastType);
        }
    };
});
System.register("src/const/CAST_TYPE", ["src/const/ECastType"], function (exports_2, context_2) {
    "use strict";
    var ECastType_ts_1, CAST_TYPE;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (ECastType_ts_1_1) {
                ECastType_ts_1 = ECastType_ts_1_1;
            }
        ],
        execute: function () {
            exports_2("CAST_TYPE", CAST_TYPE = {
                BOOLEAN: ECastType_ts_1.ECastType.BOOLEAN,
                FLAG: ECastType_ts_1.ECastType.FLAG,
                INTEGER: ECastType_ts_1.ECastType.INTEGER,
                JSON: ECastType_ts_1.ECastType.JSON,
                NUMERIC: ECastType_ts_1.ECastType.NUMERIC,
                STRING: ECastType_ts_1.ECastType.STRING,
            });
        }
    };
});
System.register("src/interface/config/ICast", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/interface/common/IObject", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/object/is/empty", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    /**
     * @param {Object} object
     * @returns {boolean}
     */
    function objectIsEmpty(object) {
        return Object.keys(object).length === 0;
    }
    exports_5("objectIsEmpty", objectIsEmpty);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/check/isObjectLike", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    /**
     * @name checkIsObjectLike
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example isObjectLike({}); ➜ true
     * @example isObjectLike([1, 2, 3]); ➜ true
     * @example isObjectLike(() => {}); ➜ false
     * @example isObjectLike(null); ➜ false
     */
    function checkIsObjectLike(value) {
        return value && typeof value === "object" && !Array.isArray(value);
    }
    exports_6("checkIsObjectLike", checkIsObjectLike);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/is/string", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    /**
     * @param {*} value
     * @returns {boolean}
     */
    function isString(value) {
        return typeof value === "string";
    }
    exports_7("isString", isString);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/json/stringify", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    /**
     * @name jsonStringify
     * @param {*} value
     * @returns string
     */
    function jsonStringify(value) {
        return JSON.stringify(value);
    }
    exports_8("jsonStringify", jsonStringify);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/cast/castConfig", ["src/const/ECastType", "src/util/check/isObjectLike", "src/util/is/string", "src/util/json/stringify", "src/util/object/is/empty"], function (exports_9, context_9) {
    "use strict";
    var ECastType_ts_2, isObjectLike_ts_1, string_ts_1, stringify_ts_1, empty_ts_1;
    var __moduleName = context_9 && context_9.id;
    /**
     * @name castConfig
     * @throws TypeError
     * @param {Object.<string, string>} propertyToType
     * @returns {Object}
     */
    function castConfig(propertyToType) {
        if (!isObjectLike_ts_1.checkIsObjectLike(propertyToType)) {
            throw new TypeError("Cast should be an object");
        }
        if (empty_ts_1.objectIsEmpty(propertyToType)) {
            return {};
        }
        Object.keys(propertyToType).forEach((key) => {
            if (!string_ts_1.isString(propertyToType[key])) {
                throw new TypeError(`'Cast' expect object values to be strings. Not a string at key: '${stringify_ts_1.jsonStringify(propertyToType[key])}'.`);
            }
            if (!Object.values(ECastType_ts_2.ECastType).includes(propertyToType[key])) {
                throw new TypeError(`'Cast' has unknown type in {${key}: "${propertyToType[key]}"}.`);
            }
        });
        return propertyToType;
    }
    exports_9("castConfig", castConfig);
    return {
        setters: [
            function (ECastType_ts_2_1) {
                ECastType_ts_2 = ECastType_ts_2_1;
            },
            function (isObjectLike_ts_1_1) {
                isObjectLike_ts_1 = isObjectLike_ts_1_1;
            },
            function (string_ts_1_1) {
                string_ts_1 = string_ts_1_1;
            },
            function (stringify_ts_1_1) {
                stringify_ts_1 = stringify_ts_1_1;
            },
            function (empty_ts_1_1) {
                empty_ts_1 = empty_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/util/cast/to/string", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    /**
     * @param {*} value
     * @returns string
     */
    function castToString(value) {
        if (value === null || value === undefined) {
            return "";
        }
        if (typeof value === "string") {
            return value;
        }
        const result = value.toString();
        if (result === "0" && Object.is(value, -0)) {
            return "-0";
        }
        return result;
    }
    exports_10("castToString", castToString);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/convert/to/flag", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    /**
     * @name convertToFlag
     * @description
     * Turns: undefined, null, 0, "0", "", "false", "FALSE" to boolean false.
     * Turns: 1, 1n, "1", "true", "TRUE" to boolean true.
     * @param {*} value
     * @param {*=false} onEmpty
     * @param {*=false} onUnParsable
     * @returns {boolean}
     */
    function convertToFlag(value, onEmpty = false, onUnParsable = false) {
        if (value === undefined || value === null) {
            return onEmpty;
        }
        if (typeof value === "boolean") {
            return value;
        }
        const affirmative = value.toString().toLocaleLowerCase().trim();
        if (affirmative.length === 0) {
            return onEmpty;
        }
        if (affirmative === "true" || affirmative === "1") {
            return true;
        }
        if (affirmative === "false" || affirmative === "0") {
            return false;
        }
        return onUnParsable;
    }
    exports_11("convertToFlag", convertToFlag);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/json/parse", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    /**
     * @name jsonParse
     * @param {string} text
     * @returns *
     */
    function jsonParse(text) {
        return JSON.parse(text);
    }
    exports_12("jsonParse", jsonParse);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/object/deserialize", ["src/util/is/string", "src/util/json/parse"], function (exports_13, context_13) {
    "use strict";
    var string_ts_2, parse_ts_1;
    var __moduleName = context_13 && context_13.id;
    /**
     * @name objectDeserialize
     * @param {string} value
     * @returns {*}
     */
    function objectDeserialize(value) {
        if (string_ts_2.isString(value)) {
            return parse_ts_1.jsonParse(value);
        }
        return value;
    }
    exports_13("objectDeserialize", objectDeserialize);
    return {
        setters: [
            function (string_ts_2_1) {
                string_ts_2 = string_ts_2_1;
            },
            function (parse_ts_1_1) {
                parse_ts_1 = parse_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/util/is/function", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    /**
     * @param {*} value
     * @returns {boolean}
     */
    function isFunction(value) {
        if (Object.prototype.toString.call(value) !== "[object Function]") {
            return false;
        }
        return !/^class\s/.test(Function.prototype.toString.call(value));
    }
    exports_14("isFunction", isFunction);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/object/serialize", ["src/util/json/stringify", "src/util/is/function", "src/util/is/string"], function (exports_15, context_15) {
    "use strict";
    var stringify_ts_2, function_ts_1, string_ts_3;
    var __moduleName = context_15 && context_15.id;
    /**
     * @name objectSerialize
     * @param {object|string} value
     * @returns {string}
     */
    function objectSerialize(value) {
        let data;
        const { toJSON, toObject } = value;
        if (function_ts_1.isFunction(toObject)) {
            data = value.toObject();
        }
        else if (function_ts_1.isFunction(toJSON)) {
            data = value.toJSON();
        }
        else {
            data = value;
        }
        if (string_ts_3.isString(data)) {
            return data;
        }
        return stringify_ts_2.jsonStringify(data);
    }
    exports_15("objectSerialize", objectSerialize);
    return {
        setters: [
            function (stringify_ts_2_1) {
                stringify_ts_2 = stringify_ts_2_1;
            },
            function (function_ts_1_1) {
                function_ts_1 = function_ts_1_1;
            },
            function (string_ts_3_1) {
                string_ts_3 = string_ts_3_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/util/object/to/plain", ["src/util/object/deserialize", "src/util/object/serialize"], function (exports_16, context_16) {
    "use strict";
    var deserialize_ts_1, serialize_ts_1;
    var __moduleName = context_16 && context_16.id;
    /**
     * @name objectToPlain
     * @param {object} value
     * @returns {object}
     */
    function objectToPlain(value) {
        return deserialize_ts_1.objectDeserialize(serialize_ts_1.objectSerialize(value));
    }
    exports_16("objectToPlain", objectToPlain);
    return {
        setters: [
            function (deserialize_ts_1_1) {
                deserialize_ts_1 = deserialize_ts_1_1;
            },
            function (serialize_ts_1_1) {
                serialize_ts_1 = serialize_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/cast/castData", ["src/util/cast/to/string", "src/util/convert/to/flag", "src/util/object/is/empty", "src/util/object/to/plain", "src/const/ECastType"], function (exports_17, context_17) {
    "use strict";
    var string_ts_4, flag_ts_1, empty_ts_2, plain_ts_1, ECastType_ts_3;
    var __moduleName = context_17 && context_17.id;
    /**
     * @name castData
     * @param {Object.<string, string>} propertyToType
     * @param {Object} dataToSerialize
     * @returns {Object}
     */
    function castData(propertyToType, dataToSerialize) {
        if (empty_ts_2.objectIsEmpty(propertyToType)) {
            return dataToSerialize;
        }
        Object.keys(propertyToType).forEach((key) => {
            const castTo = propertyToType[key];
            if (!(key in dataToSerialize)) {
                throw new Error(`Field '${key}' suppose to be converted to ${castTo}.`);
            }
            switch (castTo) {
                case ECastType_ts_3.ECastType.BOOLEAN:
                    dataToSerialize[key] = Boolean(dataToSerialize[key]);
                    break;
                case ECastType_ts_3.ECastType.FLAG:
                    dataToSerialize[key] = flag_ts_1.convertToFlag(dataToSerialize[key]);
                    break;
                case ECastType_ts_3.ECastType.NUMERIC: {
                    const castedNumber = Number(dataToSerialize[key]);
                    if (Number.isFinite(castedNumber)) {
                        dataToSerialize[key] = castedNumber;
                    }
                    else {
                        const parsed = Number.parseFloat(string_ts_4.castToString(dataToSerialize[key]).trim());
                        if (Number.isFinite(parsed)) {
                            dataToSerialize[key] = parsed;
                        }
                        else {
                            dataToSerialize[key] = 0;
                        }
                    }
                    break;
                }
                case ECastType_ts_3.ECastType.INTEGER: {
                    const castedInteger = Number(dataToSerialize[key]);
                    if (Number.isFinite(castedInteger)) {
                        dataToSerialize[key] = Math.trunc(castedInteger);
                    }
                    else {
                        const parsed = Number.parseFloat(string_ts_4.castToString(dataToSerialize[key]).trim());
                        if (Number.isFinite(parsed)) {
                            dataToSerialize[key] = Math.trunc(castedInteger);
                        }
                        else {
                            dataToSerialize[key] = 0;
                        }
                    }
                    break;
                }
                case ECastType_ts_3.ECastType.STRING:
                    dataToSerialize[key] = string_ts_4.castToString(dataToSerialize[key]);
                    break;
                case ECastType_ts_3.ECastType.JSON:
                    dataToSerialize[key] = plain_ts_1.objectToPlain(dataToSerialize[key]);
                    break;
                default:
                    throw new Error("Unknown value convert error");
            }
        });
        return dataToSerialize;
    }
    exports_17("castData", castData);
    return {
        setters: [
            function (string_ts_4_1) {
                string_ts_4 = string_ts_4_1;
            },
            function (flag_ts_1_1) {
                flag_ts_1 = flag_ts_1_1;
            },
            function (empty_ts_2_1) {
                empty_ts_2 = empty_ts_2_1;
            },
            function (plain_ts_1_1) {
                plain_ts_1 = plain_ts_1_1;
            },
            function (ECastType_ts_3_1) {
                ECastType_ts_3 = ECastType_ts_3_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/cast/cast", ["src/util/object/is/empty", "src/core/cast/castConfig", "src/core/cast/castData"], function (exports_18, context_18) {
    "use strict";
    var empty_ts_3, castConfig_ts_1, castData_ts_1;
    var __moduleName = context_18 && context_18.id;
    /**
     * @name cast
     * @throws TypeError
     * @param {Object} data
     * @param {Object.<string, string>=} propertyToType
     * @returns {Object}
     */
    function cast(data, propertyToType) {
        const config = castConfig_ts_1.castConfig(propertyToType);
        if (empty_ts_3.objectIsEmpty(config)) {
            return data;
        }
        return castData_ts_1.castData(config, data);
    }
    exports_18("cast", cast);
    return {
        setters: [
            function (empty_ts_3_1) {
                empty_ts_3 = empty_ts_3_1;
            },
            function (castConfig_ts_1_1) {
                castConfig_ts_1 = castConfig_ts_1_1;
            },
            function (castData_ts_1_1) {
                castData_ts_1 = castData_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IDefaults", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/defaults/defaultsConfig", ["src/util/check/isObjectLike"], function (exports_20, context_20) {
    "use strict";
    var isObjectLike_ts_2;
    var __moduleName = context_20 && context_20.id;
    /**
     * @name defaultsConfig
     * @throws TypeError
     * @param {Object.<string, *>} propertyDefaultValues
     * @returns {Object}
     */
    function defaultsConfig(propertyDefaultValues) {
        if (!isObjectLike_ts_2.checkIsObjectLike(propertyDefaultValues)) {
            throw new TypeError("'Defaults' should be an object");
        }
        return propertyDefaultValues;
    }
    exports_20("defaultsConfig", defaultsConfig);
    return {
        setters: [
            function (isObjectLike_ts_2_1) {
                isObjectLike_ts_2 = isObjectLike_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/defaults/defaultsData", ["src/util/object/is/empty"], function (exports_21, context_21) {
    "use strict";
    var empty_ts_4;
    var __moduleName = context_21 && context_21.id;
    /**
     * @name defaultsData
     * @param {Object.<string, *>} propertyDefaultValues
     * @param {Object} dataToSerialize
     * @returns {Object}
     */
    function defaultsData(propertyDefaultValues, dataToSerialize) {
        if (empty_ts_4.objectIsEmpty(propertyDefaultValues)) {
            return dataToSerialize;
        }
        Object.keys(propertyDefaultValues).forEach((key) => {
            if (!(key in dataToSerialize) || dataToSerialize[key] === undefined) {
                dataToSerialize[key] = propertyDefaultValues[key];
            }
        });
        return dataToSerialize;
    }
    exports_21("defaultsData", defaultsData);
    return {
        setters: [
            function (empty_ts_4_1) {
                empty_ts_4 = empty_ts_4_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/defaults/defaults", ["src/util/object/is/empty", "src/core/defaults/defaultsConfig", "src/core/defaults/defaultsData"], function (exports_22, context_22) {
    "use strict";
    var empty_ts_5, defaultsConfig_ts_1, defaultsData_ts_1;
    var __moduleName = context_22 && context_22.id;
    /**
     * @name defaults
     * @throws TypeError
     * @param {Object} data
     * @param {Object.<string, *>=} propertyDefaultValues
     * @returns {Object}
     */
    function defaults(data, propertyDefaultValues = {}) {
        const config = defaultsConfig_ts_1.defaultsConfig(propertyDefaultValues);
        if (empty_ts_5.objectIsEmpty(config)) {
            return data;
        }
        return defaultsData_ts_1.defaultsData(propertyDefaultValues, data);
    }
    exports_22("defaults", defaults);
    return {
        setters: [
            function (empty_ts_5_1) {
                empty_ts_5 = empty_ts_5_1;
            },
            function (defaultsConfig_ts_1_1) {
                defaultsConfig_ts_1 = defaultsConfig_ts_1_1;
            },
            function (defaultsData_ts_1_1) {
                defaultsData_ts_1 = defaultsData_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IDefined", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/array/is/empty", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    /**
     * @name arrayIsEmpty
     * @param {Array} array
     * @returns {boolean}
     */
    function arrayIsEmpty(array) {
        return array.length === 0;
    }
    exports_24("arrayIsEmpty", arrayIsEmpty);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/array/get/unique", [], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    /**
     * @name arrayGetUnique
     * @param {Array} array
     * @param {boolean=} sort
     * @returns {Array}
     * @example
     * arrayGetUnique([NaN, NaN, 0, -0, +0, "\u0065\u0301", "\u00e9"]) -> [ NaN, 0, 'é', -0 ]
     */
    function arrayGetUnique(array, sort = true) {
        if (array.length < 2) {
            return array;
        }
        let unique = [...new Set(array)];
        if (unique.includes(0)) {
            const zeroes = array.filter((value) => value === 0);
            if (zeroes.length > 1 &&
                zeroes.some((value) => 1 / value === Number.NEGATIVE_INFINITY)) {
                unique.push(-0);
            }
        }
        if (unique.filter((value) => typeof value === "string").length) {
            const strings = array.filter((value) => typeof value === "string");
            if (strings.length > 1) {
                const normalized = [
                    ...new Set(strings.map((value) => value.normalize())),
                ];
                normalized.forEach((value) => {
                    delete unique[unique.indexOf(value)];
                });
                const compacted = [];
                for (let index = 0; index < unique.length; index++) {
                    if (index in unique) {
                        compacted.push(unique[index]);
                    }
                }
                unique = compacted.concat(normalized);
            }
        }
        if (sort) {
            return unique.sort();
        }
        return unique;
    }
    exports_25("arrayGetUnique", arrayGetUnique);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/defined/definedConfig", ["src/util/array/get/unique", "src/util/array/is/empty", "src/util/is/string", "src/util/json/stringify"], function (exports_26, context_26) {
    "use strict";
    var unique_ts_1, empty_ts_6, string_ts_5, stringify_ts_3;
    var __moduleName = context_26 && context_26.id;
    /**
     * @name definedConfig
     * @throws TypeError
     * @param {Array.<string>} propertiesMustBeDefined
     * @returns {Array.<string>}
     */
    function definedConfig(propertiesMustBeDefined) {
        if (!Array.isArray(propertiesMustBeDefined)) {
            throw new TypeError("'Defined' should be an array");
        }
        if (empty_ts_6.arrayIsEmpty(propertiesMustBeDefined)) {
            return [];
        }
        return unique_ts_1.arrayGetUnique(propertiesMustBeDefined).map((value) => {
            if (!string_ts_5.isString(value)) {
                throw new TypeError(`'Defined' expect array of strings. Value: '${stringify_ts_3.jsonStringify(value)}'.`);
            }
            return value;
        });
    }
    exports_26("definedConfig", definedConfig);
    return {
        setters: [
            function (unique_ts_1_1) {
                unique_ts_1 = unique_ts_1_1;
            },
            function (empty_ts_6_1) {
                empty_ts_6 = empty_ts_6_1;
            },
            function (string_ts_5_1) {
                string_ts_5 = string_ts_5_1;
            },
            function (stringify_ts_3_1) {
                stringify_ts_3 = stringify_ts_3_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/defined/definedData", ["src/util/array/is/empty", "src/core/defined/definedConfig"], function (exports_27, context_27) {
    "use strict";
    var empty_ts_7, definedConfig_ts_1;
    var __moduleName = context_27 && context_27.id;
    /**
     * @name definedData
     * @throws TypeError
     * @param {Array.<string>} propertiesMustBeDefined
     * @param {Object} dataToSerialize
     * @returns {Object}
     */
    function definedData(propertiesMustBeDefined, dataToSerialize) {
        const config = definedConfig_ts_1.definedConfig(propertiesMustBeDefined);
        if (empty_ts_7.arrayIsEmpty(config)) {
            return dataToSerialize;
        }
        config.forEach((key) => {
            if (!(key in dataToSerialize)) {
                throw new Error(`Field '${key}' must be defined.`);
            }
            if (dataToSerialize[key] === undefined) {
                throw new Error(`Field '${key}' should have value.`);
            }
        });
        return dataToSerialize;
    }
    exports_27("definedData", definedData);
    return {
        setters: [
            function (empty_ts_7_1) {
                empty_ts_7 = empty_ts_7_1;
            },
            function (definedConfig_ts_1_1) {
                definedConfig_ts_1 = definedConfig_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/defined/defined", ["src/util/array/is/empty", "src/core/defined/definedData"], function (exports_28, context_28) {
    "use strict";
    var empty_ts_8, definedData_ts_1;
    var __moduleName = context_28 && context_28.id;
    /**
     * @name defined
     * @throws TypeError
     * @param {Object} data
     * @param {Array.<string>=} propertiesMustBeDefined
     * @returns {Object}
     */
    function defined(data, propertiesMustBeDefined = []) {
        if (empty_ts_8.arrayIsEmpty(propertiesMustBeDefined)) {
            return data;
        }
        return definedData_ts_1.definedData(propertiesMustBeDefined, data);
    }
    exports_28("defined", defined);
    return {
        setters: [
            function (empty_ts_8_1) {
                empty_ts_8 = empty_ts_8_1;
            },
            function (definedData_ts_1_1) {
                definedData_ts_1 = definedData_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IExclude", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/is/regexp", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    /**
     * @param {*} value
     * @returns {boolean}
     */
    function isRegExp(value) {
        return value instanceof RegExp;
    }
    exports_30("isRegExp", isRegExp);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/object/get/keys", [], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    /**
     * @name objectGetKeys
     * @param {Object} object
     * @returns {Array.<string>}
     */
    function objectGetKeys(object) {
        return Object.keys(object).sort((alpha, beta) => alpha.localeCompare(beta));
    }
    exports_31("objectGetKeys", objectGetKeys);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/exclude/excludeConfig", ["src/util/array/get/unique", "src/util/array/is/empty", "src/util/is/regexp", "src/util/is/string", "src/util/json/stringify"], function (exports_32, context_32) {
    "use strict";
    var unique_ts_2, empty_ts_9, regexp_ts_1, string_ts_6, stringify_ts_4;
    var __moduleName = context_32 && context_32.id;
    /**
     * @name excludeConfig
     * @throws TypeError
     * @param {Array.<string|RegExp>} propertiesToExclude
     * @returns {Array.<string|RegExp>}
     */
    function excludeConfig(propertiesToExclude) {
        if (!Array.isArray(propertiesToExclude)) {
            throw new TypeError("'Exclude' should be an array");
        }
        if (empty_ts_9.arrayIsEmpty(propertiesToExclude)) {
            return [];
        }
        return unique_ts_2.arrayGetUnique(propertiesToExclude).map((value) => {
            if (!string_ts_6.isString(value) && !regexp_ts_1.isRegExp(value)) {
                throw new TypeError(`'Exclude' expect array of strings or regular expressions. Value: '${stringify_ts_4.jsonStringify(value)}'.`);
            }
            return value;
        });
    }
    exports_32("excludeConfig", excludeConfig);
    return {
        setters: [
            function (unique_ts_2_1) {
                unique_ts_2 = unique_ts_2_1;
            },
            function (empty_ts_9_1) {
                empty_ts_9 = empty_ts_9_1;
            },
            function (regexp_ts_1_1) {
                regexp_ts_1 = regexp_ts_1_1;
            },
            function (string_ts_6_1) {
                string_ts_6 = string_ts_6_1;
            },
            function (stringify_ts_4_1) {
                stringify_ts_4 = stringify_ts_4_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/exclude/exclude", ["src/util/array/is/empty", "src/util/is/regexp", "src/util/is/string", "src/util/object/get/keys", "src/core/exclude/excludeConfig"], function (exports_33, context_33) {
    "use strict";
    var empty_ts_10, regexp_ts_2, string_ts_7, keys_ts_1, excludeConfig_ts_1;
    var __moduleName = context_33 && context_33.id;
    /**
     * @name exclude
     * @throws TypeError
     * @param {Object} data
     * @param {Array.<string|RegExp>=} propertiesToExclude
     * @returns {Object}
     */
    function exclude(data, propertiesToExclude = []) {
        const config = excludeConfig_ts_1.excludeConfig(propertiesToExclude);
        if (empty_ts_10.arrayIsEmpty(config)) {
            return data;
        }
        const excludeString = config.filter(string_ts_7.isString);
        if (excludeString.length) {
            Object.keys(data).forEach((key) => {
                if (excludeString.includes(key)) {
                    delete data[key];
                }
            });
        }
        const keys = keys_ts_1.objectGetKeys(data);
        if (keys.length === 0) {
            return data;
        }
        const excludeRegExp = config.filter(regexp_ts_2.isRegExp);
        if (excludeRegExp.length) {
            excludeRegExp.forEach((reg) => {
                Object.keys(data).forEach((key) => {
                    if (reg.test(key)) {
                        delete data[key];
                    }
                });
            });
        }
        return data;
    }
    exports_33("exclude", exclude);
    return {
        setters: [
            function (empty_ts_10_1) {
                empty_ts_10 = empty_ts_10_1;
            },
            function (regexp_ts_2_1) {
                regexp_ts_2 = regexp_ts_2_1;
            },
            function (string_ts_7_1) {
                string_ts_7 = string_ts_7_1;
            },
            function (keys_ts_1_1) {
                keys_ts_1 = keys_ts_1_1;
            },
            function (excludeConfig_ts_1_1) {
                excludeConfig_ts_1 = excludeConfig_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IOmit", [], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/omit/omitConfig", ["src/util/array/get/unique", "src/util/array/is/empty", "src/util/is/string", "src/util/json/stringify"], function (exports_35, context_35) {
    "use strict";
    var unique_ts_3, empty_ts_11, string_ts_8, stringify_ts_5;
    var __moduleName = context_35 && context_35.id;
    /**
     * @name omitConfig
     * @throws TypeError
     * @param {Array.<string>} propertiesToOmit
     * @returns {Array.<string>}
     */
    function omitConfig(propertiesToOmit) {
        if (!Array.isArray(propertiesToOmit)) {
            throw new TypeError("'Omit' should be an array");
        }
        if (empty_ts_11.arrayIsEmpty(propertiesToOmit)) {
            return [];
        }
        return unique_ts_3.arrayGetUnique(propertiesToOmit).map((value) => {
            if (!string_ts_8.isString(value)) {
                throw new TypeError(`'Omit' expect array of strings. Value: '${stringify_ts_5.jsonStringify(value)}'.`);
            }
            return value;
        });
    }
    exports_35("omitConfig", omitConfig);
    return {
        setters: [
            function (unique_ts_3_1) {
                unique_ts_3 = unique_ts_3_1;
            },
            function (empty_ts_11_1) {
                empty_ts_11 = empty_ts_11_1;
            },
            function (string_ts_8_1) {
                string_ts_8 = string_ts_8_1;
            },
            function (stringify_ts_5_1) {
                stringify_ts_5 = stringify_ts_5_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/omit/omit", ["src/util/array/is/empty", "src/core/omit/omitConfig"], function (exports_36, context_36) {
    "use strict";
    var empty_ts_12, omitConfig_ts_1;
    var __moduleName = context_36 && context_36.id;
    /**
     * @name omit
     * @throws TypeError
     * @param {Object} data
     * @param {Array.<string>=} propertiesToOmit
     * @returns {Object}
     */
    function omit(data, propertiesToOmit = []) {
        const config = omitConfig_ts_1.omitConfig(propertiesToOmit);
        if (empty_ts_12.arrayIsEmpty(config)) {
            return data;
        }
        const dataToSerialize = {};
        Object.keys(data).forEach((key) => {
            if (config.includes(key)) {
                return;
            }
            dataToSerialize[key] = data[key];
        });
        return dataToSerialize;
    }
    exports_36("omit", omit);
    return {
        setters: [
            function (empty_ts_12_1) {
                empty_ts_12 = empty_ts_12_1;
            },
            function (omitConfig_ts_1_1) {
                omitConfig_ts_1 = omitConfig_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IOrder", [], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/const/ESort", [], function (exports_38, context_38) {
    "use strict";
    var ESort;
    var __moduleName = context_38 && context_38.id;
    return {
        setters: [],
        execute: function () {
            (function (ESort) {
                ESort["Default"] = "asc";
                ESort["No"] = "no";
                ESort["Yes"] = "asc";
            })(ESort || (ESort = {}));
            exports_38("ESort", ESort);
        }
    };
});
System.register("src/util/object/keys/order", [], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    /**
     * @name objectKeysOrder
     * @param {Object} instance
     * @param {Array.<string>} keys
     * @param {boolean=} alphabetize
     * @returns {Object}
     */
    function objectKeysOrder(instance, keys = [], alphabetize = false) {
        if (!Array.isArray(keys) || keys.length === 0) {
            return instance;
        }
        // noinspection SuspiciousTypeOfGuard
        const orderKeys = keys.filter((key) => typeof key === "string");
        let objectKeys = new Set(Object.keys(instance));
        const newObject = {};
        orderKeys.forEach((key) => {
            objectKeys.delete(key);
            if (key in instance) {
                newObject[key] = instance[key];
            }
        });
        objectKeys = [...objectKeys];
        if (alphabetize) {
            objectKeys = objectKeys.sort((alpha, beta) => alpha.localeCompare(beta));
        }
        objectKeys.forEach((key) => (newObject[key] = instance[key]));
        return newObject;
    }
    exports_39("objectKeysOrder", objectKeysOrder);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/order/orderConfig", ["src/util/array/get/unique", "src/util/array/is/empty", "src/util/is/string", "src/util/json/stringify"], function (exports_40, context_40) {
    "use strict";
    var unique_ts_4, empty_ts_13, string_ts_9, stringify_ts_6;
    var __moduleName = context_40 && context_40.id;
    /**
     * @name orderConfig
     * @throws TypeError
     * @param {Array.<string>} propertiesToStreamline
     * @returns {Array.<string>}
     */
    function orderConfig(propertiesToStreamline) {
        if (!Array.isArray(propertiesToStreamline)) {
            throw new TypeError("'Order' should be an array");
        }
        if (empty_ts_13.arrayIsEmpty(propertiesToStreamline)) {
            return [];
        }
        return unique_ts_4.arrayGetUnique(propertiesToStreamline, false).map((value) => {
            if (!string_ts_9.isString(value)) {
                throw new TypeError(`'Order' expect array of strings. Value: '${stringify_ts_6.jsonStringify(value)}'.`);
            }
            return value;
        });
    }
    exports_40("orderConfig", orderConfig);
    return {
        setters: [
            function (unique_ts_4_1) {
                unique_ts_4 = unique_ts_4_1;
            },
            function (empty_ts_13_1) {
                empty_ts_13 = empty_ts_13_1;
            },
            function (string_ts_9_1) {
                string_ts_9 = string_ts_9_1;
            },
            function (stringify_ts_6_1) {
                stringify_ts_6 = stringify_ts_6_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/config/sortAsBoolean", ["src/const/ESort"], function (exports_41, context_41) {
    "use strict";
    var ESort_ts_1;
    var __moduleName = context_41 && context_41.id;
    function sortAsBoolean(sort = ESort_ts_1.ESort.Default) {
        if (typeof sort === "boolean") {
            return sort;
        }
        return ESort_ts_1.ESort.Yes === sort;
    }
    exports_41("sortAsBoolean", sortAsBoolean);
    return {
        setters: [
            function (ESort_ts_1_1) {
                ESort_ts_1 = ESort_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/order/order", ["src/const/ESort", "src/util/array/is/empty", "src/util/object/keys/order", "src/core/order/orderConfig", "src/core/config/sortAsBoolean"], function (exports_42, context_42) {
    "use strict";
    var ESort_ts_2, empty_ts_14, order_ts_1, orderConfig_ts_1, sortAsBoolean_ts_1;
    var __moduleName = context_42 && context_42.id;
    /**
     * @name order
     * @throws TypeError
     * @param {Object} data
     * @param {Array.<string>=} propertiesToStreamline
     * @param {boolean=} sort
     * @returns {Object}
     */
    function order(data, propertiesToStreamline = [], sort = ESort_ts_2.ESort.Default) {
        const config = orderConfig_ts_1.orderConfig(propertiesToStreamline);
        if (empty_ts_14.arrayIsEmpty(config)) {
            return data;
        }
        return order_ts_1.objectKeysOrder(data, propertiesToStreamline, sortAsBoolean_ts_1.sortAsBoolean(sort));
    }
    exports_42("order", order);
    return {
        setters: [
            function (ESort_ts_2_1) {
                ESort_ts_2 = ESort_ts_2_1;
            },
            function (empty_ts_14_1) {
                empty_ts_14 = empty_ts_14_1;
            },
            function (order_ts_1_1) {
                order_ts_1 = order_ts_1_1;
            },
            function (orderConfig_ts_1_1) {
                orderConfig_ts_1 = orderConfig_ts_1_1;
            },
            function (sortAsBoolean_ts_1_1) {
                sortAsBoolean_ts_1 = sortAsBoolean_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IPick", [], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/pick/pickConfig", ["src/util/array/get/unique", "src/util/array/is/empty", "src/util/is/string", "src/util/json/stringify"], function (exports_44, context_44) {
    "use strict";
    var unique_ts_5, empty_ts_15, string_ts_10, stringify_ts_7;
    var __moduleName = context_44 && context_44.id;
    /**
     * @name pickConfig
     * @throws TypeError
     * @param {Array.<string>} propertiesToPick
     * @returns {Array.<string>}
     */
    function pickConfig(propertiesToPick) {
        if (!Array.isArray(propertiesToPick)) {
            throw new TypeError("'Pick' should be an array");
        }
        if (empty_ts_15.arrayIsEmpty(propertiesToPick)) {
            return [];
        }
        return unique_ts_5.arrayGetUnique(propertiesToPick).map((value) => {
            if (!string_ts_10.isString(value)) {
                throw new TypeError(`'Pick' expect array of strings. Value: '${stringify_ts_7.jsonStringify(value)}'.`);
            }
            return value;
        });
    }
    exports_44("pickConfig", pickConfig);
    return {
        setters: [
            function (unique_ts_5_1) {
                unique_ts_5 = unique_ts_5_1;
            },
            function (empty_ts_15_1) {
                empty_ts_15 = empty_ts_15_1;
            },
            function (string_ts_10_1) {
                string_ts_10 = string_ts_10_1;
            },
            function (stringify_ts_7_1) {
                stringify_ts_7 = stringify_ts_7_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/pick/pickData", ["src/util/array/is/empty"], function (exports_45, context_45) {
    "use strict";
    var empty_ts_16;
    var __moduleName = context_45 && context_45.id;
    /**
     * @name pickData
     * @param {Array.<string>} propertiesToPick
     * @param {Object} dataToSerialize
     * @returns {Object}
     */
    function pickData(propertiesToPick, dataToSerialize) {
        if (empty_ts_16.arrayIsEmpty(propertiesToPick)) {
            return dataToSerialize;
        }
        const newCache = {};
        Object.keys(dataToSerialize).forEach((key) => {
            if (propertiesToPick.includes(key)) {
                newCache[key] = dataToSerialize[key];
            }
        });
        return newCache;
    }
    exports_45("pickData", pickData);
    return {
        setters: [
            function (empty_ts_16_1) {
                empty_ts_16 = empty_ts_16_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/pick/pick", ["src/util/array/is/empty", "src/core/pick/pickConfig", "src/core/pick/pickData"], function (exports_46, context_46) {
    "use strict";
    var empty_ts_17, pickConfig_ts_1, pickData_ts_1;
    var __moduleName = context_46 && context_46.id;
    /**
     * @name pick
     * @throws TypeError
     * @param {Object} data
     * @param {Array.<string>=} propertiesToPick
     * @returns {Object}
     */
    function pick(data, propertiesToPick = []) {
        const config = pickConfig_ts_1.pickConfig(propertiesToPick);
        if (empty_ts_17.arrayIsEmpty(config)) {
            return data;
        }
        return pickData_ts_1.pickData(config, data);
    }
    exports_46("pick", pick);
    return {
        setters: [
            function (empty_ts_17_1) {
                empty_ts_17 = empty_ts_17_1;
            },
            function (pickConfig_ts_1_1) {
                pickConfig_ts_1 = pickConfig_ts_1_1;
            },
            function (pickData_ts_1_1) {
                pickData_ts_1 = pickData_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IRename", [], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/rename/renameConfig", ["src/util/array/get/unique", "src/util/check/isObjectLike", "src/util/is/string", "src/util/json/stringify", "src/util/object/is/empty"], function (exports_48, context_48) {
    "use strict";
    var unique_ts_6, isObjectLike_ts_3, string_ts_11, stringify_ts_8, empty_ts_18;
    var __moduleName = context_48 && context_48.id;
    /**
     * @name renameConfig
     * @throws TypeError
     * @param {Object.<string, string>} renamePropertyFromTo
     * @returns {Object}
     */
    function renameConfig(renamePropertyFromTo) {
        if (!isObjectLike_ts_3.checkIsObjectLike(renamePropertyFromTo)) {
            throw new TypeError("'Rename' should be an object");
        }
        if (empty_ts_18.objectIsEmpty(renamePropertyFromTo)) {
            return {};
        }
        Object.keys(renamePropertyFromTo).forEach((key) => {
            if (!string_ts_11.isString(key)) {
                throw new TypeError(`'Rename' expect object values to be strings. Not a string at key: '${key}'.`);
            }
        });
        const to = Object.values(renamePropertyFromTo);
        const toUnique = unique_ts_6.arrayGetUnique(to);
        if (to.length !== toUnique.length) {
            throw new TypeError(`'Rename' has similar values: '${stringify_ts_8.jsonStringify(toUnique)}'.`);
        }
        return renamePropertyFromTo;
    }
    exports_48("renameConfig", renameConfig);
    return {
        setters: [
            function (unique_ts_6_1) {
                unique_ts_6 = unique_ts_6_1;
            },
            function (isObjectLike_ts_3_1) {
                isObjectLike_ts_3 = isObjectLike_ts_3_1;
            },
            function (string_ts_11_1) {
                string_ts_11 = string_ts_11_1;
            },
            function (stringify_ts_8_1) {
                stringify_ts_8 = stringify_ts_8_1;
            },
            function (empty_ts_18_1) {
                empty_ts_18 = empty_ts_18_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/util/variable/cloneDeep", [], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    function clone(val) {
        switch (typeOf(val)) {
            case "arraybuffer":
                return cloneArrayBuffer(val);
            case "array":
                return val.slice();
            case "object":
                return Object.assign({}, val);
            case "date":
                return new val.constructor(Number(val));
            case "map":
                return new Map(val);
            case "set":
                return new Set(val);
            case "buffer":
                return cloneBuffer(val);
            case "symbol":
                return cloneSymbol(val);
            case "float32array":
            case "float64array":
            case "int16array":
            case "int32array":
            case "int8array":
            case "uint16array":
            case "uint32array":
            case "uint8clampedarray":
            case "uint8array":
                return cloneTypedArray(val);
            case "regexp":
                return cloneRegExp(val);
            case "error":
                return Object.create(val);
            default: {
                return val;
            }
        }
    }
    function cloneRegExp(val) {
        let flags;
        if (val.flags !== undefined) {
            flags = val.flags;
        }
        else {
            flags = /\w+$/.exec(val) || undefined;
        }
        const re = new val.constructor(val.source, flags);
        re.lastIndex = val.lastIndex;
        return re;
    }
    function cloneArrayBuffer(val) {
        const res = new val.constructor(val.byteLength);
        new Uint8Array(res).set(new Uint8Array(val));
        return res;
    }
    function cloneTypedArray(val) {
        return new val.constructor(val.buffer, val.byteOffset, val.length);
    }
    function cloneBuffer(val) {
        const len = val.length;
        let buf;
        if (Buffer.allocUnsafe) {
            buf = Buffer.allocUnsafe(len);
        }
        else {
            buf = Buffer.from(len);
        }
        val.copy(buf);
        return buf;
    }
    function cloneSymbol(val) {
        if (Symbol.prototype.valueOf) {
            return Object(Symbol.prototype.valueOf.call(val));
        }
        return {};
    }
    function isBuffer(obj) {
        return (obj !== null &&
            Boolean(obj.constructor) &&
            typeof obj.constructor.isBuffer === "function" &&
            obj.constructor.isBuffer(obj));
    }
    function typeOf(val) {
        if (typeof val === "undefined") {
            return "undefined";
        }
        if (val === null) {
            return "null";
        }
        if (val === true || val === false || val instanceof Boolean) {
            return "boolean";
        }
        if (typeof val === "string" || val instanceof String) {
            return "string";
        }
        if (typeof val === "number" || val instanceof Number) {
            return "number";
        }
        if (typeof val === "function" || val instanceof Function) {
            return "function";
        }
        if (typeof Array.isArray !== "undefined" && Array.isArray(val)) {
            return "array";
        }
        if (val instanceof RegExp) {
            return "regexp";
        }
        if (val instanceof Date) {
            return "date";
        }
        const type = Object.prototype.toString.call(val);
        if (type === "[object RegExp]") {
            return "regexp";
        }
        if (type === "[object Date]") {
            return "date";
        }
        if (type === "[object Arguments]") {
            return "arguments";
        }
        if (type === "[object Error]") {
            return "error";
        }
        if (isBuffer(val)) {
            return "buffer";
        }
        if (type === "[object Set]") {
            return "set";
        }
        if (type === "[object WeakSet]") {
            return "weakset";
        }
        if (type === "[object Map]") {
            return "map";
        }
        if (type === "[object WeakMap]") {
            return "weakmap";
        }
        if (type === "[object Symbol]") {
            return "symbol";
        }
        if (type === "[object Int8Array]") {
            return "int8array";
        }
        if (type === "[object Uint8Array]") {
            return "uint8array";
        }
        if (type === "[object Uint8ClampedArray]") {
            return "uint8clampedarray";
        }
        if (type === "[object Int16Array]") {
            return "int16array";
        }
        if (type === "[object Uint16Array]") {
            return "uint16array";
        }
        if (type === "[object Int32Array]") {
            return "int32array";
        }
        if (type === "[object Uint32Array]") {
            return "uint32array";
        }
        if (type === "[object Float32Array]") {
            return "float32array";
        }
        if (type === "[object Float64Array]") {
            return "float64array";
        }
        if (type === "[object ArrayBuffer]") {
            return "arraybuffer";
        }
        return "object";
    }
    function isObject(obj) {
        return typeof obj === "object" && obj !== null;
    }
    function isObjectObject(obj) {
        return (isObject(obj) &&
            Object.prototype.toString.call(obj) === "[object Object]");
    }
    function isPlainObject(obj) {
        if (!isObjectObject(obj)) {
            return false;
        }
        const ctor = obj.constructor;
        if (typeof ctor !== "function") {
            return false;
        }
        const prototype = ctor.prototype;
        if (!isObjectObject(prototype)) {
            return false;
        }
        // eslint-disable-next-line no-prototype-builtins
        return prototype.hasOwnProperty("isPrototypeOf");
    }
    function cloneObjectDeep(val, instanceClone) {
        if (typeof instanceClone === "function") {
            return instanceClone(val);
        }
        if (instanceClone || isPlainObject(val)) {
            const res = new val.constructor();
            for (const key in val) {
                // noinspection JSUnfilteredForInLoop
                res[key] = cloneDeep(val[key], instanceClone);
            }
            return res;
        }
        return val;
    }
    function cloneArrayDeep(val, instanceClone) {
        const res = new val.constructor(val.length);
        for (let index = 0; index < val.length; index++) {
            res[index] = cloneDeep(val[index], instanceClone);
        }
        return res;
    }
    function cloneDeep(value, instanceClone) {
        switch (typeOf(value)) {
            case "object":
                return cloneObjectDeep(value, instanceClone);
            case "array":
                return cloneArrayDeep(value, instanceClone);
            default: {
                return clone(value);
            }
        }
    }
    exports_49("cloneDeep", cloneDeep);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/rename/renameData", ["src/util/variable/cloneDeep", "src/util/object/is/empty"], function (exports_50, context_50) {
    "use strict";
    var cloneDeep_ts_1, empty_ts_19;
    var __moduleName = context_50 && context_50.id;
    /**
     * @name renameData
     * @param {Object.<string, string>} renamePropertyFromTo
     * @param {Object} dataToSerialize
     * @returns {Object}
     */
    function renameData(renamePropertyFromTo, dataToSerialize) {
        if (empty_ts_19.objectIsEmpty(renamePropertyFromTo)) {
            return dataToSerialize;
        }
        const renameFrom = Object.keys(renamePropertyFromTo).sort((alpha, beta) => alpha.localeCompare(beta));
        const renamedData = {};
        const data = cloneDeep_ts_1.cloneDeep(dataToSerialize);
        renameFrom.forEach((key) => {
            if (!(key in data)) {
                throw new Error(`Field '${key}' suppose to be renamed.`);
            }
            renamedData[renamePropertyFromTo[key]] = data[key];
        });
        renameFrom.forEach((key) => {
            delete data[key];
        });
        Object.assign(data, renamedData);
        return data;
    }
    exports_50("renameData", renameData);
    return {
        setters: [
            function (cloneDeep_ts_1_1) {
                cloneDeep_ts_1 = cloneDeep_ts_1_1;
            },
            function (empty_ts_19_1) {
                empty_ts_19 = empty_ts_19_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/rename/rename", ["src/util/object/is/empty", "src/core/rename/renameConfig", "src/core/rename/renameData"], function (exports_51, context_51) {
    "use strict";
    var empty_ts_20, renameConfig_ts_1, renameData_ts_1;
    var __moduleName = context_51 && context_51.id;
    /**
     * @name rename
     * @param {Object} data
     * @param {Object.<string, string>=} renamePropertyFromTo
     * @returns {Object}
     */
    function rename(data, renamePropertyFromTo = {}) {
        const config = renameConfig_ts_1.renameConfig(renamePropertyFromTo);
        if (empty_ts_20.objectIsEmpty(config)) {
            return data;
        }
        return renameData_ts_1.renameData(config, data);
    }
    exports_51("rename", rename);
    return {
        setters: [
            function (empty_ts_20_1) {
                empty_ts_20 = empty_ts_20_1;
            },
            function (renameConfig_ts_1_1) {
                renameConfig_ts_1 = renameConfig_ts_1_1;
            },
            function (renameData_ts_1_1) {
                renameData_ts_1 = renameData_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IReplace", [], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/replace/replaceConfig", ["src/util/check/isObjectLike"], function (exports_53, context_53) {
    "use strict";
    var isObjectLike_ts_4;
    var __moduleName = context_53 && context_53.id;
    /**
     * @name replaceConfig
     * @throws TypeError
     * @param {Object.<string, *>} replacePropertyValues
     * @returns {Object}
     */
    function replaceConfig(replacePropertyValues) {
        if (!isObjectLike_ts_4.checkIsObjectLike(replacePropertyValues)) {
            throw new TypeError("'Replace' should be an object");
        }
        return replacePropertyValues;
    }
    exports_53("replaceConfig", replaceConfig);
    return {
        setters: [
            function (isObjectLike_ts_4_1) {
                isObjectLike_ts_4 = isObjectLike_ts_4_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/replace/replaceData", ["src/util/object/is/empty"], function (exports_54, context_54) {
    "use strict";
    var empty_ts_21;
    var __moduleName = context_54 && context_54.id;
    /**
     * @name replaceData
     * @param {Object.<string, *>} replacePropertyValues
     * @param {Object} dataToSerialize
     * @returns {Object}
     */
    function replaceData(replacePropertyValues, dataToSerialize) {
        if (empty_ts_21.objectIsEmpty(replacePropertyValues)) {
            return dataToSerialize;
        }
        Object.keys(replacePropertyValues).forEach((key) => {
            dataToSerialize[key] = replacePropertyValues[key];
        });
        return dataToSerialize;
    }
    exports_54("replaceData", replaceData);
    return {
        setters: [
            function (empty_ts_21_1) {
                empty_ts_21 = empty_ts_21_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/replace/replace", ["src/util/object/is/empty", "src/core/replace/replaceConfig", "src/core/replace/replaceData"], function (exports_55, context_55) {
    "use strict";
    var empty_ts_22, replaceConfig_ts_1, replaceData_ts_1;
    var __moduleName = context_55 && context_55.id;
    /**
     * @name replace
     * @throws TypeError
     * @param {Object} data
     * @param {Object.<string, *>=} replacePropertyValues
     * @returns {Object}
     */
    function replace(data, replacePropertyValues = {}) {
        const config = replaceConfig_ts_1.replaceConfig(replacePropertyValues);
        if (empty_ts_22.objectIsEmpty(config)) {
            return data;
        }
        return replaceData_ts_1.replaceData(config, data);
    }
    exports_55("replace", replace);
    return {
        setters: [
            function (empty_ts_22_1) {
                empty_ts_22 = empty_ts_22_1;
            },
            function (replaceConfig_ts_1_1) {
                replaceConfig_ts_1 = replaceConfig_ts_1_1;
            },
            function (replaceData_ts_1_1) {
                replaceData_ts_1 = replaceData_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IRequired", [], function (exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/required/requiredConfig", ["src/util/array/get/unique", "src/util/array/is/empty", "src/util/is/string", "src/util/json/stringify"], function (exports_57, context_57) {
    "use strict";
    var unique_ts_7, empty_ts_23, string_ts_12, stringify_ts_9;
    var __moduleName = context_57 && context_57.id;
    /**
     * @name requiredConfig
     * @throws TypeError
     * @param {Array.<string>} propertiesRequired
     * @returns {Array.<string>}
     */
    function requiredConfig(propertiesRequired = []) {
        if (!Array.isArray(propertiesRequired)) {
            throw new TypeError("'Required' should be an array");
        }
        if (empty_ts_23.arrayIsEmpty(propertiesRequired)) {
            return [];
        }
        return unique_ts_7.arrayGetUnique(propertiesRequired).map((value) => {
            if (!string_ts_12.isString(value)) {
                throw new TypeError(`'Required' expect array of strings. Value: '${stringify_ts_9.jsonStringify(value)}'.`);
            }
            return value;
        });
    }
    exports_57("requiredConfig", requiredConfig);
    return {
        setters: [
            function (unique_ts_7_1) {
                unique_ts_7 = unique_ts_7_1;
            },
            function (empty_ts_23_1) {
                empty_ts_23 = empty_ts_23_1;
            },
            function (string_ts_12_1) {
                string_ts_12 = string_ts_12_1;
            },
            function (stringify_ts_9_1) {
                stringify_ts_9 = stringify_ts_9_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/required/requiredData", ["src/util/array/is/empty"], function (exports_58, context_58) {
    "use strict";
    var empty_ts_24;
    var __moduleName = context_58 && context_58.id;
    /**
     * @name requiredData
     * @param {Array.<string>} propertiesRequired
     * @param {Object} dataToSerialize
     * @returns {Object}
     */
    function requiredData(propertiesRequired, dataToSerialize) {
        if (empty_ts_24.arrayIsEmpty(propertiesRequired)) {
            return dataToSerialize;
        }
        propertiesRequired.forEach((key) => {
            if (!(key in dataToSerialize)) {
                throw new Error(`Field '${key}' is required.`);
            }
        });
        return dataToSerialize;
    }
    exports_58("requiredData", requiredData);
    return {
        setters: [
            function (empty_ts_24_1) {
                empty_ts_24 = empty_ts_24_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/required/required", ["src/util/array/is/empty", "src/core/required/requiredConfig", "src/core/required/requiredData"], function (exports_59, context_59) {
    "use strict";
    var empty_ts_25, requiredConfig_ts_1, requiredData_ts_1;
    var __moduleName = context_59 && context_59.id;
    /**
     * @name required
     * @throws TypeError
     * @param {Object} data
     * @param {Array.<string>=} propertiesRequired
     * @returns {Object}
     */
    function required(data, propertiesRequired = []) {
        const config = requiredConfig_ts_1.requiredConfig(propertiesRequired);
        if (empty_ts_25.arrayIsEmpty(config)) {
            return data;
        }
        return requiredData_ts_1.requiredData(config, data);
    }
    exports_59("required", required);
    return {
        setters: [
            function (empty_ts_25_1) {
                empty_ts_25 = empty_ts_25_1;
            },
            function (requiredConfig_ts_1_1) {
                requiredConfig_ts_1 = requiredConfig_ts_1_1;
            },
            function (requiredData_ts_1_1) {
                requiredData_ts_1 = requiredData_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/interface/config/ITransform", [], function (exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/check/isCallable", ["src/util/is/function"], function (exports_61, context_61) {
    "use strict";
    var function_ts_2;
    var __moduleName = context_61 && context_61.id;
    function checkIsCallable(value) {
        if (!value) {
            return false;
        }
        if (function_ts_2.isFunction(value)) {
            return true;
        }
        if ("toFunction" in value &&
            function_ts_2.isFunction(value.toFunction) &&
            function_ts_2.isFunction(value.toFunction())) {
            return true;
        }
        //
        return false;
    }
    exports_61("checkIsCallable", checkIsCallable);
    return {
        setters: [
            function (function_ts_2_1) {
                function_ts_2 = function_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/transform/transformConfig", ["src/util/check/isCallable", "src/util/check/isObjectLike", "src/util/object/is/empty"], function (exports_62, context_62) {
    "use strict";
    var isCallable_ts_1, isObjectLike_ts_5, empty_ts_26;
    var __moduleName = context_62 && context_62.id;
    /**
     * @name transformConfig
     * @throws TypeError
     * @param {Object.<string, function>} propertyValueTransformWith
     * @returns {Object}
     */
    function transformConfig(propertyValueTransformWith) {
        if (!isObjectLike_ts_5.checkIsObjectLike(propertyValueTransformWith)) {
            throw new TypeError("'Transform' should be an object");
        }
        if (empty_ts_26.objectIsEmpty(propertyValueTransformWith)) {
            return {};
        }
        Object.keys(propertyValueTransformWith).forEach((key) => {
            if (!isCallable_ts_1.checkIsCallable(propertyValueTransformWith[key])) {
                throw new TypeError(`'Transform' expect object values to be functions. Not a function at key: '${key}'.`);
            }
        });
        return propertyValueTransformWith;
    }
    exports_62("transformConfig", transformConfig);
    return {
        setters: [
            function (isCallable_ts_1_1) {
                isCallable_ts_1 = isCallable_ts_1_1;
            },
            function (isObjectLike_ts_5_1) {
                isObjectLike_ts_5 = isObjectLike_ts_5_1;
            },
            function (empty_ts_26_1) {
                empty_ts_26 = empty_ts_26_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/util/check/isPrimitive", [], function (exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    /**
     * @name checkIsPrimitive
     * @description Return true on boolean, string, number, BigInt, null, Symbol and undefined
     * @param {*} value
     * @return {boolean}
     */
    function checkIsPrimitive(value) {
        return Object(value) !== value;
    }
    exports_63("checkIsPrimitive", checkIsPrimitive);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/variable/clone", ["src/util/check/isPrimitive", "src/util/variable/cloneDeep"], function (exports_64, context_64) {
    "use strict";
    var isPrimitive_ts_1, cloneDeep_ts_2;
    var __moduleName = context_64 && context_64.id;
    /**
     * @name clone
     * @param {*} value
     * @returns {*}
     */
    function clone(value) {
        if (isPrimitive_ts_1.checkIsPrimitive(value)) {
            return value;
        }
        return cloneDeep_ts_2.cloneDeep(value);
    }
    exports_64("clone", clone);
    return {
        setters: [
            function (isPrimitive_ts_1_1) {
                isPrimitive_ts_1 = isPrimitive_ts_1_1;
            },
            function (cloneDeep_ts_2_1) {
                cloneDeep_ts_2 = cloneDeep_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/transform/transformData", ["src/util/variable/clone", "src/util/is/function", "src/util/object/is/empty"], function (exports_65, context_65) {
    "use strict";
    var clone_ts_1, function_ts_3, empty_ts_27;
    var __moduleName = context_65 && context_65.id;
    /**
     * @name transformData
     * @param {Object.<string, function>} propertyValueTransformWith
     * @param {Object} dataToSerialize
     * @returns {Object}
     */
    function transformData(propertyValueTransformWith, dataToSerialize) {
        if (empty_ts_27.objectIsEmpty(propertyValueTransformWith)) {
            return dataToSerialize;
        }
        Object.keys(propertyValueTransformWith).forEach((key) => {
            if (!(key in dataToSerialize)) {
                throw new Error(`Field '${key}' suppose to be transformed.`);
            }
            if (function_ts_3.isFunction(propertyValueTransformWith[key])) {
                dataToSerialize[key] = propertyValueTransformWith[key](dataToSerialize[key], key, clone_ts_1.clone(dataToSerialize));
            }
            else {
                // @ts-ignore
                dataToSerialize[key] = propertyValueTransformWith[key].toFunction()(dataToSerialize[key], key, clone_ts_1.clone(dataToSerialize));
            }
        });
        return dataToSerialize;
    }
    exports_65("transformData", transformData);
    return {
        setters: [
            function (clone_ts_1_1) {
                clone_ts_1 = clone_ts_1_1;
            },
            function (function_ts_3_1) {
                function_ts_3 = function_ts_3_1;
            },
            function (empty_ts_27_1) {
                empty_ts_27 = empty_ts_27_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/transform/transform", ["src/util/object/is/empty", "src/core/transform/transformConfig", "src/core/transform/transformData"], function (exports_66, context_66) {
    "use strict";
    var empty_ts_28, transformConfig_ts_1, transformData_ts_1;
    var __moduleName = context_66 && context_66.id;
    /**
     * @name transform
     * @param {Object} data
     * @param {Object.<string, function>=} propertyValueTransformWith
     * @returns {Object}
     */
    function transform(data, propertyValueTransformWith = {}) {
        const config = transformConfig_ts_1.transformConfig(propertyValueTransformWith);
        if (empty_ts_28.objectIsEmpty(config)) {
            return data;
        }
        return transformData_ts_1.transformData(config, data);
    }
    exports_66("transform", transform);
    return {
        setters: [
            function (empty_ts_28_1) {
                empty_ts_28 = empty_ts_28_1;
            },
            function (transformConfig_ts_1_1) {
                transformConfig_ts_1 = transformConfig_ts_1_1;
            },
            function (transformData_ts_1_1) {
                transformData_ts_1 = transformData_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/interface/common/IFunction", [], function (exports_67, context_67) {
    "use strict";
    var __moduleName = context_67 && context_67.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IConfigCallback", [], function (exports_68, context_68) {
    "use strict";
    var __moduleName = context_68 && context_68.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IConfigObject", [], function (exports_69, context_69) {
    "use strict";
    var __moduleName = context_69 && context_69.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IConfig", [], function (exports_70, context_70) {
    "use strict";
    var __moduleName = context_70 && context_70.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/interface/config/IConfigObjectFull", [], function (exports_71, context_71) {
    "use strict";
    var __moduleName = context_71 && context_71.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/const/CONFIG_FIELDS", [], function (exports_72, context_72) {
    "use strict";
    var CONFIG_FIELDS;
    var __moduleName = context_72 && context_72.id;
    return {
        setters: [],
        execute: function () {
            exports_72("CONFIG_FIELDS", CONFIG_FIELDS = [
                "cast",
                "defaults",
                "defined",
                "exclude",
                "omit",
                "order",
                "pick",
                "sort",
                "rename",
                "replace",
                "required",
                "transform",
            ]);
        }
    };
});
// import AggregateError from "es-aggregate-error";
// AggregateError.shim(); // will be a no-op if not needed
System.register("src/core/errors/AggregateError", [], function (exports_73, context_73) {
    "use strict";
    var AggregateError;
    var __moduleName = context_73 && context_73.id;
    return {
        setters: [],
        execute: function () {
            AggregateError = class AggregateError extends Error {
                /**
                 * @param {Array<Error>} errors
                 * @param {String} message
                 */
                constructor(errors, message = "") {
                    super(message);
                    this.name = "AggregateError";
                    this.errors = [];
                    this.errors = errors;
                    this.message = message;
                }
            };
            exports_73("AggregateError", AggregateError);
        }
    };
});
System.register("src/core/errors/ValidationError", [], function (exports_74, context_74) {
    "use strict";
    var ValidationError;
    var __moduleName = context_74 && context_74.id;
    return {
        setters: [],
        execute: function () {
            ValidationError = class ValidationError extends Error {
                constructor(message) {
                    super(message);
                    this.name = "ValidationError";
                }
            };
            exports_74("ValidationError", ValidationError);
        }
    };
});
System.register("src/util/array/basic/intersect", [], function (exports_75, context_75) {
    "use strict";
    var __moduleName = context_75 && context_75.id;
    /**
     * @name arrayBasicIntersect
     * @param {Array} alpha
     * @param {Array} beta
     * @returns {Array}
     */
    function arrayBasicIntersect(alpha, beta) {
        if (!alpha.length || !beta.length) {
            return [];
        }
        const setB = new Set(beta);
        return [...new Set(alpha)].filter((value) => setB.has(value));
    }
    exports_75("arrayBasicIntersect", arrayBasicIntersect);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/array/get/difference", [], function (exports_76, context_76) {
    "use strict";
    var __moduleName = context_76 && context_76.id;
    function arrayGetDifference(alpha, beta) {
        const set = new Set(beta);
        return alpha.filter((value) => !set.has(value));
    }
    exports_76("arrayGetDifference", arrayGetDifference);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/array/basic/hasSame", [], function (exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
    /**
     * @name arrayHasSame
     * @param {Array} alpha
     * @param {Array} beta
     * @returns {boolean}
     */
    function arrayHasSame(alpha, beta) {
        if (!alpha.length || !beta.length) {
            return false;
        }
        const setB = new Set(beta);
        return Boolean([...new Set(alpha)].filter((x) => setB.has(x)).length);
    }
    exports_77("arrayHasSame", arrayHasSame);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/object/keys/sort", [], function (exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    /**
     * @name objectKeysSort
     * @param {object} instance
     * @param {boolean=true} isDeep
     * @returns {object}
     */
    function objectKeysSort(instance, isDeep = true) {
        if (!instance || typeof instance !== "object" || Array.isArray(instance)) {
            return instance;
        }
        const keys = Object.keys(instance);
        if (!keys.length) {
            return instance;
        }
        return keys.reduce((sorted, key) => {
            if (isDeep && instance[key] && typeof instance[key] === "object" &&
                !Array.isArray(instance[key])) {
                sorted[key] = objectKeysSort(instance[key], isDeep);
            }
            else {
                sorted[key] = instance[key];
            }
            return sorted;
        }, Object.create(Object.getPrototypeOf(instance)));
    }
    exports_78("objectKeysSort", objectKeysSort);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/cast/to/json", ["src/const/ESort", "src/util/json/parse", "src/util/json/stringify", "src/util/object/keys/sort", "src/core/config/sortAsBoolean"], function (exports_79, context_79) {
    "use strict";
    var ESort_ts_3, parse_ts_2, stringify_ts_10, sort_ts_1, sortAsBoolean_ts_2;
    var __moduleName = context_79 && context_79.id;
    /**
     * @name castToJson
     * @param {*} value
     * @param {boolean=} sort
     * @returns {*}
     */
    function castToJson(value, sort = ESort_ts_3.ESort.Default) {
        if (sortAsBoolean_ts_2.sortAsBoolean(sort)) {
            return sort_ts_1.objectKeysSort(parse_ts_2.jsonParse(stringify_ts_10.jsonStringify(value)), true);
        }
        else {
            return parse_ts_2.jsonParse(stringify_ts_10.jsonStringify(value));
        }
    }
    exports_79("castToJson", castToJson);
    return {
        setters: [
            function (ESort_ts_3_1) {
                ESort_ts_3 = ESort_ts_3_1;
            },
            function (parse_ts_2_1) {
                parse_ts_2 = parse_ts_2_1;
            },
            function (stringify_ts_10_1) {
                stringify_ts_10 = stringify_ts_10_1;
            },
            function (sort_ts_1_1) {
                sort_ts_1 = sort_ts_1_1;
            },
            function (sortAsBoolean_ts_2_1) {
                sortAsBoolean_ts_2 = sortAsBoolean_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/util/object/get/property", [], function (exports_80, context_80) {
    "use strict";
    var __moduleName = context_80 && context_80.id;
    function objectGetProperty(object, key, defaultValue) {
        if (key in object) {
            return object[key];
        }
        return defaultValue;
    }
    exports_80("objectGetProperty", objectGetProperty);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/exclude/excludeData", ["src/util/array/is/empty", "src/util/is/regexp", "src/util/is/string", "src/util/object/get/keys"], function (exports_81, context_81) {
    "use strict";
    var empty_ts_29, regexp_ts_3, string_ts_13, keys_ts_2;
    var __moduleName = context_81 && context_81.id;
    /**
     * @name excludeData
     * @param {Array.<string|RegExp>} propertiesToExclude
     * @param {Object} data
     * @returns {Object}
     */
    function excludeData(propertiesToExclude, data) {
        if (empty_ts_29.arrayIsEmpty(propertiesToExclude)) {
            return data;
        }
        const excludeString = propertiesToExclude.filter(string_ts_13.isString);
        if (excludeString.length) {
            Object.keys(data).forEach((key) => {
                if (excludeString.includes(key)) {
                    delete data[key];
                }
            });
        }
        const keys = keys_ts_2.objectGetKeys(data);
        if (keys.length === 0) {
            return data;
        }
        const excludeRegExp = propertiesToExclude.filter(regexp_ts_3.isRegExp);
        if (excludeRegExp.length) {
            excludeRegExp.forEach((reg) => {
                Object.keys(data).forEach((key) => {
                    if (reg.test(key)) {
                        delete data[key];
                    }
                });
            });
        }
        return data;
    }
    exports_81("excludeData", excludeData);
    return {
        setters: [
            function (empty_ts_29_1) {
                empty_ts_29 = empty_ts_29_1;
            },
            function (regexp_ts_3_1) {
                regexp_ts_3 = regexp_ts_3_1;
            },
            function (string_ts_13_1) {
                string_ts_13 = string_ts_13_1;
            },
            function (keys_ts_2_1) {
                keys_ts_2 = keys_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/omit/omitData", ["src/util/array/is/empty"], function (exports_82, context_82) {
    "use strict";
    var empty_ts_30;
    var __moduleName = context_82 && context_82.id;
    /**
     * @name omitData
     * @param {Array.<string>} propertiesToOmit
     * @param {Object} data
     * @returns {Object}
     */
    function omitData(propertiesToOmit, data) {
        if (empty_ts_30.arrayIsEmpty(propertiesToOmit)) {
            return data;
        }
        const dataToSerialize = {};
        Object.keys(data).forEach((key) => {
            if (propertiesToOmit.includes(key)) {
                return;
            }
            dataToSerialize[key] = data[key];
        });
        return dataToSerialize;
    }
    exports_82("omitData", omitData);
    return {
        setters: [
            function (empty_ts_30_1) {
                empty_ts_30 = empty_ts_30_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/order/orderData", ["src/const/ESort", "src/core/config/sortAsBoolean", "src/util/array/is/empty", "src/util/object/keys/order"], function (exports_83, context_83) {
    "use strict";
    var ESort_ts_4, sortAsBoolean_ts_3, empty_ts_31, order_ts_2;
    var __moduleName = context_83 && context_83.id;
    /**
     * @name orderData
     * @param {Array.<string>} propertiesToStreamline
     * @param {Object} data
     * @param {boolean=} sort
     * @returns {Object}
     */
    function orderData(propertiesToStreamline, data, sort = ESort_ts_4.ESort.Default) {
        if (empty_ts_31.arrayIsEmpty(propertiesToStreamline)) {
            return data;
        }
        return order_ts_2.objectKeysOrder(data, propertiesToStreamline, sortAsBoolean_ts_3.sortAsBoolean(sort));
    }
    exports_83("orderData", orderData);
    return {
        setters: [
            function (ESort_ts_4_1) {
                ESort_ts_4 = ESort_ts_4_1;
            },
            function (sortAsBoolean_ts_3_1) {
                sortAsBoolean_ts_3 = sortAsBoolean_ts_3_1;
            },
            function (empty_ts_31_1) {
                empty_ts_31 = empty_ts_31_1;
            },
            function (order_ts_2_1) {
                order_ts_2 = order_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/util/object/createEmpty", [], function (exports_84, context_84) {
    "use strict";
    var __moduleName = context_84 && context_84.id;
    function objectCreateEmpty() {
        return new Object(null);
    }
    exports_84("objectCreateEmpty", objectCreateEmpty);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/core/config/createConfig", ["src/const/ESort", "src/util/object/createEmpty"], function (exports_85, context_85) {
    "use strict";
    var ESort_ts_5, createEmpty_ts_1;
    var __moduleName = context_85 && context_85.id;
    function createConfig() {
        return {
            cast: createEmpty_ts_1.objectCreateEmpty(),
            defaults: createEmpty_ts_1.objectCreateEmpty(),
            defined: [],
            exclude: [],
            omit: [],
            order: [],
            pick: [],
            sort: ESort_ts_5.ESort.Default,
            rename: createEmpty_ts_1.objectCreateEmpty(),
            replace: createEmpty_ts_1.objectCreateEmpty(),
            required: [],
            transform: createEmpty_ts_1.objectCreateEmpty(),
        };
    }
    exports_85("createConfig", createConfig);
    return {
        setters: [
            function (ESort_ts_5_1) {
                ESort_ts_5 = ESort_ts_5_1;
            },
            function (createEmpty_ts_1_1) {
                createEmpty_ts_1 = createEmpty_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/class/VicisParameter", ["src/const/ECastType"], function (exports_86, context_86) {
    "use strict";
    var ECastType_ts_4, VicisParameter;
    var __moduleName = context_86 && context_86.id;
    return {
        setters: [
            function (ECastType_ts_4_1) {
                ECastType_ts_4 = ECastType_ts_4_1;
            }
        ],
        execute: function () {
            VicisParameter = class VicisParameter {
                constructor() {
                    this.#hasDefaults = false;
                    this.#hasValue = false;
                    this.#value = undefined;
                }
                #cast;
                #defaults;
                #defined;
                #hasDefaults;
                #hasValue;
                #required;
                #transform;
                #value;
                get boolean() {
                    this.#cast = ECastType_ts_4.ECastType.BOOLEAN;
                    return this;
                }
                get flag() {
                    this.#cast = ECastType_ts_4.ECastType.FLAG;
                    return this;
                }
                get integer() {
                    this.#cast = ECastType_ts_4.ECastType.INTEGER;
                    return this;
                }
                get numeric() {
                    this.#cast = ECastType_ts_4.ECastType.NUMERIC;
                    return this;
                }
                get string() {
                    this.#cast = ECastType_ts_4.ECastType.STRING;
                    return this;
                }
                get json() {
                    this.#cast = ECastType_ts_4.ECastType.JSON;
                    return this;
                }
                get defined() {
                    this.#defined = true;
                    return this;
                }
                get required() {
                    this.#required = true;
                    return this;
                }
                replace(value) {
                    this.#value = value;
                    this.#hasValue = true;
                    return this;
                }
                defaults(value) {
                    this.#defaults = value;
                    this.#hasDefaults = true;
                    return this;
                }
                transform(callable) {
                    this.#transform = callable;
                    return this;
                }
                toObject() {
                    return {
                        cast: this.#cast,
                        defaults: this.#defaults,
                        defined: this.#defined,
                        hasDefaults: this.#hasDefaults,
                        hasValue: this.#hasValue,
                        required: this.#required,
                        transform: this.#transform,
                        value: this.#value,
                    };
                }
            };
            exports_86("VicisParameter", VicisParameter);
        }
    };
});
System.register("src/core/config/functionToConfig", ["src/core/config/createConfig", "src/util/is/function", "src/core/class/VicisParameter"], function (exports_87, context_87) {
    "use strict";
    var createConfig_ts_1, function_ts_4, VicisParameter_ts_1;
    var __moduleName = context_87 && context_87.id;
    function convertFunctionToConfig(callable) {
        if (!function_ts_4.isFunction(callable)) {
            throw new TypeError("Callable must be a function");
        }
        const model = callable(new Proxy(new Object(null), {
            get: function (targetObject, key) {
                if (!(key in targetObject)) {
                    targetObject[key] = new VicisParameter_ts_1.VicisParameter();
                }
                return targetObject[key];
            },
        }));
        const config = createConfig_ts_1.createConfig();
        Object.keys(model).forEach((keyOfConfig) => {
            const key = keyOfConfig;
            config.pick.push(key);
            const data = {};
            if (model[key] instanceof VicisParameter_ts_1.VicisParameter) {
                data[key] = model[key].toObject();
            }
            else {
                const param = new VicisParameter_ts_1.VicisParameter();
                param.replace(model[key]);
                data[key] = param.toObject();
            }
            delete model[key];
            if (data[key].cast) {
                config.cast[key] = data[key].cast;
            }
            if (data[key].defined) {
                config.defined.push(key);
            }
            if (data[key].required) {
                config.required.push(key);
            }
            if (data[key].transform) {
                config.transform[key] = data[key].transform;
            }
            if (data[key].hasDefaults) {
                config.defaults[key] = data[key].defaults;
            }
            if (data[key].hasValue) {
                config.replace[key] = data[key].value;
            }
        });
        if (!Object.keys(config.cast).length) {
            delete config.cast;
        }
        if (!Object.keys(config.defaults).length) {
            delete config.defaults;
        }
        if (!config.defined.length) {
            delete config.defined;
        }
        if (!config.pick.length) {
            delete config.pick;
        }
        if (!config.required.length) {
            delete config.required;
        }
        if (!Object.keys(config.replace).length) {
            delete config.replace;
        }
        if (!Object.keys(config.transform).length) {
            delete config.transform;
        }
        return config;
    }
    exports_87("convertFunctionToConfig", convertFunctionToConfig);
    return {
        setters: [
            function (createConfig_ts_1_1) {
                createConfig_ts_1 = createConfig_ts_1_1;
            },
            function (function_ts_4_1) {
                function_ts_4 = function_ts_4_1;
            },
            function (VicisParameter_ts_1_1) {
                VicisParameter_ts_1 = VicisParameter_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/core/class/Vicis", ["src/const/ECastType", "src/const/CONFIG_FIELDS", "src/const/ESort", "src/core/errors/AggregateError", "src/core/errors/ValidationError", "src/util/array/basic/intersect", "src/util/array/get/difference", "src/util/array/basic/hasSame", "src/util/cast/to/json", "src/util/check/isObjectLike", "src/util/variable/clone", "src/util/is/function", "src/util/json/stringify", "src/util/object/get/keys", "src/util/object/get/property", "src/core/cast/castConfig", "src/core/cast/castData", "src/core/defaults/defaultsConfig", "src/core/defaults/defaultsData", "src/core/defined/definedConfig", "src/core/defined/definedData", "src/core/exclude/excludeConfig", "src/core/exclude/excludeData", "src/core/omit/omitConfig", "src/core/omit/omitData", "src/core/order/orderConfig", "src/core/order/orderData", "src/core/pick/pickConfig", "src/core/pick/pickData", "src/core/rename/renameConfig", "src/core/rename/renameData", "src/core/replace/replaceConfig", "src/core/replace/replaceData", "src/core/required/requiredConfig", "src/core/required/requiredData", "src/core/transform/transformConfig", "src/core/transform/transformData", "src/core/config/functionToConfig", "src/util/object/createEmpty", "src/core/config/sortAsBoolean"], function (exports_88, context_88) {
    "use strict";
    var ECastType_ts_5, CONFIG_FIELDS_ts_1, ESort_ts_6, AggregateError_ts_1, ValidationError_ts_1, intersect_ts_1, difference_ts_1, hasSame_ts_1, json_ts_1, isObjectLike_ts_6, clone_ts_2, function_ts_5, stringify_ts_11, keys_ts_3, property_ts_1, castConfig_ts_2, castData_ts_2, defaultsConfig_ts_2, defaultsData_ts_2, definedConfig_ts_2, definedData_ts_2, excludeConfig_ts_2, excludeData_ts_1, omitConfig_ts_2, omitData_ts_1, orderConfig_ts_2, orderData_ts_1, pickConfig_ts_2, pickData_ts_2, renameConfig_ts_2, renameData_ts_2, replaceConfig_ts_2, replaceData_ts_2, requiredConfig_ts_2, requiredData_ts_2, transformConfig_ts_2, transformData_ts_2, functionToConfig_ts_1, createEmpty_ts_2, sortAsBoolean_ts_4, Vicis;
    var __moduleName = context_88 && context_88.id;
    return {
        setters: [
            function (ECastType_ts_5_1) {
                ECastType_ts_5 = ECastType_ts_5_1;
            },
            function (CONFIG_FIELDS_ts_1_1) {
                CONFIG_FIELDS_ts_1 = CONFIG_FIELDS_ts_1_1;
            },
            function (ESort_ts_6_1) {
                ESort_ts_6 = ESort_ts_6_1;
            },
            function (AggregateError_ts_1_1) {
                AggregateError_ts_1 = AggregateError_ts_1_1;
            },
            function (ValidationError_ts_1_1) {
                ValidationError_ts_1 = ValidationError_ts_1_1;
            },
            function (intersect_ts_1_1) {
                intersect_ts_1 = intersect_ts_1_1;
            },
            function (difference_ts_1_1) {
                difference_ts_1 = difference_ts_1_1;
            },
            function (hasSame_ts_1_1) {
                hasSame_ts_1 = hasSame_ts_1_1;
            },
            function (json_ts_1_1) {
                json_ts_1 = json_ts_1_1;
            },
            function (isObjectLike_ts_6_1) {
                isObjectLike_ts_6 = isObjectLike_ts_6_1;
            },
            function (clone_ts_2_1) {
                clone_ts_2 = clone_ts_2_1;
            },
            function (function_ts_5_1) {
                function_ts_5 = function_ts_5_1;
            },
            function (stringify_ts_11_1) {
                stringify_ts_11 = stringify_ts_11_1;
            },
            function (keys_ts_3_1) {
                keys_ts_3 = keys_ts_3_1;
            },
            function (property_ts_1_1) {
                property_ts_1 = property_ts_1_1;
            },
            function (castConfig_ts_2_1) {
                castConfig_ts_2 = castConfig_ts_2_1;
            },
            function (castData_ts_2_1) {
                castData_ts_2 = castData_ts_2_1;
            },
            function (defaultsConfig_ts_2_1) {
                defaultsConfig_ts_2 = defaultsConfig_ts_2_1;
            },
            function (defaultsData_ts_2_1) {
                defaultsData_ts_2 = defaultsData_ts_2_1;
            },
            function (definedConfig_ts_2_1) {
                definedConfig_ts_2 = definedConfig_ts_2_1;
            },
            function (definedData_ts_2_1) {
                definedData_ts_2 = definedData_ts_2_1;
            },
            function (excludeConfig_ts_2_1) {
                excludeConfig_ts_2 = excludeConfig_ts_2_1;
            },
            function (excludeData_ts_1_1) {
                excludeData_ts_1 = excludeData_ts_1_1;
            },
            function (omitConfig_ts_2_1) {
                omitConfig_ts_2 = omitConfig_ts_2_1;
            },
            function (omitData_ts_1_1) {
                omitData_ts_1 = omitData_ts_1_1;
            },
            function (orderConfig_ts_2_1) {
                orderConfig_ts_2 = orderConfig_ts_2_1;
            },
            function (orderData_ts_1_1) {
                orderData_ts_1 = orderData_ts_1_1;
            },
            function (pickConfig_ts_2_1) {
                pickConfig_ts_2 = pickConfig_ts_2_1;
            },
            function (pickData_ts_2_1) {
                pickData_ts_2 = pickData_ts_2_1;
            },
            function (renameConfig_ts_2_1) {
                renameConfig_ts_2 = renameConfig_ts_2_1;
            },
            function (renameData_ts_2_1) {
                renameData_ts_2 = renameData_ts_2_1;
            },
            function (replaceConfig_ts_2_1) {
                replaceConfig_ts_2 = replaceConfig_ts_2_1;
            },
            function (replaceData_ts_2_1) {
                replaceData_ts_2 = replaceData_ts_2_1;
            },
            function (requiredConfig_ts_2_1) {
                requiredConfig_ts_2 = requiredConfig_ts_2_1;
            },
            function (requiredData_ts_2_1) {
                requiredData_ts_2 = requiredData_ts_2_1;
            },
            function (transformConfig_ts_2_1) {
                transformConfig_ts_2 = transformConfig_ts_2_1;
            },
            function (transformData_ts_2_1) {
                transformData_ts_2 = transformData_ts_2_1;
            },
            function (functionToConfig_ts_1_1) {
                functionToConfig_ts_1 = functionToConfig_ts_1_1;
            },
            function (createEmpty_ts_2_1) {
                createEmpty_ts_2 = createEmpty_ts_2_1;
            },
            function (sortAsBoolean_ts_4_1) {
                sortAsBoolean_ts_4 = sortAsBoolean_ts_4_1;
            }
        ],
        execute: function () {
            Vicis = class Vicis {
                //#endregion
                //#region Initialization Methods
                /**
                 * @name constructor
                 * @public
                 * @constructor
                 * @param {Function|Object=} config
                 * @param {Object=} data
                 * @throws AggregateError
                 */
                constructor(config = {}, data) {
                    this.#cast = createEmpty_ts_2.objectCreateEmpty();
                    this.#defaults = createEmpty_ts_2.objectCreateEmpty();
                    this.#defined = [];
                    this.#exclude = [];
                    this.#omit = [];
                    this.#order = [];
                    this.#pick = [];
                    this.#rename = createEmpty_ts_2.objectCreateEmpty();
                    this.#replace = createEmpty_ts_2.objectCreateEmpty();
                    this.#required = [];
                    this.#sort = ESort_ts_6.ESort.Default;
                    this.#transform = createEmpty_ts_2.objectCreateEmpty();
                    this.#dataCache = createEmpty_ts_2.objectCreateEmpty();
                    this.#dataOriginal = undefined;
                    this.config(config);
                    if (data !== undefined) {
                        this.data(data);
                    }
                }
                //#region Config Fields
                /**
                 * @name cast
                 * @private
                 * @type {Object}
                 */
                #cast;
                /**
                 * @name defaults
                 * @private
                 * @type {Object}
                 */
                #defaults;
                /**
                 * @name defined
                 * @private
                 * @type {Array.<string>}
                 */
                #defined;
                /**
                 * @name exclude
                 * @private
                 * @type {Array.<string|RegExp>}
                 */
                #exclude;
                /**
                 * @name omit
                 * @private
                 * @type {Array.<string>}
                 */
                #omit;
                /**
                 * @name order
                 * @private
                 * @type {Array.<string>}
                 */
                #order;
                /**
                 * @name pick
                 * @private
                 * @type {Array.<string>}
                 */
                #pick;
                /**
                 * @name sort
                 * @private
                 * @type {boolean|string}
                 */
                #sort;
                /**
                 * @name rename
                 * @private
                 * @type {Object}
                 */
                #rename;
                /**
                 * @name replace
                 * @private
                 * @type {Object}
                 */
                #replace;
                /**
                 * @name required
                 * @private
                 * @type {Array.<string>}
                 */
                #required;
                /**
                 * @name transform
                 * @private
                 * @type {Object}
                 */
                #transform;
                //#endregion
                //#region Data Fields
                /**
                 * @name dataCache
                 * @private
                 * @type {Object}
                 */
                #dataCache;
                /**
                 * @name dataOriginal
                 * @private
                 * @type {Object}
                 */
                #dataOriginal;
                //#endregion
                //#region Private Methods
                /**
                 * @name validateConfig
                 * @protected
                 * @method
                 * @throws Error
                 * @returns {Vicis}
                 */
                validateConfig() {
                    const cast = keys_ts_3.objectGetKeys(this.#cast);
                    const rename = keys_ts_3.objectGetKeys(this.#rename);
                    const replace = keys_ts_3.objectGetKeys(this.#replace);
                    const transform = keys_ts_3.objectGetKeys(this.#transform);
                    if (hasSame_ts_1.arrayHasSame(this.#omit, cast)) {
                        throw new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'cast': ${intersect_ts_1.arrayBasicIntersect(this.#omit, cast)}.`);
                    }
                    if (hasSame_ts_1.arrayHasSame(this.#omit, this.#defined)) {
                        throw new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'defined': ${intersect_ts_1.arrayBasicIntersect(this.#omit, this.#defined)}.`);
                    }
                    if (hasSame_ts_1.arrayHasSame(this.#omit, this.#pick)) {
                        throw new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'pick': ${intersect_ts_1.arrayBasicIntersect(this.#omit, this.#pick)}.`);
                    }
                    if (hasSame_ts_1.arrayHasSame(this.#omit, rename)) {
                        throw new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'rename': ${intersect_ts_1.arrayBasicIntersect(this.#omit, rename)}.`);
                    }
                    if (hasSame_ts_1.arrayHasSame(this.#omit, replace)) {
                        throw new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'replace': ${intersect_ts_1.arrayBasicIntersect(this.#omit, replace)}.`);
                    }
                    if (hasSame_ts_1.arrayHasSame(this.#omit, this.#required)) {
                        throw new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'required': ${intersect_ts_1.arrayBasicIntersect(this.#omit, this.#required)}.`);
                    }
                    if (hasSame_ts_1.arrayHasSame(this.#omit, transform)) {
                        throw new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'transform': ${intersect_ts_1.arrayBasicIntersect(this.#omit, transform)}.`);
                    }
                    if (hasSame_ts_1.arrayHasSame(cast, replace)) {
                        throw new ValidationError_ts_1.ValidationError(`'cast' has same keys as 'replace': ${intersect_ts_1.arrayBasicIntersect(cast, replace)}.`);
                    }
                    if (hasSame_ts_1.arrayHasSame(cast, transform)) {
                        throw new ValidationError_ts_1.ValidationError(`'cast' has same keys as 'transform': ${intersect_ts_1.arrayBasicIntersect(cast, transform)}.`);
                    }
                    if (hasSame_ts_1.arrayHasSame(replace, transform)) {
                        throw new ValidationError_ts_1.ValidationError(`'replace' has same keys as 'transform': ${intersect_ts_1.arrayBasicIntersect(replace, transform)}.`);
                    }
                    return this;
                }
                /**
                 * @name validateData
                 * @private
                 * @method
                 * @throws Error
                 * @returns {Vicis}
                 */
                validateData() {
                    if (this.#dataOriginal === undefined) {
                        return this;
                    }
                    if ("toObject" in this.#dataOriginal &&
                        function_ts_5.isFunction(this.#dataOriginal.toObject)) {
                        this.#dataCache = this.#dataOriginal.toObject();
                    }
                    else if ("toJSON" in this.#dataOriginal && function_ts_5.isFunction(this.#dataOriginal.toJSON)) {
                        this.#dataCache = this.#dataOriginal.toJSON();
                    }
                    else {
                        this.#dataCache = this.#dataOriginal;
                    }
                    this.#dataCache = omitData_ts_1.omitData(this.#omit, this.#dataCache);
                    this.#dataCache = requiredData_ts_2.requiredData(this.#required, this.#dataCache);
                    this.#dataCache = definedData_ts_2.definedData(this.#defined, this.#dataCache);
                    this.#dataCache = castData_ts_2.castData(this.#cast, this.#dataCache);
                    this.#dataCache = transformData_ts_2.transformData(this.#transform, this.#dataCache);
                    this.#dataCache = replaceData_ts_2.replaceData(this.#replace, this.#dataCache);
                    this.#dataCache = renameData_ts_2.renameData(this.#rename, this.#dataCache);
                    this.#dataCache = defaultsData_ts_2.defaultsData(this.#defaults, this.#dataCache);
                    this.#dataCache = pickData_ts_2.pickData(this.#pick, this.#dataCache);
                    this.#dataCache = excludeData_ts_1.excludeData(this.#exclude, this.#dataCache);
                    this.#dataCache = json_ts_1.castToJson(this.#dataCache, this.#sort);
                    this.#dataCache = orderData_ts_1.orderData(this.#order, this.#dataCache, this.#sort);
                    return this;
                }
                //#endregion
                //#region Static Methods
                /**
                 * @name factory
                 * @public
                 * @static
                 * @factory
                 * @param {Function|Object=} config
                 * @param {Object=} data
                 * @returns {Vicis}
                 */
                static factory(config, data) {
                    return new Vicis(config, data);
                }
                /**
                 * @name from
                 * @public
                 * @static
                 * @throws TypeError
                 * @param {Object} data
                 * @param {Object=} config
                 * @returns {Object}
                 */
                static from(data, config) {
                    return Vicis.factory(config, data).getData();
                }
                /**
                 * @name fromArray
                 * @static
                 * @public
                 * @param {Array.<Object>} collection
                 * @param {Object=} config
                 * @returns {Array.<Object>}
                 */
                static fromArray(collection, config) {
                    const serializer = Vicis.factory(config);
                    return Array.from(collection).map((data) => serializer.data(data).getData());
                }
                /**
                 * @name BOOLEAN
                 * @public
                 * @static
                 * @type {String}
                 */
                static get BOOLEAN() {
                    return ECastType_ts_5.ECastType.BOOLEAN;
                }
                /**
                 * @name FLAG
                 * @public
                 * @static
                 * @type {String}
                 */
                static get FLAG() {
                    return ECastType_ts_5.ECastType.FLAG;
                }
                /**
                 * @name NUMERIC
                 * @public
                 * @static
                 * @type {String}
                 */
                static get NUMERIC() {
                    return ECastType_ts_5.ECastType.NUMERIC;
                }
                /**
                 * @name INTEGER
                 * @public
                 * @static
                 * @type {String}
                 */
                static get INTEGER() {
                    return ECastType_ts_5.ECastType.INTEGER;
                }
                /**
                 * @name STRING
                 * @public
                 * @static
                 * @type {String}
                 */
                static get STRING() {
                    return ECastType_ts_5.ECastType.STRING;
                }
                /**
                 * @name JSON
                 * @public
                 * @static
                 * @type {String}
                 */
                static get JSON() {
                    return ECastType_ts_5.ECastType.JSON;
                }
                //#endregion
                //#region Public Config Methods
                /**
                 * @name getConfig
                 * @public
                 * @returns {Object}
                 */
                getConfig() {
                    return clone_ts_2.clone({
                        cast: this.#cast,
                        defaults: this.#defaults,
                        defined: this.#defined,
                        exclude: this.#exclude,
                        omit: this.#omit,
                        order: this.#order,
                        pick: this.#pick,
                        sort: this.#sort,
                        rename: this.#rename,
                        replace: this.#replace,
                        required: this.#required,
                        transform: this.#transform,
                    });
                }
                /**
                 * @name resetConfig
                 * @public
                 * @returns {Vicis}
                 */
                resetConfig() {
                    this.#cast = {};
                    this.#defaults = {};
                    this.#defined = [];
                    this.#exclude = [];
                    this.#omit = [];
                    this.#order = [];
                    this.#pick = [];
                    this.#sort = ESort_ts_6.ESort.Default;
                    this.#rename = {};
                    this.#replace = {};
                    this.#required = [];
                    this.#transform = {};
                    return this;
                }
                /**
                 * @name testConfig
                 * @public
                 * @static
                 * @throws AggregateError
                 * @param {Function|Object=} config
                 * @returns {Object}
                 * @since 1.6.0
                 */
                static testConfig(config) {
                    let configFull;
                    if (function_ts_5.isFunction(config)) {
                        configFull = functionToConfig_ts_1.convertFunctionToConfig(config);
                    }
                    else {
                        configFull = config;
                    }
                    if (!isObjectLike_ts_6.checkIsObjectLike(configFull)) {
                        throw new AggregateError_ts_1.AggregateError([new TypeError("Config should be an object")], "Configuration has errors");
                    }
                    const diff = difference_ts_1.arrayGetDifference(keys_ts_3.objectGetKeys(configFull), CONFIG_FIELDS_ts_1.CONFIG_FIELDS);
                    if (diff.length) {
                        throw new AggregateError_ts_1.AggregateError([new TypeError(`Config has unknown fields: '${diff.join("', '")}'.`)], "Configuration has errors");
                    }
                    const cast = keys_ts_3.objectGetKeys(property_ts_1.objectGetProperty(configFull, "cast", {}));
                    const rename = keys_ts_3.objectGetKeys(property_ts_1.objectGetProperty(configFull, "rename", {}));
                    const replace = keys_ts_3.objectGetKeys(property_ts_1.objectGetProperty(configFull, "replace", {}));
                    const transform = keys_ts_3.objectGetKeys(property_ts_1.objectGetProperty(configFull, "transform", {}));
                    const errors = [];
                    if ("omit" in configFull && hasSame_ts_1.arrayHasSame(configFull.omit, cast)) {
                        errors.push(new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'cast': ${intersect_ts_1.arrayBasicIntersect(configFull.omit, cast)}.`));
                    }
                    if ("omit" in configFull && "defined" in configFull &&
                        hasSame_ts_1.arrayHasSame(configFull.omit, configFull.defined)) {
                        errors.push(new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'defined': ${intersect_ts_1.arrayBasicIntersect(configFull.omit, configFull.defined)}.`));
                    }
                    if ("omit" in configFull && "pick" in configFull &&
                        hasSame_ts_1.arrayHasSame(configFull.omit, configFull.pick)) {
                        errors.push(new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'pick': ${intersect_ts_1.arrayBasicIntersect(configFull.omit, configFull.pick)}.`));
                    }
                    if ("omit" in configFull && hasSame_ts_1.arrayHasSame(configFull.omit, rename)) {
                        errors.push(new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'rename': ${intersect_ts_1.arrayBasicIntersect(configFull.omit, rename)}.`));
                    }
                    if ("omit" in configFull && hasSame_ts_1.arrayHasSame(configFull.omit, replace)) {
                        errors.push(new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'replace': ${intersect_ts_1.arrayBasicIntersect(configFull.omit, replace)}.`));
                    }
                    if ("omit" in configFull && "required" in configFull &&
                        hasSame_ts_1.arrayHasSame(configFull.omit, configFull.required)) {
                        errors.push(new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'required': ${intersect_ts_1.arrayBasicIntersect(configFull.omit, configFull.required)}.`));
                    }
                    if ("omit" in configFull && hasSame_ts_1.arrayHasSame(configFull.omit, transform)) {
                        errors.push(new ValidationError_ts_1.ValidationError(`'omit' has same keys as 'transform': ${intersect_ts_1.arrayBasicIntersect(configFull.omit, transform)}.`));
                    }
                    if (hasSame_ts_1.arrayHasSame(cast, replace)) {
                        errors.push(new ValidationError_ts_1.ValidationError(`'cast' has same keys as 'replace': ${intersect_ts_1.arrayBasicIntersect(cast, replace)}.`));
                    }
                    if (hasSame_ts_1.arrayHasSame(cast, transform)) {
                        errors.push(new ValidationError_ts_1.ValidationError(`'cast' has same keys as 'transform': ${intersect_ts_1.arrayBasicIntersect(cast, transform)}.`));
                    }
                    if (hasSame_ts_1.arrayHasSame(replace, transform)) {
                        errors.push(new ValidationError_ts_1.ValidationError(`'replace' has same keys as 'transform': ${intersect_ts_1.arrayBasicIntersect(replace, transform)}.`));
                    }
                    if (errors.length) {
                        throw new AggregateError_ts_1.AggregateError(errors, [
                            "Configuration has errors.",
                            ...errors.map((error, index) => `${index + 1}). ${error.message}`),
                        ].join("\n"));
                    }
                    return { ...configFull };
                }
                /**
                 * @name config
                 * @public
                 * @throws AggregateError|TypeError
                 * @param {Function|Object=} config
                 * @returns {Vicis}
                 */
                config(config = {}) {
                    let configFull;
                    if (function_ts_5.isFunction(config)) {
                        configFull = functionToConfig_ts_1.convertFunctionToConfig(config);
                    }
                    else {
                        configFull = config;
                    }
                    if (!isObjectLike_ts_6.checkIsObjectLike(configFull)) {
                        throw new TypeError("Config should be an object");
                    }
                    const diff = difference_ts_1.arrayGetDifference(keys_ts_3.objectGetKeys(configFull), CONFIG_FIELDS_ts_1.CONFIG_FIELDS);
                    if (diff.length) {
                        throw new TypeError(`Config has unknown fields: '${diff.join("', '")}'.`);
                    }
                    Vicis.testConfig(configFull);
                    this.resetConfig();
                    this.sort(configFull.sort);
                    this.omit(configFull.omit);
                    this.cast(configFull.cast);
                    this.defined(configFull.defined);
                    this.pick(configFull.pick);
                    this.rename(configFull.rename);
                    this.replace(configFull.replace);
                    this.required(configFull.required);
                    this.transform(configFull.transform);
                    this.defaults(configFull.defaults);
                    this.exclude(configFull.exclude);
                    this.order(configFull.order);
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                /**
                 * @name cast
                 * @public
                 * @throws TypeError
                 * @param {Object=} propertyToType
                 * @returns {Vicis}
                 */
                cast(propertyToType = {}) {
                    this.#cast = castConfig_ts_2.castConfig(propertyToType);
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                /**
                 * @name defaults
                 * @public
                 * @throws TypeError
                 * @param {Object=} propertyDefaultValues
                 * @returns {Vicis}
                 */
                defaults(propertyDefaultValues = {}) {
                    this.#defaults = defaultsConfig_ts_2.defaultsConfig(propertyDefaultValues); // do not deep clone!
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                /**
                 * @name defined
                 * @public
                 * @throws TypeError
                 * @param {Array.<string>=} propertiesMustBeDefined
                 * @returns {Vicis}
                 */
                defined(propertiesMustBeDefined = []) {
                    this.#defined = definedConfig_ts_2.definedConfig(propertiesMustBeDefined);
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                /**
                 * @name exclude
                 * @public
                 * @throws TypeError
                 * @param {Array.<string|RegExp>=} propertiesToExclude
                 * @returns {Vicis}
                 */
                exclude(propertiesToExclude = []) {
                    this.#exclude = excludeConfig_ts_2.excludeConfig(propertiesToExclude);
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                /**
                 * @name omit
                 * @public
                 * @throws TypeError
                 * @param {Array.<string>=} propertiesToOmit
                 * @returns {Vicis}
                 */
                omit(propertiesToOmit = []) {
                    this.#omit = omitConfig_ts_2.omitConfig(propertiesToOmit);
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                /**
                 * @name order
                 * @public
                 * @throws TypeError
                 * @param {Array.<string>=} propertiesToStreamline
                 * @returns {Vicis}
                 */
                order(propertiesToStreamline = []) {
                    this.#order = orderConfig_ts_2.orderConfig(propertiesToStreamline);
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                /**
                 * @name pick
                 * @public
                 * @throws TypeError
                 * @param {Array.<string>=} propertiesToPick
                 * @returns {Vicis}
                 */
                pick(propertiesToPick = []) {
                    this.#pick = pickConfig_ts_2.pickConfig(propertiesToPick);
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                /**
                 * @name rename
                 * @public
                 * @throws TypeError
                 * @param {Object=} renamePropertyFromTo
                 * @returns {Vicis}
                 */
                rename(renamePropertyFromTo = {}) {
                    this.#rename = renameConfig_ts_2.renameConfig(renamePropertyFromTo);
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                /**
                 * @name replace
                 * @public
                 * @throws TypeError
                 * @param {Object=} replacePropertyValues
                 * @returns {Vicis}
                 */
                replace(replacePropertyValues = {}) {
                    this.#replace = replaceConfig_ts_2.replaceConfig(replacePropertyValues); // do not deep clone!
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                /**
                 * @name required
                 * @public
                 * @throws TypeError
                 * @param {Array.<string>=} propertiesRequired
                 * @returns {Vicis}
                 */
                required(propertiesRequired = []) {
                    this.#required = requiredConfig_ts_2.requiredConfig(propertiesRequired);
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                /**
                 * @name sort
                 * @public
                 * @throws TypeError
                 * @param {boolean=} sortProperties
                 * @returns {Vicis}
                 */
                sort(sortProperties = ESort_ts_6.ESort.Default) {
                    if (typeof sortProperties !== "boolean" && !(Object.values(ESort_ts_6.ESort).includes(sortProperties))) {
                        throw new TypeError("'sort' should be a boolean");
                    }
                    if (sortAsBoolean_ts_4.sortAsBoolean(sortProperties)) {
                        this.#sort = ESort_ts_6.ESort.Yes;
                    }
                    else {
                        this.#sort = ESort_ts_6.ESort.No;
                    }
                    this.validateData();
                    return this;
                }
                /**
                 * @name transform
                 * @public
                 * @throws TypeError
                 * @param {Object=} propertyValueTransformWith
                 * @returns {Vicis}
                 */
                transform(propertyValueTransformWith = {}) {
                    this.#transform = transformConfig_ts_2.transformConfig(propertyValueTransformWith); // do not deep clone!
                    this.validateConfig();
                    this.validateData();
                    return this;
                }
                //#endregion
                //#region Public Data Methods
                /**
                 * @name getData
                 * @public
                 * @returns {Object}
                 */
                getData() {
                    return clone_ts_2.clone(this.#dataCache);
                }
                /**
                 * @name data
                 * @public
                 * @throws TypeError
                 * @param {Object} dataToSerialize
                 * @returns {Vicis}
                 */
                data(dataToSerialize) {
                    if (!isObjectLike_ts_6.checkIsObjectLike(dataToSerialize)) {
                        throw new TypeError("Data should be an object");
                    }
                    this.#dataOriginal = dataToSerialize; // keep reference
                    this.validateData();
                    return this;
                }
                /**
                 * @name clear
                 * @description Clear any data references and cached values
                 * @public
                 * @returns {Vicis}
                 */
                clear() {
                    this.#dataCache = createEmpty_ts_2.objectCreateEmpty();
                    this.#dataOriginal = undefined;
                    return this;
                }
                //#endregion
                //#region Public Main Methods
                /**
                 * @name toJSON
                 * @public
                 * @returns {Object}
                 */
                toJSON() {
                    return this.getData();
                }
                /**
                 * @name toString
                 * @public
                 * @returns {string}
                 */
                toString() {
                    return stringify_ts_11.jsonStringify(this.toJSON());
                }
                /**
                 * @name fromArray
                 * @public
                 * @param {Array.<Object>} collection
                 * @returns {Array.<Object>}
                 */
                fromArray(collection) {
                    return Array.from(collection).map((data) => this.data(data).toJSON());
                }
            };
            exports_88("Vicis", Vicis);
        }
    };
});
System.register("mod", ["src/const/CAST_TYPE", "src/core/cast/cast", "src/core/defaults/defaults", "src/core/defined/defined", "src/core/exclude/exclude", "src/core/omit/omit", "src/core/order/order", "src/core/pick/pick", "src/core/rename/rename", "src/core/replace/replace", "src/core/required/required", "src/core/transform/transform", "src/core/class/Vicis"], function (exports_89, context_89) {
    "use strict";
    var __moduleName = context_89 && context_89.id;
    return {
        setters: [
            function (CAST_TYPE_ts_1_1) {
                exports_89({
                    "CAST_TYPE": CAST_TYPE_ts_1_1["CAST_TYPE"]
                });
            },
            function (cast_ts_1_1) {
                exports_89({
                    "cast": cast_ts_1_1["cast"]
                });
            },
            function (defaults_ts_1_1) {
                exports_89({
                    "defaults": defaults_ts_1_1["defaults"]
                });
            },
            function (defined_ts_1_1) {
                exports_89({
                    "defined": defined_ts_1_1["defined"]
                });
            },
            function (exclude_ts_1_1) {
                exports_89({
                    "exclude": exclude_ts_1_1["exclude"]
                });
            },
            function (omit_ts_1_1) {
                exports_89({
                    "omit": omit_ts_1_1["omit"]
                });
            },
            function (order_ts_3_1) {
                exports_89({
                    "order": order_ts_3_1["order"]
                });
            },
            function (pick_ts_1_1) {
                exports_89({
                    "pick": pick_ts_1_1["pick"]
                });
            },
            function (rename_ts_1_1) {
                exports_89({
                    "rename": rename_ts_1_1["rename"]
                });
            },
            function (replace_ts_1_1) {
                exports_89({
                    "replace": replace_ts_1_1["replace"]
                });
            },
            function (required_ts_1_1) {
                exports_89({
                    "required": required_ts_1_1["required"]
                });
            },
            function (transform_ts_1_1) {
                exports_89({
                    "transform": transform_ts_1_1["transform"]
                });
            },
            function (Vicis_ts_1_1) {
                exports_89({
                    "Vicis": Vicis_ts_1_1["Vicis"]
                });
            }
        ],
        execute: function () {
        }
    };
});

const __exp = __instantiate("mod");
export const CAST_TYPE = __exp["CAST_TYPE"];
export const cast = __exp["cast"];
export const defaults = __exp["defaults"];
export const defined = __exp["defined"];
export const exclude = __exp["exclude"];
export const omit = __exp["omit"];
export const order = __exp["order"];
export const pick = __exp["pick"];
export const rename = __exp["rename"];
export const replace = __exp["replace"];
export const required = __exp["required"];
export const transform = __exp["transform"];
export const Vicis = __exp["Vicis"];
