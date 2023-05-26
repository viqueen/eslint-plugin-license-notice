## eslint-plugin

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=viqueen_eslint-plugin-license-notice&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=viqueen_eslint-plugin-license-notice)
[![npm version](https://badge.fury.io/js/eslint-plugin-license-notice.svg)](https://badge.fury.io/js/eslint-plugin-license-notice)

A collection of eslint rules needed to ensure **labset** open-source packages are structured in a consistent way.

It comes with:

- `license-notice` rule to enforce all source files include the relevant license header notice

### install it

- with **npm**

```bash
npm install @labset-eslint/eslint-plugin --save-dev
```

- with **yarn**

```bash
yarn add @labset-eslint/eslint-plugin -D -W
```

### use it

- add the eslint plugin to your `.eslintrc.js`

```javascript
module.exports = {
    ...,
    plugins: [
        '@labset-eslint/eslint-plugin',
    ],
    rules: {
        '@labset-eslint/license-notice': [
            'error', {
                license: 'Apache-2.0',
                copyRightYear: '<year>',
                copyRightName: '<name>'
            }
        ]
    }
}
```
