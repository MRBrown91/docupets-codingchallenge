FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn

EXPOSE 8080
CMD ["yarn", "dev", "--host", "0.0.0.0"]