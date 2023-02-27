FROM node:19.2.0-alpine as dependencias
EXPOSE 3000
WORKDIR /app 
COPY package.json ./
COPY . .
RUN yarn install
CMD ["yarn","start:dev"]