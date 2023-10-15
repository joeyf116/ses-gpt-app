# Use an official Nginx base image
FROM nginx:alpine

# Copy your custom nginx.conf to the appropriate location
COPY nginx.conf /etc/nginx/nginx.conf

# Copy your built React app files to the Nginx document root
COPY dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]