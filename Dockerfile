# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Run the deploy script
RUN npm run deploy

# Expose the port your app will run on
EXPOSE 4000

# Command to run your application
CMD ["npm", "start"]
