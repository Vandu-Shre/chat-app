# Base image with Node + TypeScript
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose the port
EXPOSE 4000

# Start the server
CMD ["npm", "run", "dev"]
