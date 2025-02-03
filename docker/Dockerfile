FROM node:18-alpine

WORKDIR /usr/src/app
COPY ../package*.json ./

RUN apk update && apk add --no-cache bash
RUN npm ci --omit=dev

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
