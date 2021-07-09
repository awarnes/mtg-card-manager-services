#!/bin/bash
NODE_ENV=$1

if [ $NODE_ENV != 'production' ]; then
  NODE_ENV='development'
fi

export NODE_ENV

docker-compose up -d --build --no-recreate