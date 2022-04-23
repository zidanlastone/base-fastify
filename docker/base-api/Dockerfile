FROM node:16-alpine

ENV PORT=8080

EXPOSE 8080

RUN npm install npm@latest -g

COPY package.json package-lock.json* ./

RUN npm install --no-optional && npm cache clean --force

WORKDIR /usr/app

COPY . .

CMD ["npm", "run", "dev"]