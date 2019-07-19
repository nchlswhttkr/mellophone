#!/bin/sh

rsync -a --exclude .env --delete latest-deployment/ production/
cd production
~/.local/bin/pipenv sync --keep-outdated
~/.local/bin/pipenv run migrate
