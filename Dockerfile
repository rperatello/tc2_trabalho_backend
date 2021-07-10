FROM node:16

RUN mkdir /usr/src/app

WORKDIR /usr/src/app
RUN npm install -g @angular/cli
RUN npm install express --save
COPY . .
RUN npm install
# WORKDIR /usr/src/app/frontend-agenda
# RUN ng build
# WORKDIR /usr/src/app
CMD npm start
