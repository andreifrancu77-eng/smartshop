package com.backend.smartshop.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {

    @Value("${external.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        System.out.println("StripeConfig - Loading Stripe API Key");
        System.out.println("Stripe API Key from @Value: " + (stripeApiKey != null && stripeApiKey.length() > 10 ? stripeApiKey.substring(0, 10) + "..." : stripeApiKey));
        System.out.println("System Property STRIPE_SECRET_KEY: " + (System.getProperty("STRIPE_SECRET_KEY") != null && System.getProperty("STRIPE_SECRET_KEY").length() > 10 ? System.getProperty("STRIPE_SECRET_KEY").substring(0, 10) + "..." : System.getProperty("STRIPE_SECRET_KEY")));
        System.out.println("Environment Variable STRIPE_SECRET_KEY: " + (System.getenv("STRIPE_SECRET_KEY") != null && System.getenv("STRIPE_SECRET_KEY").length() > 10 ? System.getenv("STRIPE_SECRET_KEY").substring(0, 10) + "..." : System.getenv("STRIPE_SECRET_KEY")));
        
        Stripe.apiKey = stripeApiKey;
        
        if (stripeApiKey != null && stripeApiKey.contains("placeholder")) {
            System.err.println("WARNING: Stripe API Key appears to be a placeholder! Please check your .env file or environment variables.");
        } else {
            System.out.println("✓ Stripe API Key loaded successfully");
        }
    }
}
