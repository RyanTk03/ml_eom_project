# 1
FROM node:22.22.2 AS base

RUN corepack enable

WORKDIR /app

# 2
FROM base AS pruner

WORKDIR /app
COPY . .

RUN pnpm dlx turbo prune @ml-eom/user-service --docker

# 3
FROM base AS builder

WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN pnpm --filter @ml-eom/user-service run build

# 4
FROM base AS runner

COPY --from=builder /app .

ENV NODE_ENV=production
ENV PORT=8082

EXPOSE 8082

CMD ["pnpm", "--filter", "@ml-eom/user-service", "start"]
