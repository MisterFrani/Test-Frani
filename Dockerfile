FROM node:14.17.4-alpine3.14 as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY yarn.lock .
RUN npm install
COPY *.json .
COPY *.js .
COPY public public/
COPY src src/
ENV REACT_APP_VERSION 0.1.13.1
RUN npm run build

FROM nginx:1.21.1-alpine
WORKDIR /app
RUN rm -rf /usr/share/nginx \
    && apk upgrade --update --no-cache
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/app.conf /etc/nginx/templates/default.conf.template
COPY --from=builder /app/build .
EXPOSE 80
