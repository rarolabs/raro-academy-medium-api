FROM node:alpine

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY .dockerignore .
RUN npm install

COPY . .

RUN npm run build
