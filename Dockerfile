FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy the application files
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY .env* ./
COPY src ./src

ARG ENV=local
RUN yarn run env:copy:$ENV

# Install dependencies
RUN yarn install --immutable
RUN yarn run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

# Copy only the necessary files from the builder stage
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json
COPY --from=builder --chown=hono:nodejs /app/yarn.lock /app/yarn.lock
COPY --from=builder --chown=hono:nodejs /app/.env /app/.env

# Install only production dependencies
RUN corepack enable
RUN yarn set version 4.3.0
RUN yarn workspaces focus --all --production

USER hono
EXPOSE 3000

CMD ["node", "/app/dist/index.js"]