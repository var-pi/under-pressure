module.exports = {
  root: true,
  env: {
    node: true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "plugins": ["vue", "@typescript-eslint"],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",    
    "vue/html-self-closing": ["warn", {
      "html": {
        "void": "always",
        "normal": "never",
        "component": "any"
      },
      "svg": "always",
      "math": "always"
    }],
    "vue/max-attributes-per-line": ["warn", {
      "singleline": {
        "max": 3
      },      
      "multiline": {
        "max": 1
      }
    }],
    "vue/singleline-html-element-content-newline": ["warn", {
      "ignoreWhenNoAttributes": true,
      "ignoreWhenEmpty": true,
      "ignores": ["pre", "textarea"],
    }],
    "vue/html-closing-bracket-newline": ["warn", {
      "singleline": "never",
      "multiline": "never",
    }],
    "@typescript-eslint/ban-types": ["warn",
    {
        "types": {
            "String": true,
        },
        "extendDefaults": true
    }
]
  }
}
