#!/usr/bin/env bash

set -e

cp sample.env .env
docker compose up -d
npm install
npm run db:reset
npm run lint
npm test
npm start
