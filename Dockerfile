FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:24-bookworm-slim AS runtime
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates rclone restic sqlite3 \
  && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production \
    PORT=8080 \
    DATABASE_PATH=/data/renaiss-hackathon.sqlite
WORKDIR /app
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/shared ./shared
RUN mkdir -p /data && chown -R node:node /app /data
VOLUME ["/data"]
USER node
EXPOSE 8080
CMD ["node", "server/index.mjs"]
