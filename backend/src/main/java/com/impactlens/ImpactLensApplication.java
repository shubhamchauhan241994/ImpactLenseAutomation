package com.impactlens;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main Spring Boot application class for ImpactLens
 * 
 * Features enabled:
 * - Caching for Redis integration
 * - Async processing for background tasks
 * - Scheduling for periodic operations
 */
@SpringBootApplication
@EnableCaching
@EnableAsync
@EnableScheduling
public class ImpactLensApplication {

    public static void main(String[] args) {
        SpringApplication.run(ImpactLensApplication.class, args);
    }
} 