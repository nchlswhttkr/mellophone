I'm putting Mellophone on the shelf for now, but you're still welcome to take a look!

https://nicholas.cloud/blog/poco-a-poco-diminuendo-mellophone/

---

# Mellophone

[![](https://gitlab.com/nchlswhttkr/mellophone/badges/master/pipeline.svg?style=flat-square)](https://gitlab.com/nchlswhttkr/mellophone/pipelines)

:trumpet: :trumpet: :trumpet:

An app for teams, allowing them to write and share meeting minutes.

I started this project to implement what I've learned over the past few years, and to explore new technologies and libraries that interest me.

---

## Contributing

You can find instructions on setting up the frontend and backend for local development here, as well as a rough guide to the codebase.

Contributions are welcome! You can make a contribution by forking this repository, committing your changes on a new branch and opening a pull request. Please be respectful in your interactions with other contributors.

Alternatively, you can [open an issue](https://github.com/nchlswhttkr/mellophone/issues/new) if you find a problem that needs to be fixed.

## Setup

The frontend is a [React](https://reactjs.org/) application. You will need to [Yarn](https://yarnpkg.org/) installed (as well as [Node](https://nodejs.org/)).

The backend is a [Django](https://www.djangoproject.com/) application, you'll need [Docker Compose](https://docs.docker.com/install/) installed.

The backend runs inside a container, you'll need to install dependencies and run database migrations before you start it.

```sh
docker-compose run dev pipenv sync --dev
docker-compose run dev pipenv run migrate
docker-compose run dev sh scripts/get-frontend-build.sh
docker-compose up --detach dev

# stop the various running containers (backend, database)
docker-compose stop
```

You can access the app at `http://localhost:8000`.

If you would like to work on the frontend, you can start the React development server.

```sh
cd mellophone/frontend
yarn
yarn start
```

You can access this server at `http://localhost:3000`. It proxies requests to the backend, so make sure the backend container is still running!

### Frontend Development

Below are some common commands you might run. Remember you will need to be in the frontend root (`/mellophone/frontend`). You might wish to consult the [yarn docs](https://yarnpkg.com/lang/en/docs/cli/) or the [package.json itself](/mellophone/frontend/package.json)

| Command           | Action                                                                             |
| ----------------- | ---------------------------------------------------------------------------------- |
| yarn              | Install dependencies (and ensure all dependencies are up to date with `yarn.lock`) |
| yarn start        | Run a development server (located at http://localhost:300)                         |
| yarn build        | Create a production build (if you want to run the backend with a static frontend)  |
| yarn test         | Run tests against the frontend code                                                |
| yarn lint         | Run code style checks                                                              |
| yarn lint --write | Run code style checks, fixing where possible                                       |

The frontend is bootstrapped using [Create React App](https://create-react-app.dev/) and is located in the `mellophone/frontend` directory.

Most components are written using [TypeScript](https://www.typescriptlang.org/) and styled with [CSS Modules](https://github.com/css-modules/css-modules).

- `src/` \
  Frontend code is housed here. You can see the React root here (`App.tsx`, `index.tsx`) and files used in development (`setupTests.ts`, `setupProxy.ts` `types.ts`).
  - `components/` \
    React components such as buttons, inputs and forms are here. \
    Components like `<Button/>` and `<Input/>` extends to their standart HTML counterparts, adding styling and making sure they are labelled. \
    More complex components might implement a form or display information, depending on props for the data and callbacks (ie a network request, Redux action).
  - `ducks/` \
    The application's [Redux](https://redux.js.org/) store, roughly following the [re-ducks pattern](https://github.com/erikras/ducks-modular-redux).
  - `network/` \
    Network requests to the backend are abstracted as async functions. \
    These bundles of requests are loaded into the app's [context](https://reactjs.org/docs/context.html) and can be accessed with the `useNetwork()` hook. This context can be replaced in a testing runtime.
  - `pages/` \
    These are higher level components that integrate `components`, `ducks`, and `network` logic into page-level views. \
    Each component in this folder corresponds to a route within the application, like `/account` or `/teams/123/meetings`.
  - `utils/` \
    General purpose functions that don't belong to any of the above directories. See each invidual files for their purposes.

Tests are run using [Jest](https://jestjs.io/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), and are colocated with their applicable file in a `__tests__` subdirectory. \
If you're testing components from the `pages/` directory, you can use `src/utils/TestRenderer.tsx` to replace `network` functions or to set the Redux store to a particular state.

### Backend Development

Below are some common commands you might run. You might also wish to consult the [pipenv docs](https://pipenv.readthedocs.io/en/latest#pipenv-usage) and the [Pipfile itself](/Pipfile) for further information.

Make sure you're running your commands inside the development container (`docker-compose run dev ${YOUR COMMAND}`).

| Command                 | Action                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------- |
| pipenv sync             | Install runtime dependencies (and ensure they are up to date with `Pipfile.lock`)      |
| pipenv sync --dev       | As above, but also include development dependencies, such as linting/testing libraries |
| pipenv run migrate      | Apply new migrations to the database (must be running at this time)                    |
| pipenv run server       | Run the Django development server (located at http://localhost:8000)                   |
| pipenv run lint         | Format backend code                                                                    |
| pipenv run lint --check | Check backend code formatting                                                          |
| pipenv run test-unit    | Run tests against the backend                                                          |
| pipenv run test-e2e     | Run an end-to-end test using Selenium                                                  |

This repository is set up as a Django project, with the backend API as the `mellophone/backend` application.

- The root directory how many default files for Django, like the database tables (`models.py`) and the API routes (`urls.py`).
  - `controllers` \
    Defines the behaviour for a certain route. They interpret parameters/data from the incoming request and call the applicable `services`.
  - `migrations` \
    Holds Django-defined instructions for migrating/rolling back the database schema.
  - `services` \
    Defines logic for accessing with application objects (users, teams, meetings). \
    To relate it to the `controller-service-repository` pattern, these mix the service and repository layer. \
    Try to keep logic for accessing Django models to an appropriately named file (for example, `services/user.py` is responsible for the `User` model).

Tests for the backend at the moment only focus on the `services`, and are located in the `services/tests` directory. \
I'll be looking at adding tests in future for API routes in future, but for now there is only the basic end-to-end Selenium test in `mellophone/e2e.py`.
