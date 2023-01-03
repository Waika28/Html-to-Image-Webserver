FROM node:19-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src ./src
COPY tsconfig.json ./

RUN npm run build

RUN npm prune --omit=dev

FROM node:19-alpine

WORKDIR /app
RUN chown nobody /app

COPY --from=builder --chown=nobody:root /app/dist ./
COPY --from=builder --chown=nobody:root /app/node_modules ./node_modules

CMD ["node", "app.js"]