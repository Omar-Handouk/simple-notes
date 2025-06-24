FROM node:22-alpine3.22
ENV NODE_ENV=production
ENV APP_HOST=0.0.0.0
ENV APP_PORT=80
RUN npm install --global pnpm
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
RUN pnpm install --prod
COPY . .
CMD ["pnpm", "run", "start"]