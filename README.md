# Clarity #

## Getting started ##

### Set up ###

1. Clone this repo, and then in the root directory create a `.env` file containing:

```shell
# Postgres url
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:PORT/DB_NAME

# Host and port on which to run the app
PORT=4000
HOST=localhost

# Environment affects the config
NODE_ENV=local-develop

# Facebook Passport config (go to developers.facebook.com)
FB_CLIENT_ID=xxxxx
FB_CLIENT_SECRET=xxxxx
FB_CALLBACK_URL=http://localhost:4000/auth/facebook/callback

# Sentry error tracking config
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

2. Run the initial migration to get your development db in the correct state:

```shell
sequelize db:migrate:undo:all && sequelize db:migrate
```

### Sublime Text ###

**JsPrettier** – This project's CI enforces formatting rules across the codebase with [Prettier](https://github.com/prettier/prettier). To avoid unecessary conflicts and failures when running PRs against CI, it's nice to use the Sublime Text plugin [JsPrettier](https://packagecontrol.io/packages/JsPrettier), which autoformats to the rules on save This has the added bonus of allowing you to ignore formatting your code as you write it, which can be an obnoxious time sink. You can find the JsPrettier config [here](https://gist.github.com/devonzuegel/37a8b58ec66595a9aedc11227e4bb84e).

## Structure ##

![](https://cdn-images-1.medium.com/max/1600/1*cr8plxsbWE--Xgk_No5yiw.png)

### Tests ###

Unit and integration test files are named `module-name.ut.ts` and `module-name.it.ts`, respectively. They are co-located with the module they test. For instance, utilities for formatting dates can be found in `utils/date`, and the unit tests that exercise these helpers are in `utils/date.ut`. Mocks are defined in files named `module-name.mock.ts`.

Functional tests and corresponding test helpers can be found in `test/functional`. At some point, I'd like to consolidate these into the same naming convention as the unit and integration tests, by having them in `module-name.ft.ts`, but NightmareJS was flakey as hell and it wasn't worth the effort at the time. Someday...

Here's a useful post about the definitions of each test type and finding the boundaries between them: https://hackernoon.com/low-effort-high-value-integration-tests-in-redux-apps-d3a590bd9fd5. 

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

### Linting ###

There are several linting rules that can cause CI to fail. Here's a non-comprehensive list (you can find the rest [here](https://github.com/devonzuegel/clarity/blob/a3d5ba5c16a724712b04a18d3c528b4e2ff159a9/tasks/index.js#L9)):

- Files don't conform to the [Prettier](https://github.com/prettier/prettier) code formatter 
    - More info about setting up JsPrettier for Sublime above in "Set up"
- Files contain `console.*`
    - The default console logger should only be used in debugging/development, so this ensures that they're cleaned up before committing to master
    - If you need a real logger, use [`Hermes`](https://github.com/devonzuegel/clarity/blob/a3d5ba5c16a724712b04a18d3c528b4e2ff159a9/utils/hermes.ts).
- Files contain `express()` or `bodyParser` outside of the `http/newApp` module
    - New express servers will nearly always require certain plugins and configuration, so this check ensures that any new server instances will use the pre-packaged `newApp`, which handles all that for you

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

## Live environments ##

Periodically, we'll want to reset the database for [clarity-develop.herokuapp.com](http://clarity-develop.herokuapp.com/posts):

```
heroku run "sequelize db:migrate:undo:all && sequelize db:migrate" --app clarity-develop
```

## Monitoring ##

Clarity uses New Relic for monitoring. Here are the dashboards for each environment:

- [heroku-develop](https://rpm.newrelic.com/accounts/1701476/applications/61929219)
- [heroku-tests](https://rpm.newrelic.com/accounts/1701480/applications/68554775)
- [heroku-stage](https://rpm.newrelic.com/accounts/1701472/applications/79623351)
- [heroku-live](https://rpm.newrelic.com/accounts/1681091/applications/79621388)

New Relic also provides the benefit of keeping the app awake. Heroku's free tier puts apps to sleep after an hour of inactivity. When your app is asleep, the next user to access any of its resources will have to wait while  the app spins up, resulting in a suboptimal user experience. To keep the app awake, New Relic pings the app constantly. (This comes "for free" with constant monitoring, because monitoring for uptime is basically just sending pings to the server and seieng the result.)


