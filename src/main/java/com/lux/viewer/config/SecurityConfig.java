package com.lux.viewer.config;

import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

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
            //.and()
            )
            .formLogin().loginPage("/login")
            .and()
            .logout(LogoutConfigurer::permitAll);

        httpSecurity.httpBasic();
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
