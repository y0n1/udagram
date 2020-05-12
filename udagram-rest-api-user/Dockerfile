FROM node:12
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile 
# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "yarn", "run", "prod" ]
