FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Copy and install
COPY package*.json ./
RUN npm install

# Copy rest
COPY . .
RUN npm run build-dev
# RUN npm run build --production

# Expose port
EXPOSE 3000

# Run
CMD [ "npm", "start" ]
