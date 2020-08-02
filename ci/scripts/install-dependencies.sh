#!/bin/bash

set -ev

DOCKER_COMPOSE_VERSION_REGEX="1\.26\.2"
KUBECTL_VERSION_REGEX="v1\.16\.6-beta\.0"

if [[ $1 = "ci" ]] && [[ ! $(docker-compose --version) =~ $DOCKER_COMPOSE_VERSION_REGEX ]]
then
    sudo rm /usr/local/bin/docker-compose
    DOCKER_COMPOSE_VERSION=$(echo $DOCKER_COMPOSE_VERSION_REGEX | sed -E 's/\\//g')
    curl -L https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > docker-compose
    chmod +x docker-compose
    sudo mv docker-compose /usr/local/bin
fi

if [[ $1 = "ci" ]] && [[ ! $(kubectl version --client --short) =~ $KUBECTL_VERSION_REGEX ]]
then
    KUBECTL_VERSION=$(echo $KUBECTL_VERSION_REGEX | sed -E 's/\\//g')
    curl -LO https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl
    chmod +x ./kubectl
    sudo mv ./kubectl /usr/local/bin/kubectl
fi
