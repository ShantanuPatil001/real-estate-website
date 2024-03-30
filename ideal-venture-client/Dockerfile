FROM node:21-alpine3.18
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3000 
EXPOSE 9005/tcp
EXPOSE 9005/udp 
CMD [ "npm","start" ]