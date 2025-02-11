# Use Node.js 18.20.6 LTS
FROM node:18.20.6

# Set working directory
WORKDIR /app

# Copy application code
COPY . . 

# Install dependencies
RUN yarn install --frozen-lockfile

# Build the application
RUN yarn build

# Expose the application port
EXPOSE 8081

# Start the application
CMD ["node", "server.js"]
