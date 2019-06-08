#!/bin/sh

docker-compose up -d db
docker-compose run -p 8000:8000 dev sh -c "pipenv sync --keep-outdated; pipenv run migrate; pipenv run server"
docker-compose stop db
