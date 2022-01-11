FROM node:16-alpine as backend

RUN yarn --version

RUN mkdir /app
WORKDIR /app
COPY ./dist/apps/backend/package.json ./package.json

ENV PORT=8080

RUN yarn install --prod
COPY ./dist/apps/backend ./dist/apps/backend


EXPOSE 8080
CMD ["node", "./dist/apps/backend/main.js"]