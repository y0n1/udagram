#!/bin/bash

set -ev

docker push y0n1/udagram-feed-api &
docker push y0n1/udagram-user-api &
docker push y0n1/udagram-reverse-proxy &
docker push y0n1/udagram-web-client
