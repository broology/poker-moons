FROM node:16.3.0-alpine as backend

RUN yarn --version

RUN mkdir /app
WORKDIR /app
COPY ./dist/apps/backend/package.json ./package.json

ENV PORT=4000

RUN yarn install --prod
COPY ./dist/apps/backend ./dist/apps/backend


EXPOSE 4000
CMD ["node", "./dist/apps/backend/main.js"]