#!/bin/bash

set -ev

DOCKER_COMPOSE_VERSION="1.26.2"
KUBECTL_VERSION="v1.16.6-beta.0"

DOCKER_COMPOSE_VERSION_REGEX=$(echo $DOCKER_COMPOSE_VERSION | sed -E 's/\./\\\./g')
if [[ $1 = "ci" ]] && ([[ ! -x $(which docker-compose) ]] || [[ ! $(docker-compose --version) =~ $DOCKER_COMPOSE_VERSION_REGEX ]])
then
    sudo rm /usr/local/bin/docker-compose
    curl -L --progress-bar https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > docker-compose
    chmod +x ./docker-compose
    sudo mv ./docker-compose /usr/local/bin
    docker-compose --version
fi

KUBECTL_VERSION_REGEX=$(echo $KUBECTL_VERSION | sed -E 's/\./\\\./g')
if [[ $1 = "ci" ]] && ([[ ! -x $(which kubectl) ]] || [[ ! $(kubectl version --client --short) =~ $KUBECTL_VERSION_REGEX ]])
then
    curl -L --progress-bar https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl > kubectl
    chmod +x ./kubectl
    sudo mv ./kubectl /usr/local/bin
    kubectl version --client --short
fi
