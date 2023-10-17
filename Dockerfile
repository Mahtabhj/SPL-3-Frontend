FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build
CMD ["npm", "start"]
