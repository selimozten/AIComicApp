# Stage 1: Build the React application
FROM node:16-alpine as build

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the codebase into the container
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the build using nginx
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outer world
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
