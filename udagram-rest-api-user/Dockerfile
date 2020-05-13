## Build
FROM node:12 AS builder
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile 

# Bundle app source
COPY . .
RUN  yarn build

## Run
FROM node:12
WORKDIR /app
COPY --from=builder /usr/src/app/www ./www
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json .
EXPOSE 8080
CMD [ "yarn", "start" ]
