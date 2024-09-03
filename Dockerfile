# Use a multi-stage build
FROM node:alpine

# Set working directory
WORKDIR /app/

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install --force

COPY . .
# Build the frontend for production
RUN npm run build


# Move the dist folder to /backend
RUN mv dist /backend

# Expose the port
EXPOSE 5000
# Set command to run the server
CMD [ "npm", "run", "server" ]
