module.exports = {
  "extends": ["stylelint-config-standard-scss"],
  "plugins": ["stylelint-scss"],
  "rules": {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "no-descending-specificity": null,
    "indentation": 2,
    "scss/dollar-variable-pattern": [/[a-z][a-zA-Z]+/], // Prevent: Expected variable to be kebab-case  scss/dollar-variable-pattern
    "selector-class-pattern": null,
  },
  "ignoreFiles": []
}
