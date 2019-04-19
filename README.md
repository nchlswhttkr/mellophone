# Mellophone

[![](https://gitlab.com/nchlswhttkr/mellophone/badges/master/build.svg)](https://gitlab.com/nchlswhttkr/mellophone/pipelines)

:trumpet: :trumpet: :trumpet:

An app for teams, at the moment for writing and sharing meeting minutes.

## Contributing

Contributions are welcome! Please be respectful in your interactions with other contributors.

For a guide on getting Mellophone running locally, please see the [Getting Started](#getting-started) section.

## Getting Started

### Frontend

To run the frontend you will need [Yarn](https://yarnpkg.org/) (as well as [Node](https://nodejs.org/)). Being familiar with how a React app built using [create-react-app](https://facebook.github.io/create-react-app/docs/) works is beneficial too.

To set up the frontend, you will need to install its dependencies and start the development server.

```
cd mellophone/frontend
yarn
yarn start
```

Here are some common commands you might find yourself running.

| Command           | Action                                                                             |
| ----------------- | ---------------------------------------------------------------------------------- |
| yarn              | Install dependencies (and ensure all dependencies are up to date with `yarn.lock`) |
| yarn start        | Run a development server                                                           |
| yarn build        | Create a production build (if you want to run the backend with a static frontend)  |
| yarn test         | Run unit and integration tests of the frontend code                                |
| yarn lint         | Check for linting issues                                                           |
| yarn lint --write | Check for and fix any linting issues                                               |

### Backend

To set up the backend you will need [pipenv](https://pipenv.readthedocs.io/en/latest/) and [Postgres (10)](https://www.postgresql.org/download/).

```
pipenv install --dev
```

Installing Postgres will usually create a 'postgres' user (recommended practice) and a server, but for the sake of understanding and visibility I currently run everything from within the project directory. You should also make sure the Postgres binaries are installed in your PATH (`initdb`, `pg_ctl` are two you'll need).

To create the database and start running its server, you can use the following commands. This will use the `/data` directory, creating a default installation (default name, user, password) that we will use in development.

```
pipenv run db-init
pipenv run db-start
```

If you receive an error about the port already being in use, this is likely because the default Postgres server is running - try stopping it with `pg_ctl -D /Library/PostgreSQL/10/data stop` (or wherever Postgres is installed on your computer).

Now that the database is up and running, we can set up Django and run migrations against the database. After this has completed we can run the backend server.

If you want to interact with the backend through the frontend, make sure you have [created a production build of the frontend](#frontend).

```
pipenv run db-migrate
pipenv run server
```

After you have finished making changes, you can stop the database server.

```
pipenv run db-stop
```

You can find a summary of commands below

| Command               | Action                                                                                |
| --------------------- | ------------------------------------------------------------------------------------- |
| pipenv install        | Install dependencies (and ensure all dependencies are up to date with `Pipfile.lock`) |
| pipenv install --dev  | As above, but also include dev dependencies, such as linting/testing libraries        |
| pipevn run db-init    | Create the Postgres database                                                          |
| pipenv run db-start   | Start the Postgres server                                                             |
| pipenv run db-stop    | Stop the Postgres server                                                              |
| pipenv run db-migrate | Apply new migrates to the database (must be running at this time)                     |
| pipenv run server     | Run the backend (a Django server)                                                     |
| pipenv run lint       | Lint using pylint (just defaults for now)                                             |
| pipenv run test-unit  | Run tests against the backend (the database must be running)                          |
| pipenv run test-e2e   | Run an end-to-end test (requires that you've [built the frontend](#frontend)) \*      |

\* _You'll need Geckodriver and Firefox installed, or you can use the `Dockerfile` of this project as a starting point._
