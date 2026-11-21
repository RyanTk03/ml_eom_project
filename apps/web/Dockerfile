# ============================================
# Stage 2: Base image
# ============================================
ARG NODE_VERSION=22.22.2

FROM node:${NODE_VERSION} AS base

RUN corepack enable

WORKDIR /app


# ============================================
# Stage 2: Pruner
# ============================================
FROM base AS pruner

WORKDIR /app

COPY . .

RUN pnpm dlx turbo prune @ml-eom/web --docker


# ============================================
# Stage 3: Dependencies Installation Stage
# ============================================
FROM base AS dependancies

# Set working directory
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile


# ============================================
# Stage 4: Build Next.js application in standalone mode
# ============================================
FROM base AS builder

WORKDIR /app

COPY --from=dependancies /app .
COPY --from=pruner /app/out/full/ .

ENV NODE_ENV=production

RUN pnpm --filter @ml-eom/web run build


# ============================================
# Stage 5: Run Next.js application
# ============================================
FROM base AS runner

# Set working directory
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone Next.js application
COPY --from=builder /app/apps/web/.next/standalone ./

# Copy Next.js static files
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

# Copy public files
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

# Start Next.js standalone server
CMD ["node", "apps/web/server.js"]
