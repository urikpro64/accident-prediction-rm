# Base image for Next.js development (using Node.js 18)
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and application code
COPY package*.json ./

# Install dependencies (assuming you use Yarn)
RUN yarn install

# Build the production image (replace 'your-nextjs-image' with your desired name)
FROM node:18-alpine AS prod

# Set working directory
WORKDIR /app

# Copy the application code, ensuring package.json is included
COPY . .

# Next.js 14 uses build instead of build:production
RUN yarn run build

# Copy the production build directory (replace 'out' with your actual build directory name)
COPY --from=build /app /app

# Expose the frontend port (replace 3000 with your desired port)
EXPOSE 3000

# Start the Next.js server in production mode
CMD [ "npm", "start" ] 
