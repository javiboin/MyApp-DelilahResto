# Ubicacion de los directorios antes de arrancar

# mkdir /data
# cd /data

# Comando Docker para arrancar la imagen creadad anteriormente

# docker pull keymetrics/pm2:latest-alpine　

# clonar repositorio GitHub 
# https://github.com/javiboin/MyApp-DelilahResto.git

# Direccion a la cual dirigirse dentro de mi repo para prender el PM2
# cd /data/pm2-docker-alpine/example-app

# [root@localhost example-app]# more Dockerfile
FROM keymetrics/pm2:latest-alpine

# Bundle APP files
RUN mkdir -p /home/Service
WORKDIR /home/Service
COPY . /home/Service
#COPY src src/
#COPY package.json .
#COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Show current folder structure in logs
#RUN ls -al -R
EXPOSE 3000
CMD [ "pm2-docker", "start", "pm2.json" ]

# docker-compose.yml
# version: '2'

# services:
#   web:
#    build: .
#    # build from Dockerfile
#    context: ./Path
#    dockerfile: Dockerfile
#    ports:
#     - "5000:5000"
#    volumes:
#     - .:/code
#  redis:
#    image: redis

# ESTO NO ES DOCKER COMPOSE, ES EL DOCKER FILE, 
# HAY POR LO MENOS VARIAS LINEAS QUE ESTAN MAL, 
# NO EN ESCITURA SINO EN CONCEPTO

FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]