FROM node:18-alpine as build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM nginx:1.23
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/src/dist/mottu-teste-tecnico/server /var/www/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off" ]