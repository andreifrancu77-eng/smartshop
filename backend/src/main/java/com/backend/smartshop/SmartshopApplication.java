package com.backend.smartshop;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartshopApplication {

    public static void main(String[] args) {
        // Load .env file before Spring Boot starts
        loadDotenv();
        
        SpringApplication.run(SmartshopApplication.class, args);
    }

    private static void loadDotenv() {
        try {
            Dotenv dotenv = Dotenv.configure()
                    .directory("./")
                    .ignoreIfMissing()
                    .load();
            
            System.out.println("Loading .env file from: " + System.getProperty("user.dir"));
            
            // Load all .env variables into system properties
            // This makes them available to Spring's @Value annotations
            int loadedCount = 0;
            for (DotenvEntry entry : dotenv.entries()) {
                String key = entry.getKey();
                String value = entry.getValue();
                // Only set if not already set as system property (system properties take precedence)
                if (System.getProperty(key) == null && System.getenv(key) == null) {
                    System.setProperty(key, value);
                    loadedCount++;
                    if (key.equals("STRIPE_SECRET_KEY")) {
                        System.out.println("Loaded STRIPE_SECRET_KEY: " + (value.length() > 10 ? value.substring(0, 10) + "..." : value));
                    }
                }
            }
            System.out.println("Loaded " + loadedCount + " environment variables from .env file");
        } catch (Exception e) {
            // .env file is optional, so we just log and continue
            System.out.println("Note: .env file not found or could not be loaded: " + e.getMessage());
            System.out.println("Current directory: " + System.getProperty("user.dir"));
        }
    }
}
