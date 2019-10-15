#!/bin/sh

pipenv run server &

# The backend takes a while to start up in the background, so wait for it to
# return a successful response before running the E2E tests.
curl -s localhost:8000 > /dev/null
while [ $? -eq 7 ]; do
    sleep 1
    curl -s localhost:8000 > /dev/null
done

pipenv run test-e2e
exit $?

