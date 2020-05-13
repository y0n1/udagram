FROM node:12 as deps
# Install app dependencies
WORKDIR /tmp
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile 

FROM deps as builder
# Bundle app source
WORKDIR /usr/src/app
COPY . .
COPY --from=deps /tmp/node_modules ./node_modules
RUN  yarn run tsc

FROM builder
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/www .
EXPOSE 8080
CMD [ "node", "./www/server.js" ]
