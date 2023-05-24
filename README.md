## eslint-plugin-license-notice

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=viqueen_eslint-plugin-license-notice&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=viqueen_eslint-plugin-license-notice)
[![npm version](https://badge.fury.io/js/eslint-plugin-license-notice.svg)](https://badge.fury.io/js/eslint-plugin-license-notice)

Ensure all your source files include the relevant license header notice

### install it

- with **npm**

```bash
npm install eslint-plugin-license-notice --save-dev
```

- with **yarn**

```bash
yarn add eslint-plugin-license-notice -D -W
```

### use it

- add the eslint plugin to your `.eslintrc.js`

```javascript
module.exports = {
    ...,
    plugins: [
        'license-notice',
    ],
    rules: {
        'license-notice/include': [
            'error', {
                license: 'Apache-2.0',
                copyRightYear: '<year>',
                copyRightName: '<name>'
            }
        ]
    }
}
```
