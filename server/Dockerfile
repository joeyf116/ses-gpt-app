# Use an official Node.js runtime as the base image
FROM node:14

WORKDIR /server

# Install dependencies
COPY package*.json .
RUN npm install

# Copy the app source code
COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
