FROM amazoncorretto:17
WORKDIR /usr/src/app
COPY . .
RUN npm install