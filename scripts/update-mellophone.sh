#!/bin/sh

rsync -a --exclude .env --delete latest-deployment/ production/
rm -rf latest-deployment
cd production
~/.local/bin/pipenv sync --keep-outdated
~/.local/bin/pipenv run migrate
