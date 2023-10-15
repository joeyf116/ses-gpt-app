FROM node:14

WORKDIR /
COPY /client/package.json /client
RUN npm install

WORKDIR /
COPY /server/package.json /server
RUN npm install
COPY . /usr/app/service

WORKDIR /usr/app/service/server
CMD ["node", "index.js"]

# # Stage 2
# FROM nginx:1.17.0-alpine

# COPY /client/dist /usr/share/nginx/html
# EXPOSE $REACT_DOCKER_PORT

# CMD nginx -g 'daemon off;' && node server/index.js