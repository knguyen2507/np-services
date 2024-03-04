FROM node:20-alpine As base
RUN npm install -g pnpm@8.14.0

FROM base AS dependencies
WORKDIR /usr/src/app
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma/
COPY libs ./libs/
RUN pnpm install

FROM base AS build
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN pnpm prisma generate
RUN pnpm build

FROM base AS deploy
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist/
COPY --from=build /usr/src/app/node_modules ./node_modules

CMD [ "node", "dist/src/main.js" ]
