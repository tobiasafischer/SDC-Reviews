FROM node:14
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "build" ]
CMD [ "npm", "run", "start" ]
CMD [ "npm", "run", "parse" ]
CMD [ "npm", "run", "test" ]



