FROM node:11
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock*", "./"]
RUN yarn install --production --silent
COPY . .

CMD yarn start
