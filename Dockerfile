# build stage
FROM node:16.14.0-alpine as build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --network-timeout 100000

COPY . .

RUN yarn build

# production stage
FROM node:16.14.0-alpine as production

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile --network-timeout 100000

COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]