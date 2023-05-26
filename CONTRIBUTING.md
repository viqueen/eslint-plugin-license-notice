### environment

- **[nvm](https://github.com/nvm-sh/nvm)** to manage node versions.

```bash
brew install nvm
```

- **[yarn](https://yarnpkg.com/)** as node package manager

```bash
brew install yarn
```

### development

- build it, this ensures the text templates are copied to the dist folder

```bash
yarn build
```

- link it locally

```bash
yarn link
```

- build it in watch mode

```bash
yarn build --watch
```

- test your local changes on your other packages

```bash
cd my-other-package
yarn link @labset-eslint/eslint-plugin
```

### house-keeping

- build it

```bash
yarn build
```

- format it

```bash
yarn format
```

- lint it

```bash
yarn lint
yarn lint --fix
```

- test it

```bash
yarn test
```
