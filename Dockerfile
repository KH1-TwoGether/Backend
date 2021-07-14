FROM node:14-alpine

WORKDIR /usr/app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 8080

CMD ["npm", "start"]
