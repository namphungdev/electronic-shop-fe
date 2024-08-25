# 1. For build React app
FROM node:20.13.1-alpine AS development
# 1. For build React app

# Set working directory
WORKDIR /app
# 
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
# COPY .env.development /app/.env
# COPY .env.development /app/.env.development

# Same as npm install
RUN npm install --force

# RUN npm audit fix --force
# Update caniuse-lite
# RUN npx browserslist@latest --update-db


# Update caniuse-lite with a specific version
# RUN npm install caniuse-lite@1.0.30001565 --save-dev

COPY . /app

# ENV CI=true
# ENV PORT=3001

CMD [ "npm", "start" ]

FROM development AS build

# RUN npm run build
RUN npm run build

# 2. For Nginx setup
FROM nginx:alpine

# Copy config nginx
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]