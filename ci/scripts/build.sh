#!/bin/bash

set -ev

docker-compose -f ./ci/docker/build.docker-compose.yaml build --parallel
