FROM node

# Set working directory
WORKDIR /register-login

# Add application files
ADD server.js .
ADD package.json .
ADD package-lock.json .
ADD public ./public

# Install MySQL client tool using npm
#RUN npm install mysql
RUN npm install pg

# Install other Node.js dependencies
RUN npm install express body-parser
# Install dependencies
#RUN npm install
# Expose port
EXPOSE 3000

# Command to run the application
CMD [ "npm", "start" ]
# Command to run when starting the container
#CMD ["node", "server.js"]
