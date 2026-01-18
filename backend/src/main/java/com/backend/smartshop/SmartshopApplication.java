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
        
        // Parse DATABASE_URL if set and DB_URL is not set (for Fly.io compatibility)
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl != null && !databaseUrl.isEmpty() && System.getProperty("DB_URL") == null) {
            // DATABASE_URL format: postgresql://user:password@host:port/database or postgres://...
            // Convert to JDBC format: jdbc:postgresql://host:port/database
            String jdbcUrl;
            try {
                String protocol = null;
                String urlPart;
                
                // Check for postgresql:// or postgres://
                if (databaseUrl.startsWith("postgresql://")) {
                    protocol = "postgresql://";
                    urlPart = databaseUrl.substring("postgresql://".length());
                } else if (databaseUrl.startsWith("postgres://")) {
                    protocol = "postgres://";
                    urlPart = databaseUrl.substring("postgres://".length());
                } else if (databaseUrl.startsWith("jdbc:")) {
                    // Already in JDBC format
                    System.setProperty("DB_URL", databaseUrl);
                    System.out.println("DATABASE_URL already in JDBC format: " + (databaseUrl.length() > 50 ? databaseUrl.substring(0, 50) + "..." : databaseUrl));
                    return;
                } else {
                    // Unknown format, try to add jdbc:postgresql://
                    System.err.println("Warning: Unknown DATABASE_URL format, attempting conversion: " + databaseUrl);
                    protocol = "";
                    urlPart = databaseUrl;
                }
                
                if (protocol != null) {
                    int atIndex = urlPart.indexOf("@");
                    if (atIndex > 0) {
                        // Extract credentials and connection info
                        String credentials = urlPart.substring(0, atIndex);
                        String connectionInfo = urlPart.substring(atIndex + 1);
                        
                        int colonIndex = credentials.indexOf(":");
                        if (colonIndex > 0) {
                            String username = credentials.substring(0, colonIndex);
                            String password = credentials.substring(colonIndex + 1);
                            
                            // Set username and password if not already set
                            if (System.getProperty("DB_USERNAME") == null) {
                                System.setProperty("DB_USERNAME", username);
                            }
                            if (System.getProperty("DB_PASSWORD") == null) {
                                System.setProperty("DB_PASSWORD", password);
                            }
                        }
                        
                        // Always use jdbc:postgresql:// (not jdbc:postgres://)
                        jdbcUrl = "jdbc:postgresql://" + connectionInfo;
                    } else {
                        // No credentials, just connection info
                        jdbcUrl = "jdbc:postgresql://" + urlPart;
                    }
                    
                    System.setProperty("DB_URL", jdbcUrl);
                    System.out.println("Converted DATABASE_URL to DB_URL: " + (jdbcUrl.length() > 50 ? jdbcUrl.substring(0, 50) + "..." : jdbcUrl));
                }
            } catch (Exception e) {
                System.err.println("Warning: Failed to parse DATABASE_URL: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
}
