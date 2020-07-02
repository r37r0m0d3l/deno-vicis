![Vicis](.github/assets/banner.webp?raw=true "Vicis")

# « Vicis 🧮 🦕 »

Presentation and transformation layer for data output in RESTful APIs.

•• [Vicis Documentation](https://vicis.js.org) •• [JavaScript Repository](https://github.com/r37r0m0d3l/vicis) •• [Deno Repository](https://github.com/r37r0m0d3l/deno-vicis) ••

This is Deno analogue to these libraries: 🐘 [Fractal](https://fractal.thephpleague.com/) for PHP, 💎 [Roar](https://github.com/trailblazer/roar) for Ruby, 🍢 [Marshmallow](https://marshmallow.readthedocs.io/en/stable/) for Python.

[![Buy Me A Coffee][buymeacoffee-img]][buymeacoffee-url]
![Tests](https://github.com/r37r0m0d3l/denof/workflows/Tests/badge.svg)

---

## 💬 Tl;dr

Code:

```js
import { Vicis } from "vicis";
const configuration = {
  cast: { _id: Vicis.INTEGER, registered: Vicis.FLAG },
  defaults: { confirmed: false },
  exclude: [/(?:password)/gi, /^(?:_)(?:_)?/],
  omit: ["createdAt", "updatedAt", "deletedAt"],
  rename: { _id: "id", email: "login" },
  replace: { url: null }
};
const model = {
  _id: "54759309034942804",
  email: "johnwick@gmail.com",
  userPassword: "36e80092ff7f1ed72903cda9409b9d2c",
  registered: "1",
  url: "example.com",
  createdAt: "2020-01-01 01:23:45",
  __v: 1
};
const serializer = new Vicis(configuration);
serializer.data(model);
console.log(serializer.getData());
```

Output:

```json
{
  "confirmed": false,
  "id": 54759309034942804,
  "login": "johnwick@gmail.com",
  "registered": true,
  "url": null
}
```

## ⚙️Installation

### Inline

```javascript
import { Vicis } from "https://deno.land/x/vicis/mod.ts";
```

### "importmap.json"

#### GitHub

```json
{
  "imports": {
    "vicis": "https://raw.githubusercontent.com/r37r0m0d3l/deno-vicis/master/mod.ts"
  }
}
```

#### DenoLand

```json
{
  "imports": {
    "vicis": "https://deno.land/x/vicis/mod.ts"
  }
}
```

```bash
deno run --importmap=importmap.json --unstable your-script.js
```

## 🗺️ My other projects

[Full list here](https://r37r0m0d3l.icu/open_source_map)

<img src="https://raw.githubusercontent.com/r37r0m0d3l/r37r0m0d3l/master/osmap.svg" width="960" height="520" style="display:block;height:auto;margin-left:auto;margin-right:auto;min-height:520px;min-width:960px;width:100%;">

<!-- Badges -->

[buymeacoffee-url]: https://buymeacoffee.com/r37r0m0d3l
[buymeacoffee-img]: https://img.shields.io/badge/support-buymeacoffee-1E90FF.svg?&logo=buy-me-a-coffee&label=support
