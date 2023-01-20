FROM node:18.13.0-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .
EXPOSE 7000
CMD [ "npm", "run", "start:prod" ]