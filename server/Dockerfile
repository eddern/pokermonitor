FROM openjdk:13-alpine

RUN mkdir /app

COPY ./build/libs/server.jar /app/server.jar
WORKDIR /app

EXPOSE 50051
CMD ["java", "-jar", "server.jar"]