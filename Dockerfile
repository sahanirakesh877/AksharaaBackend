FROM node:20-alpine
WORKDIR /Server
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
