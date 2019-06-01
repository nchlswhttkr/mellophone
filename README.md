# Mellophone

[![](https://gitlab.com/nchlswhttkr/mellophone/badges/master/build.svg?style=flat-square)](https://gitlab.com/nchlswhttkr/mellophone/pipelines)

:trumpet: :trumpet: :trumpet:

An app for teams, allowing them to write and share meeting minutes.

I started this project to implement what I've learned over the past few years, and to explore new technologies and libraries that interest me. Striving for good, readable code is nice, but there's nothing wrong with [having a little fun](/mellophone/frontend/src/utils/Route.ts#L7) from time to time.

https://mellophone.pink

## Contributing

Contributions are welcome! Please be respectful in your interactions with other contributors.

For a guide on getting Mellophone running locally, please see the [Getting Started](#getting-started) section.

## Getting Started

### Frontend

To run the frontend you will need [Yarn](https://yarnpkg.org/) (as well as [Node](https://nodejs.org/)). Being familiar with how a React app built using [create-react-app](https://facebook.github.io/create-react-app/docs/) works is beneficial too.

To set up the frontend, you will need to install its dependencies and start the development server.

```sh
cd mellophone/frontend
yarn
yarn start
```

Chances are you'll need to run the backend as well. If you're not interested in [developing on the backend](#backend), you can use the following script to start a backend server to connect to. You will need to have [Docker Compose](https://docs.docker.com/install/) installed.

```sh
sh scripts/run-backend.sh
```

Below are some common commands you might run. Remember you will need to be in the frontend root (`/mellophone/frontend`). You might wish to consult the [yarn docs](https://yarnpkg.com/lang/en/docs/cli/) or the [package.json itself](/mellophone/frontend/package.json)

| Command           | Action                                                                             |
| ----------------- | ---------------------------------------------------------------------------------- |
| yarn              | Install dependencies (and ensure all dependencies are up to date with `yarn.lock`) |
| yarn start        | Run a development server                                                           |
| yarn build        | Create a production build (if you want to run the backend with a static frontend)  |
| yarn test         | Run tests against the frontend code                                                |
| yarn lint         | Run code style and type checks                                                     |
| yarn lint --write | Run code style and type checks, fixing where possible                              |

### Backend

To set up the backend you will need [Docker Compose](https://docs.docker.com/install/) installed.

```sh
pipenv sync --dev
```

From here, you can start and stop the PostgreSQL server as needed.

```sh
docker-compose up -d db
docker-compose stop db
```

To start working on the backend, it's recommended you work from inside the development container.

```sh
docker-compose run -p 8000:8000 dev
```

If you want to interact with the backend through the frontend but don't want to install and build the frontend, you can install the latest build on the `master` branch. You can use the `get-frontend-build.sh` script to accomplish this.

```sh
# docker-compose run -p 8000:8000 dev
sh scripts/get-frontend-build.sh
```

Now you can start the backend server in development mode, and interact with it at [localhost:8000](http://localhost:8000). Before running the server, it is a good idea to apply any new database migrations.

```sh
# docker-compose run -p 8000:8000 dev
pipenv run migrate
pipenv run server
```

Below are some common commands you might run. You might also wish to consult the [pipenv docs](https://pipenv.readthedocs.io/en/latest#pipenv-usage) and the [Pipefile itself](/Pipfile).

| Command              | Action                                                                                |
| -------------------- | ------------------------------------------------------------------------------------- |
| pipenv sync          | Install dependencies (and ensure all dependencies are up to date with `Pipfile.lock`) |
| pipenv sync --dev    | As above, but also include dev dependencies, such as linting/testing libraries        |
| pipenv run migrate   | Apply new migrations to the database (must be running at this time)                   |
| pipenv run server    | Run the backend (a Django server)                                                     |
| pipenv run lint      | Lint using pylint (just defaults for now)                                             |
| pipenv run test-unit | Run tests against the backend (the database must be running)                          |
| pipenv run test-e2e  | Run an end-to-end test (requires that you've [built the frontend](#frontend)) \*      |

\* _Currently still under development - You'll need Geckodriver and Firefox installed, you can try adapting this from an [older version of this project's Dockerfile](https://github.com/nchlswhttkr/mellophone/blob/55f9d5eb4cb1514ebf6b9a6193e687959b3dcfa7/Dockerfile#L23) if you are unsure about what to do._
