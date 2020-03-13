FROM node:12
WORKDIR /usr/share/backend/
COPY ./backend/package.json .
RUN npm install
COPY . .
WORKDIR /usr/src/admin
COPY ./admin/ /usr/src/admin
RUN npm install
COPY ./admin/ .
RUN npm run build
# EXPOSE 8080
#CMD [ "npm", "start" ]