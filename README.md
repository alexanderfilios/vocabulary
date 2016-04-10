[![Build Status](https://travis-ci.org/r-park/angular2-webpack-seed.svg?branch=master)](https://travis-ci.org/r-park/angular2-webpack-seed)


# Angular2 Webpack Seed

- Angular2
- Jasmine
- Karma
- SASS
- Typescript
- Webpack
- Webpack Development Server


#### Features
- Inline external HTML templates into typescript component files (optional)
- Inline and autoprefix external SCSS files into typescript component files (optional)
- Inject style tags into `index.html` (optional)
- Inject script tags into `index.html`
- Bundle and minify release builds


Getting Started
---------------

#### Prerequisites
- `node >=5.10`

#### Installing Dependencies
```shell
$ npm install
$ npm run typings
```


Usage
-----

|Script|Description|
|---|---|
|`npm start`|Start the Webpack DevServer at `localhost:3000`|
|`npm run build`|Lint, test, and build the application to `./target`|
|`npm run dev`|Same as `npm start`|
|`npm run lint`|Lint `.ts` files using tslint|
|`npm test`|Run unit tests with Karma and Jasmine|
|`npm run test:watch`|Run unit tests with Karma and Jasmine; watch for changes to re-run tests|
|`npm run typings`|Install ambient typings|
|`npm version`|Bump package.json version, generate CHANGELOG.md, git commit and tag (see [npm version](https://docs.npmjs.com/cli/version))|
