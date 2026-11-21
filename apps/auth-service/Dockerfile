# 1. Base image with environment setup
FROM node:22.22.2 AS base

RUN corepack enable

# 2. Get monorepo and only keep the app source file and its dependancies
FROM base AS pruner
WORKDIR /app

COPY . .

RUN pnpm dlx turbo prune @ml-eom/auth-service --docker 

# 3. Download and install external deps and run app
FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN pnpm --filter @ml-eom/auth-service run build

# 4. Build image
FROM base AS runner

COPY --from=builder /app .

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["pnpm", "--filter", "@ml-eom/auth-service", "start"]
