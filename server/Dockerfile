FROM node:16.15.1

WORKDIR /app

COPY "package.json" .

RUN yarn

COPY . .

CMD yarn typeorm migration:run -d src/data-source; yarn dev