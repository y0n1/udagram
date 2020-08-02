#!/bin/bash

set -ev

kubectl apply -f ./ci/k8s/aws-secret.yaml
kubectl apply -f ./ci/k8s/env-secret.yaml
kubectl apply -f ./ci/k8s/env-configmap.yaml

kubectl apply -f ./user-api/k8s/deployment.yaml
kubectl apply -f ./user-api/k8s/service.yaml

kubectl apply -f ./feed-api/k8s/deployment.yaml
kubectl apply -f ./feed-api/k8s/service.yaml

kubectl apply -f ./reverse-proxy/k8s/deployment.yaml
kubectl apply -f ./reverse-proxy/k8s/service.yaml

kubectl apply -f ./web-client/k8s/deployment.yaml
kubectl apply -f ./web-client/k8s/service.yaml
