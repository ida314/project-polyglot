# Use a lightweight Node image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first to leverage Docker cache for dependencies
COPY package.json package-lock.json* ./

# Install dependencies using clean install (faster + reproducible)
RUN npm ci

# Copy the rest of the app source code
COPY . .

# Expose Vite dev server port
EXPOSE 3000

# Run Vite dev server, accessible on all interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
