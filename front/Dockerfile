FROM node:lts

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# install and cache dependencies
COPY . /usr/src/app
RUN npm install

# Expose the port the app runs in
EXPOSE 3000

# start app
CMD npm start
