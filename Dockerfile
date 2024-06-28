FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:prod

FROM nginx:1.23
COPY --from=node /app/dist/mottu-teste-tecnico /usr/share/nginx/html

EXPOSE 80