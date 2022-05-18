FROM node:17-alpine3.12

COPY . C:\Users\Usuario\Documents\delilah\MyApp-DelilahResto
RUN cd /MyApp-DelilahResto && npm install
WORKDIR /MyApp-DelilahResto
CMD node index.js