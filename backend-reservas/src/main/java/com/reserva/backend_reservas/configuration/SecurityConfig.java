package com.reserva.backend_reservas.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http

                .csrf(AbstractHttpConfigurer::disable)
                .headers((headers)->headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/register",
                                "/auth/login",
                                "/category/get",
                                "/product/all",
                                "/product/category/{categoryId}",
                                "/product/suggestions",
                                "/product/{id}",
                                "/product/search",
                                "/product/random",
                                "/product/paginated",
                                "/bookings/**",
                                "/characteristics/all",
                                "/reviews/{productId}")
                        .permitAll()

                        .requestMatchers(
                                "/h2-console/**")
                        .permitAll()

                        .requestMatchers(

                                "/favorites/**")
                        .authenticated()

                        .requestMatchers(HttpMethod.POST,"/reviews/{productId}").authenticated()

                        .requestMatchers(
                                "/category/create",
                                "/delete/{id}",
                                "/characteristics/delete/{id}",
                                "/characteristics/create",
                                "/characteristics/update/{id}",
                                "/product/create",
                                "/product/{id}/category",
                                "/user/**")
                        .hasRole("ADMIN")

                        .anyRequest().authenticated()


                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .cors(cors -> cors
                        .configurationSource(request -> {
                                    CorsConfiguration config = new CorsConfiguration();
                                    config.setAllowedOrigins(List.of("http://localhost:5173"));
                                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                                    config.setAllowedHeaders(List.of("*"));
                                    config.setAllowCredentials(true);
                                    config.addExposedHeader("Authorization");
                                    return config;
                                }
                        )
                )
                .build();

    }
}

