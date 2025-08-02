# Multi-stage build for Spring Boot application
FROM maven:3.9.5-amazoncorretto-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml first for better caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17-alpine-jdk

# Set working directory
WORKDIR /app

# Create non-root user
RUN addgroup -S spring && adduser -S spring -G spring

# Copy the built jar from build stage
COPY --from=build /app/target/*.jar impactlens-backend-1.0.0.jar

# Change ownership to spring user
RUN chown spring:spring impactlens-backend-1.0.0.jar

# Switch to spring user
USER spring

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "impactlens-backend-1.0.0.jar"] 