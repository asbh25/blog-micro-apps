# Build stage
From node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:20-alpine
WORKDIR /app
# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force
USER appuser
EXPOSE 3002
CMD ["node", "dist/server.js"]
