ARG IMAGE_TAG

#FROM node:16.13.0-alpine3.14
FROM node:${IMAGE_TAG}

USER root
WORKDIR /usr/src/app

# Install app dependencies
COPY disk/usr/src/app/frontend-next/package.json ./
COPY disk/usr/src/app/frontend-next/package-lock.json ./

RUN npm install

# Copy the app
COPY disk/usr/src/app/frontend-next/ ./

# Comprobar realmente por cual puerto se ejecuta node
EXPOSE 3000/tcp

USER node
CMD ["npm","run", "dev"]
