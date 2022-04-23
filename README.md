# Resc BASE fastify API

merupakan project untuk membuat api yang reliable terstruktur dan mudah dimaintenance serta memiliki keunggulan respose yang cepat dan scalable.

# Docker Instance
 
 menggunakan docker untuk membantu mempermudah dalam proses development dan scaling app

Syntax

`docker build  -t ImageName:TagName dir`

Options
- -t − is to mention a tag to the image

- ImageName − This is the name you want to give to your image.

- TagName − This is the tag you want to give to your image.

- Dir − The directory where the Docker File is present.

Perintah untuk melakukan build image docker

  `docker build -t rescbaseapi:0.1 .`

 perintah untuk run image

  `docker run --name base-api -p 8080:8080 -d zidanlastone/base-api:0.1`


# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).