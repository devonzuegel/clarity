# Clarity #

## Development ##

- `yarn build`:      Build development server (outputs into `/build`)
- `yarn build:prod`: Build release  (outputs into `/dist`)
- `yarn lint`:       Lint all Typescript files
- `yarn pretest`:    Run linter as part of test script
- `yarn test`:       More info on Jest config below
- `yarn test:watch`: Run Jest in watch mode
- `yarn prestart`:   Bundle the server with development environment before start script
- `yarn start`:      Run development server
- `yarn start:prod`: Run production server


## Build System ##

- Clarity's Webpack configuration is written in Typescript. By enforcing types in our build system, we can avoid a lot of the mistakes that are famously easy to make when using Webpack.
