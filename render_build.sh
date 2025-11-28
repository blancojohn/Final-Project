#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pip install pipenv

python -m pipenv install

python -m pipenv run upgrade

pipenv run upgrade
