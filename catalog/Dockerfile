FROM node

# Set working directory
WORKDIR /catalog

# Add application files
ADD server.js .
ADD package.json .
ADD package-lock.json .
ADD public ./public

# Install postgres client tool using npm
RUN npm install pg


# Install other Node.js dependencies
RUN npm install express body-parser

# Expose port
EXPOSE 3001

# Command to run the application
CMD [ "npm", "start" ]
