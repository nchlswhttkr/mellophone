#!/bin/sh

curl -L "https://gitlab.com/nchlswhttkr/mellophone/builds/artifacts/master/download?job=FE+Install/Build" > build.zip
unzip -u build.zip
rm build.zip
pipenv run python mellophone/manage.py collectstatic --clear --no-input --no-post-process
