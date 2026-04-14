FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm pkg delete scripts.prepare && npm install --omit=dev --ignore-scripts
EXPOSE 5000
CMD ["node", "dist/server.js"]
