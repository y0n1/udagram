# Install app dependencies
FROM node:12 as deps
WORKDIR /tmp
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile 

# Bundle app source
FROM deps as builder
WORKDIR /usr/src/app
COPY --from=deps /tmp/node_modules ./node_modules
COPY . .
RUN  yarn run tsc

# artifact
FROM node:12
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/www ./www
EXPOSE 8080
CMD [ "node", "./www/server.js" ]
