# Mellophone

An app for writing meeting minutes.

:trumpet: :trumpet: :trumpet:

I'm trying some full stack stuff, watch this space.

## Installation

### Frontend

To run the frontend you will need [Yarn](https://yarnpkg.org/). Being familiar with how a React app built off [create-react-app](https://facebook.github.io/create-react-app/docs/) works is of benefit too.

To setup the frontend, you will need to install its dependencies.

```
cd mellophone/frontend
yarn
```

Here are some common commands you might find yourself running.

| Command           | Action                                              |
| ----------------- | --------------------------------------------------- |
| yarn start        | Run a development server                            |
| yarn build        | Create a production build                           |
| yarn test         | Run unit and integration tests of the frontend code |
| yarn lint         | Run linting checks                                  |
| yarn lint --write | Fix linting issues (if any found)                   |

### Backend

You will need to get a local database ([Postgres (10)](https://www.postgresql.org/download/)) running for this, see the relevant [documentation](https://www.postgresql.org/docs/10/runtime.html).

Don't worry about a password. Once setup, you should be able to start and connect to the database. There may be prior steps involved like setting up permissions and creating a postgres user account (recommended practices).

```
# You may need prior steps to set up permissions and a 'postgres' user account
initdb -E UTF_8 -D /usr/local/pgsql/data
pg_ctl -D /usr/local/pgsql/data start
...
pg_ctl -D /usr/local/pgsql/data stop
```

The backend uses [pipenv](https://pipenv.readthedocs.io/en/latest/), once that is set up you can install dependencies and start running the server.

If you want to test the backend through the frontend, you will need to [build the frontend](#frontend) first.

```
pipenv install
pipenv run server
```
