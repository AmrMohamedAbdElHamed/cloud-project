FROM node

# Set working directory
WORKDIR /register-login

# Add application files
ADD server.js .
ADD package.json .
ADD package-lock.json .
ADD public ./public

RUN npm install pg

# Install other Node.js dependencies
RUN npm install express body-parser

# Expose port
EXPOSE 3000

# Command to run the application
CMD [ "npm", "start" ]
