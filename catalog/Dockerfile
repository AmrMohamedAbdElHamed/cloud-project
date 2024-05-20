FROM node

# Set working directory
WORKDIR /catalog

# Add application files
ADD catalogServer.js .
ADD package.json .
ADD package-lock.json .
ADD catalog_style ./catalog_style
ADD catalogPage ./catalogPage

# Install postgres client tool using npm
RUN npm install pg


# Install other Node.js dependencies
RUN npm install express body-parser

# Expose port
EXPOSE 3001

# Command to run the application
CMD [ "npm", "start" ]
