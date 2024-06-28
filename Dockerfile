FROM node:latest as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli@17.3.8
COPY . .
RUN npm run build --configuration=production

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/mottu-teste-tecnico/browser /usr/share/nginx/html

EXPOSE 80