FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]

