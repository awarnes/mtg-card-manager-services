#!/bin/bash

if [ $NODE_ENV = "production" ]; then
  echo "Starting as production"
  npm run start
else
  echo "Starting as development"
  npm run start:dev
fi
      