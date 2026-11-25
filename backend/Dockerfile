# ---------- Etapa 1: compilar ----------
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Primero solo lo necesario para bajar dependencias (Docker lo cachea)
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw && ./mvnw -B -q dependency:go-offline

# Después el código fuente
COPY src src
RUN ./mvnw -B -q package -DskipTests

# ---------- Etapa 2: ejecutar ----------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN addgroup -S vigia && adduser -S vigia -G vigia
COPY --from=build /app/target/*.jar app.jar
USER vigia

EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-jar", "app.jar"]