#!/bin/sh

set -e

if [ -z "$1" ]; then
    export BRANCH_TO_DOWNLOAD="master"
else
    export BRANCH_TO_DOWNLOAD="$1"
fi

curl -L "https://gitlab.com/nchlswhttkr/mellophone/builds/artifacts/$BRANCH_TO_DOWNLOAD/download?job=FE+Install/Build" > build.zip
unzip -uo build.zip
rm build.zip
pipenv run python mellophone/manage.py collectstatic --clear --no-input --no-post-process
