#!/bin/sh

docker-compose run -p 8000:8000 dev sh -c "pipenv sync --keep-outdated; pipenv run migrate; pipenv run server"
