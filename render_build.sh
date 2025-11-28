#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install

pipenv install pipenv

python -m pipenv install

python -m pipenv run upgrade

pipenv run upgrade
