FROM node:14-alpine

WORKDIR /usr/app

COPY . .
RUN npm ci
RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
