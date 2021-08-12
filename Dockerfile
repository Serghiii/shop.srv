FROM node:16.13.1-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .
EXPOSE 7000
CMD [ "npm", "run", "start:prod" ]