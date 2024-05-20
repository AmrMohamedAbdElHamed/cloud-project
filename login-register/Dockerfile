FROM node

# Set working directory
WORKDIR /register-login

# Add application files
ADD LoginRegisterServer.js .
ADD package.json .
ADD package-lock.json .
ADD login_register_pages ./login_register_pages

RUN npm install pg

# Install other Node.js dependencies
RUN npm install express body-parser

# Expose port
EXPOSE 3000

# Command to run the application
CMD [ "npm", "start" ]
