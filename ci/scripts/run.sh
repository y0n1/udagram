#! /bin/bash

set -ev

if [[ $1 = "local" ]]; then
    docker run \
        --rm \
        --name udagram-db \
        -e POSTGRES_DB=$POSTGRES_DB \
        -e POSTGRES_HOST=$POSTGRES_HOST \
        -e POSTGRES_USER=$POSTGRES_USER \
        -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
        -p 5432:5432 \
        -d \
        postgres
fi

docker-compose -f ./ci/docker/docker-compose.yaml up
