# Use the official Node.js 19.5.0 image
FROM node:19.5.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run npm run deploy
RUN npm run deploy

# Expose the port your app runs on
EXPOSE 8080

# Define the command to run your app
CMD ["npm", "start"]
