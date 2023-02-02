ARG JAR_FILE=viewer-0.0.1-SNAPSHOT.jar

FROM node:18 as ng-stage
WORKDIR /usr/src/app
COPY . .
WORKDIR ./src/main/resources/frontend/angular-app
RUN npm install
RUN npm run build
WORKDIR ../../public

FROM maven:3.8.7 as mvn-stage
WORKDIR /usr/src/app
COPY . .
WORKDIR ./src/main/resources
RUN rm application.properties
RUN mv application.properties.production application.properties
WORKDIR ./public
COPY --from=ng-stage /usr/src/app/src/main/resources/public .
WORKDIR /usr/src/app
RUN mvn package

FROM amazoncorretto:17 as final-stage
WORKDIR /usr/src/app
COPY --from=mvn-stage /usr/src/app/target/${JAR_FILE} .
CMD ["java","-jar","viewer-0.0.1-SNAPSHOT.jar"]