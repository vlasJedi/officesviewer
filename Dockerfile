FROM maven:latest as build-stage
WORKDIR /usr/src/app
COPY . .
RUN mvn package

# ARG JAR_FILE=viewer-0.0.1-SNAPSHOT.jar

# WORKDIR /opt/app

# COPY --from=build-stage /usr/src/app/target/${JAR_FILE} .

# CMD ["java","-jar","viewer-0.0.1-SNAPSHOT.jar"]
CMD ["java","-jar","/usr/src/app/target/viewer-0.0.1-SNAPSHOT.jar"]