module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    js: {
      transformGroup: "js",
      buildPath: "generated-tokens/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6",
        },
      ],
    },
    web: {
      transformGroup: "web",
      buildPath: "build/web/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
    ios: {
      transformGroup: "ios",
      buildPath: "build/ios/",
      files: [
        {
          destination: "StyleDictionary.swift",
          format: "ios-swift/class.swift",
        },
      ],
    },
    android: {
      transformGroup: "android",
      buildPath: "build/android/",
      files: [
        {
          destination: "style_dictionary.xml",
          format: "android/resources",
        },
      ],
    },
  },
};
