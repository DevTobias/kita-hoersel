#! Install dependencies
FROM node:18 AS builder
WORKDIR /build

# Copy all workspace packages
COPY yarn.lock ./
COPY package.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
COPY modules/kita-hoersel-eslint/package.json ./modules/kita-hoersel-eslint/
COPY modules/kita-hoersel-prettier/package.json ./modules/kita-hoersel-prettier/

# Install all dependencies
RUN yarn install --frozen-lockfile --non-interactive

#! Build the frontend / server

# Build frontend
WORKDIR /build/frontend
COPY frontend/tsconfig.json frontend/tailwind.config.cjs frontend/astro.config.mjs ./
COPY frontend/public/ ./public/
COPY frontend/export/ ./export/
COPY frontend/src/ ./src
ENV NODE_ENV=production
ENV ENDPOINT_URL=https://admin.tobias-kaerst.de/graphql
RUN yarn build

# Build backend
WORKDIR /build/backend
COPY backend/tsconfig.json ./
COPY backend/src/ ./src
ENV NODE_ENV=production
RUN yarn build

WORKDIR /build

#! Copy and and start build outputs
FROM node:alpine
WORKDIR /server

RUN npm install pm2 -g

COPY --from=builder /build/frontend/dist/client ./client/
COPY --from=builder /build/backend/dist/server.js ./server.js

ENV CLIENT_PATH=./client

EXPOSE 8080
CMD [ "pm2-runtime", "-n", "app", "-i", "2", "server.js"]
