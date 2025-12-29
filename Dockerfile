# ==============================================================================
# Safeweb Vivo Presentation - Production Dockerfile
# ==============================================================================
# Multi-stage build for optimal size and security

# Stage 1: Build Angular webapp
FROM node:20-alpine AS angular-builder

WORKDIR /app/angular

# Copy Angular app source
COPY safeid-vivo-webapp/package*.json ./
RUN npm ci --legacy-peer-deps

COPY safeid-vivo-webapp/ ./
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS production

# Add labels
LABEL maintainer="Move4 Publicidade"
LABEL description="Safeweb Vivo Presentation Server"
LABEL version="1.0.0"

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S safeweb -u 1001

# Copy server files
COPY server/package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY server/server.js ./

# Create directories
RUN mkdir -p webapp slides assets

# Copy Angular build
COPY --from=angular-builder /app/angular/dist/safeid-vivo-webapp/browser ./webapp/

# Copy presentation slides
COPY slide*.html ./slides/
COPY theme-safeweb.css ./slides/

# Copy assets
COPY assets/ ./assets/

# Set ownership
RUN chown -R safeweb:nodejs /app

# Switch to non-root user
USER safeweb

# Environment variables
ENV NODE_ENV=production
ENV PORT=3090
ENV HOST=0.0.0.0

# Expose port
EXPOSE 3090

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3090/health || exit 1

# Start server
CMD ["node", "server.js"]
