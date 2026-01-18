package com.backend.smartshop.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    // Default allowed origins (can be overridden by ALLOWED_ORIGINS env variable)
    private static final List<String> DEFAULT_ALLOWED_ORIGINS = Arrays.asList(
            "http://localhost:3000",
            "https://smartshop-xgco.vercel.app",
            "https://smartshop-xgco-git-main-andyandrei218-2249s-projects.vercel.app",
            "https://smartshop-xgco-fplux6fq7-andyandrei218-2249s-projects.vercel.app"
    );

    @Value("${ALLOWED_ORIGINS:}")
    private String allowedOriginsEnv;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                       .authorizeHttpRequests(auth -> auth
                               .requestMatchers("/api/auth/**").permitAll()
                               .requestMatchers("/api/products/**").permitAll()
                               .requestMatchers("/api/categories/**").permitAll()
                               .requestMatchers("/api/brands/**").permitAll()
                               .requestMatchers("/api/payments/webhook").permitAll()
                               .requestMatchers("/api/payments/create-payment-intent").permitAll()
                               .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()
                               .requestMatchers(request -> "OPTIONS".equals(request.getMethod())).permitAll()
                               .anyRequest().authenticated()
                       )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Use environment variable if set, otherwise use defaults
        List<String> origins;
        if (allowedOriginsEnv != null && !allowedOriginsEnv.trim().isEmpty()) {
            // Parse comma-separated origins from env variable
            origins = Arrays.stream(allowedOriginsEnv.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .toList();
        } else {
            // Use default origins
            origins = DEFAULT_ALLOWED_ORIGINS;
        }
        
        configuration.setAllowedOrigins(origins);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
