#!/bin/sh

pipenv run server &
curl -s localhost:8000 > /dev/null
while [ $? -eq 7 ]; do
    sleep 1
    curl -s localhost:8000 > /dev/null
done
pipenv run test-e2e
exit $?

