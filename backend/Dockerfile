# Base image with Node
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install dev tools globally (optional)
RUN npm install -g ts-node-dev

# Copy the rest of the code
COPY . .

# Expose port (adjust to your backend port)
EXPOSE 8000

# Start in dev mode
CMD ["npm", "run", "dev"]
