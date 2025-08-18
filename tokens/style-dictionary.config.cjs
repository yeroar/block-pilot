/* eslint-disable */
const StyleDictionary = require("style-dictionary");
const tokensStudio = require("@tokens-studio/sd-transforms");

tokensStudio.register(StyleDictionary);

// "12" -> 12, "12px" -> 12 (deep)
const pxToNumber = (v) =>
  typeof v === "string" && v.trim().endsWith("px") && !isNaN(parseFloat(v))
    ? parseFloat(v)
    : v;
const numericStrToNumber = (v) =>
  typeof v === "string" && /^-?\d+(\.\d+)?$/.test(v.trim()) ? Number(v) : v;
const deepNumberify = (val) => {
  if (Array.isArray(val)) return val.map(deepNumberify);
  if (val && typeof val === "object") {
    const out = {};
    for (const [k, v] of Object.entries(val)) out[k] = deepNumberify(v);
    return out;
  }
  return numericStrToNumber(pxToNumber(val));
};

StyleDictionary.registerTransform({
  name: "value/numberify",
  type: "value",
  transitive: true,
  matcher: () => true,
  transformer: (token) => deepNumberify(token.value),
});

module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    reactNative: {
      transforms: [
        "ts/resolveMath",
        "ts/size/px",
        "ts/opacity",
        "ts/typography",
        "ts/shadow",
        "ts/composeColor",
        "name/cti/pascal",
        "value/numberify", // must run after typography/size
      ],
      buildPath: "generated-tokens/",
      files: [
        {
          destination: "tokens.ts",
          format: "javascript/es6",
          options: { outputReferences: true },
        },
      ],
    },
  },
};
