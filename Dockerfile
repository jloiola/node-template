FROM bitnami/node:16-prod-debian-10 as base

WORKDIR /app

COPY package.json ./

FROM base as deps
RUN npm i

FROM deps as build

COPY --from=deps /app ./
COPY ./src ./src/
COPY package.json ./

FROM build as prod
RUN npm prune --production

ENV PORT=5000
EXPOSE 5000

CMD [ "npm", "run", "start" ]