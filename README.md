# Clarity #

## Set up ##

1. Clone this repo, and then in the root directory create a `.env` file containing:

```shell
# Postgres url
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:PORT/DB_NAME

# Host and port on which to run the app
PORT=4000
HOST=localhost

# Environment affects the config
NODE_ENV=local-develop
```

2. Run the initial migration to get your development db in the correct state:

```shell
sequelize db:migrate:undo:all && sequelize db:migrate
```

## Testing ##

1. [Install the Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html) and set up Selenium.

    ```sh
    yarn
    brew install selenium-server-standalone
    brew install chromedriver
    ```

2. Start the Selenium server and your local dev server.

    ```sh
    # In separate terminal windows
    selenium-server
    yarn start
    ```

3. Run Nightwatch.

    ```sh
    nightwatch --config nightwatch.js # Run all tests
    nightwatch --config nightwatch.js test/functional/myTest.js # Run one test
    ```

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

## Deploying ##

### Develop [clarity-develop.herokuapp.com](http://clarity-develop.herokuapp.com/posts) ###

Periodically, we'll want to reset the database for [clarity-develop](http://clarity-develop.herokuapp.com/posts):

```
heroku run "sequelize db:migrate:undo:all && sequelize db:migrate" --app clarity-develop
```
