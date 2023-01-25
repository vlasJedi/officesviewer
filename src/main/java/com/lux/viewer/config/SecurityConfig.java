package com.lux.viewer.config;

import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.security.SecureRandom;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    // SecurityFilterChain interface to match HttpServletRequest
    // and provide Filters
    // HttpSecurity builds almost all filters and transformation pipe of requests and responses
    // including authorization setup
    public SecurityFilterChain securityFilterChain(@NotNull HttpSecurity httpSecurity) throws Exception {
        // building from most specific down to most general
        httpSecurity.authorizeHttpRequests((requests) -> requests
            .requestMatchers("/admin")
            .hasAuthority("ADMIN")
            .requestMatchers("/api")
            .authenticated()
            .requestMatchers("/*")
            .permitAll()
            )
            // if is enabled httpBasic via Authorization Basic header
            // then this formLogin consumes a POST auth requests coming to /login URL
            // therefore works two auth mechanisms: HTTP Basic vs Session based POST /login
            // need to choose one of them
            .formLogin().loginPage("/login")
            // prevent redirects from spring so this is done by client code
            .successHandler((request, response, authentication) -> {
                response.setStatus(HttpServletResponse.SC_OK);
            })
            // prevent redirects from spring so this is done by client code
            .failureHandler(((request, response, exception) -> {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }))
            .and()
            .logout(LogoutConfigurer::permitAll)
            // for production need to be enabled to prevent session leaks
            .csrf().disable();
        // if any ssl needs to be added
        //.requiresChannel((requiresChannel) -> requiresChannel.anyRequest().requiresSecure());
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10, new SecureRandom());
    }
}
