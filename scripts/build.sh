#! /bin/bash

docker-compose -f ./deployment/docker/build.docker-compose.yaml build --parallel
