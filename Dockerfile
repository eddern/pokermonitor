FROM ubuntu:latest AS appserver
# Update and install sudo functionality
RUN echo "OS version: " && uname -a
RUN apt-get update && apt-get install -y sudo && apt install -y curl

# Download and execute from official source. Scary to sudo bash from the Internet, but that's how it is...
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
RUN sudo bash nodesource_setup.sh

# Install actual nodejs
RUN apt-get install -y nodejs

# Create and switch to the web-app directory
RUN mkdir /home/web-app
WORKDIR /home/web-app

# Copy web-app contents to the application folder
COPY web-app /home/web-app/
COPY web-app/package.json /home/web-app/package.json

# Install web application
RUN npm install

# Update platform settings
RUN npm fund
RUN npm audit fix

# Re-install
RUN npm install 
RUN npm run build

# Use latest nginx image as a multi-staged build
FROM nginx:1.16.0-alpine
USER root
RUN apk update && apk add curl && apk add zsh
# Add ca-certificates. Must configure properly using self-signed certificates.
RUN apk --no-cache add ca-certificates
WORKDIR /root/

# Copy web directory into nginx 
COPY --from=appserver /home/web-app/public /usr/share/nginx/html

# Configure nginx
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
