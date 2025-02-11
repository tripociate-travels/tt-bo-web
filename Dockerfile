# Use Node.js 18.20.6 LTS
FROM node:18.20.6

# Install necessary dependencies
RUN apt-get update

# Set working directory
WORKDIR /app

# Copy application code
COPY . . 

# Set environment variables
ENV NODE_ENV=production

# Install dependencies
RUN yarn install --frozen-lockfile

# Build the application
RUN yarn build

# Expose the application port
EXPOSE 8081

# Start the application
CMD ["node", "server.js"]
