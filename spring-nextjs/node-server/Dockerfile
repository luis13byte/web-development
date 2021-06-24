FROM node:15.6.0-alpine3.10

WORKDIR /usr/src/app

# Install app dependencies
COPY ./frontend-next/package.json .
COPY ./frontend-next/package-lock.json .

RUN npm install

# Copy the app
COPY ./frontend-next/ .

# Comprobar realmente por cual puerto se ejecuta node
EXPOSE 3000/tcp

CMD ["npm","run", "dev"]
